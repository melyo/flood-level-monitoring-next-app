import { findSensor } from '@/actions/find-sensor'

import Meter from './_component/meter'

type Props = {
  params: {
    id: string
  }
}

export default async function Monitor({ params }: Props) {
  const sensor = await findSensor(parseInt(params.id))
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Meter sensor={sensor} />
    </div>
  )
}
