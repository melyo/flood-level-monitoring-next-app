'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { Sensor } from '@prisma/client'

import { socket } from '@/lib/socket'

type Props = {
  sensors?: Sensor[] | undefined
  sensor?: Sensor | undefined
}

export function useSensor(params: Props) {
  const [sensor, setSensor] = useState<Sensor | undefined>(params.sensor)

  useEffect(() => {
    function onFooEvent(args: Sensor) {
      if (args?.status === 'HIGH') {
        toast.error('Uh oh! Water level is at critical')
      }
      setSensor(args)
    }
    socket.on('foo', onFooEvent)
    return () => {
      socket.off('foo', onFooEvent)
    }
  }, [])

  return {
    sensor,
    sensors: params.sensors?.map((item) => {
      if (sensor && item.id === sensor.id) {
        return sensor
      }
      return item
    }),
  }
}
