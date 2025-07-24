'use client'

import { useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useSensor } from '@/hooks/use-sensor'
import type { Sensor } from '@prisma/client'

type Props = {
  sensors: Sensor[]
}

export default function SensorsTable(params: Props) {
  const { sensors } = useSensor(params)
  const router = useRouter()

  const handleRowClick = (id: number) => {
    router.push(`/sensors/${id}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Latest Reading</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensors &&
          sensors.map((sensor) => (
            <TableRow
              key={sensor.id}
              onClick={() => handleRowClick(sensor.id)}
              className="cursor-pointer hover:bg-muted"
            >
              <TableCell>{sensor.id}</TableCell>
              <TableCell>{sensor.name}</TableCell>
              <TableCell>{sensor.code}</TableCell>
              <TableCell>{sensor.latestReading}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    sensor.status === 'HIGH'
                      ? 'bg-red-100 text-red-800'
                      : sensor.status === 'LOW'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {sensor?.status && sensor.status.toUpperCase()}
                </span>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
