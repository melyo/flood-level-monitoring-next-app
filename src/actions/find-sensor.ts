'use server'

import prisma from '@/lib/prisma'

export async function findSensor(id: number) {
  return prisma.sensor.findUnique({ where: { id } })
}
