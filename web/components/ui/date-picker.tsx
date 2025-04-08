"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
}

export function DatePicker({ value, onChange, id, name, className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value ? new Date(value) : undefined)

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    if (onChange && newDate) {
      onChange(format(newDate, "yyyy-MM-dd"))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
