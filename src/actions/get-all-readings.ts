'use server'

import { startOfDay, endOfDay } from 'date-fns'

import prisma from '@/lib/prisma'

export type Props = {
  sensorId: number
  date: string | undefined
}

export async function getAllReadings(params: Props) {
  const date = params.date ? new Date(params.date) : new Date()
  return prisma.reading.findMany({
    where: {
      sensorId: params.sensorId,
      createdAt: {
        lte: endOfDay(date).toISOString(),
        gte: startOfDay(date).toISOString(),
      },
    },
  })
}
