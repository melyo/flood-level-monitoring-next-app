'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleApply = () => {
    const searchParams = new URLSearchParams({
      ...(selectedDate && { date: format(selectedDate, 'yyyy-MM-dd') }),
    })
    router.push(`${pathname}?${searchParams.toString()}`)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="p-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
