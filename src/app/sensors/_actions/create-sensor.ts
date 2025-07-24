'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import prisma from '@/lib/prisma'

export type State = {
  success: boolean
  id: string
}

export async function createSensor(formData: FormData): Promise<State> {
  const data = await prisma.sensor.create({
    data: {
      name: formData.get('name'),
      code: formData.get('code'),
      status: 'LOW',
    },
  })
  console.log(data)
  revalidatePath('/sensors')
  return data
}
