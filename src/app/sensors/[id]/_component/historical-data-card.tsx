import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type Props, getAllReadings } from '@/actions/get-all-readings'

import Chart from './chart'
import DatePicker from './date-picker'

export default async function HistoricalDateCard(params: Props) {
  const data = await getAllReadings(params)
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Historical Data</CardTitle>
        <DatePicker />
      </CardHeader>
      <CardContent>
        <Chart data={data} />
      </CardContent>
    </Card>
  )
}
