import ReadingCards from './_component/reading-cards'
import HistoricalDataCard from './_component/historical-data-card'

import Container from '@/components/container'
import { findSensor } from '@/actions/find-sensor'

type Props = {
  params: {
    id: string
  }
  searchParams: {
    date: string | undefined
  }
}

export default async function Sensor({ params, searchParams }: Props) {
  const sensor = await findSensor(parseInt(params.id))
  return (
    <main className="flex-grow p-6">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Sensor: {sensor.name}</h1>
          <h1 className="text-2xl font-semibold">
            Status:{' '}
            <span
              className={`rounded-full px-2 py-1 text-lg font-semibold ${
                sensor.status === 'HIGH'
                  ? 'bg-red-100 text-red-800'
                  : sensor.status === 'LOW'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {sensor?.status && sensor.status.toUpperCase()}
            </span>
          </h1>
        </div>
        <ReadingCards sensor={sensor} />
        <HistoricalDataCard
          sensorId={parseInt(params.id)}
          date={searchParams.date}
        />
      </Container>
    </main>
  )
}
