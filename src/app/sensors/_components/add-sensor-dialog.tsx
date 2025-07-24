'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type State, createSensor } from '@/actions/create-sensor'

const intialState = {
  success: false,
  id: '1',
}

export default function AddSensorDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState<State, FormData>(
    createSensor,
    intialState
  )
  useEffect(() => {
    if (state.success) {
      setOpen(false)
    }
  }, [state.id])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Sensor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Sensor</DialogTitle>
          <DialogDescription>Fixed the warning</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="sensorName">Sensor Name</Label>
            <Input
              name="name"
              id="sensorName"
              placeholder="Enter sensor name"
            />
          </div>
          <div>
            <Label htmlFor="sensorCode">Sensor Code</Label>
            <Input
              name="code"
              id="sensorCode"
              placeholder="Enter sensor code"
            />
          </div>
          <Button type="submit">Add Sensor</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
