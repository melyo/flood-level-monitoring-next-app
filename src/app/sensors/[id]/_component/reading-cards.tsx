'use client'

import { useState, useEffect } from 'react'
import { Thermometer, BarChart, ShareIcon } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSensor } from '@/hooks/use-sensor'
import type { Sensor } from '@prisma/client'

type Props = {
  sensor: Sensor
}

export default function ReadingCards(params: Props) {
  const [currentUrl, setCurrentUrl] = useState('')
  const { sensor } = useSensor(params)

  useEffect(() => {
    const port = window.location.port
    setCurrentUrl(
      `http://${process.env.NEXT_PUBLIC_OWN_IP || 'localhost'}${port && port !== '80' ? ':' + port : ''}/monitor/${sensor?.id || ''}`
    )
  }, [])

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-5">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium">Current Reading</CardTitle>
          <Thermometer className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{sensor?.latestReading || 0}</div>
          {sensor?.lastReadAt && (
            <p className="text-xs text-muted-foreground">
              Last updated:
              <time suppressHydrationWarning>
                {sensor?.lastReadAt && sensor.lastReadAt.toLocaleString()}
              </time>
            </p>
          )}
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium">Average Reading Today</CardTitle>
          <BarChart className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{sensor?.avgToday || 0}</div>
          {sensor?.avgCount && (
            <p className="text-xs text-muted-foreground">
              Based on {sensor?.avgCount} readings
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scan to share</CardTitle>
          <ShareIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex justify-center">
          <QRCodeSVG value={currentUrl} size={128} />
        </CardContent>
      </Card>
    </div>
  )
}
