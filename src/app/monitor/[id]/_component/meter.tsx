'use client'

import { useSensor } from '@/hooks/use-sensor'
import type { Sensor } from '@prisma/client'

import SocketManager from '@/components/socket-manager'

type Props = {
  sensor: Sensor
}

export default function Meter(params: Props) {
  const { sensor } = useSensor(params)

  const getStatus = (level: number) => {
    if (level < 50) return { text: 'LOW', color: 'bg-blue-300' }
    if (level < 80) return { text: 'MEDIUM', color: 'bg-blue-500' }
    return { text: 'HIGH', color: 'bg-blue-700' }
  }

  const waterLevel = sensor?.latestReading || 0
  const status = getStatus(waterLevel)

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between bg-gray-100 p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">{sensor?.name}</h1>
      <div className="mb-1 flex h-5/6 w-full max-w-md flex-col items-center justify-between rounded-lg bg-white p-6 shadow-lg">
        <div className="relative mb-4 h-5/6 w-full overflow-hidden rounded-lg bg-gray-200">
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out ${status.color}`}
            style={{ height: `${waterLevel}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-white mix-blend-difference">
              {waterLevel}%
            </span>
          </div>
        </div>

        <div className="mb-4 text-center">
          <span className="text-lg font-semibold">Status: </span>
          <span
            className={`rounded-full px-2 py-1 text-lg font-semibold ${
              status.text === 'HIGH'
                ? 'bg-red-100 text-red-800'
                : status.text === 'LOW'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status.text}
          </span>
        </div>
      </div>
      <SocketManager />
      <div>
        <span>&copy; 2024 Flood Wave</span>
      </div>
    </div>
  )
}
