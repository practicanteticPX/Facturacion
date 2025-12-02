import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Label } from "./label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export function Calendar22() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(undefined)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label htmlFor="date" style={{ paddingLeft: '4px' }}>
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            style={{ width: '192px', justifyContent: 'space-between', fontWeight: 'normal' }}
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon style={{ height: '16px', width: '16px' }} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto"
          style={{ width: 'auto', overflow: 'hidden', padding: 0 }}
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
