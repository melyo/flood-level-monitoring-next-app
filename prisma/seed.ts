const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const START_DATE = '2024-09-15T16:00:00.000Z'
const VOLATILITY = 0.05
const TOTAL_READINGS = 7500

function randomizer(reference: number) {
  let changePercent = 2 * VOLATILITY * Math.random()
  if (changePercent > VOLATILITY) {
    changePercent -= 2 * VOLATILITY
  }
  const changeAmount = reference * changePercent
  return (reference + changeAmount).toFixed(2)
}

function generateSensorReadings() {
  const arr = []
  let temp = START_DATE
  let oldValue = 10
  for (let i = 0; i < TOTAL_READINGS; i++) {
    const date = new Date(temp)
    arr.push({
      value: oldValue,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    })
    const newPrice = randomizer(oldValue)
    oldValue = parseFloat(newPrice)
    temp = new Date(date.getTime() + 60 * 1000).toISOString()
  }
  return arr
}

async function main() {
  console.log(`Start seeding ...`)
  const sensor = await prisma.sensor.create({
    data: {
      name: 'WaterLevel001',
      code: 'water_level_001',
      status: 'LOW',
      readings: {
        create: generateSensorReadings(),
      },
    },
  })
  console.log(`Created user with id: ${sensor.id}`)
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
