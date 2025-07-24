'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

export type State = {
  success: boolean
  id: string
}

export async function createSensor(
  _prevState: State,
  formData: FormData
): Promise<State> {
  await prisma.sensor.create({
    data: {
      name: formData.get('name'),
      code: formData.get('code'),
      status: 'LOW',
    },
  })
  const a = revalidatePath('/sensors')
  console.log('puta', a)
  return {
    success: true,
    id: (Math.random() + 1).toString(36).substring(7),
  }
}
