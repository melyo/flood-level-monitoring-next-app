import Container from '@/components/container'
import { getAllSensors } from '@/actions/get-all-sensors'

import AddSensorDialog from './_components/add-sensor-dialog'
import SensorsTable from './_components/sensors-table'

export default async function Sensors() {
  const sensors = await getAllSensors()
  return (
    <main className="flex-grow">
      <Container className="py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Sensor Management</h1>
          <AddSensorDialog />
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <SensorsTable sensors={sensors} />
        </div>
      </Container>
    </main>
  )
}
