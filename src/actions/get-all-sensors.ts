'use server'

import prisma from '@/lib/prisma'

export async function getAllSensors() {
  return prisma.sensor.findMany()
}
