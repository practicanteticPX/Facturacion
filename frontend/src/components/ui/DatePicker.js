import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { format, isValid, parse } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Label } from "./label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

const formatManualDateInput = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

const getAllowedYearMessage = () => {
  const currentYear = new Date().getFullYear()
  return `La fecha debe ser válida y del año ${currentYear - 1} o ${currentYear}`
}

const isAllowedInvoiceYear = (date) => {
  const currentYear = new Date().getFullYear()
  const year = date.getFullYear()
  return year === currentYear || year === currentYear - 1
}

export function DatePicker({
  label,
  value,
  onChange,
  required = false,
  name,
  placeholder = "Seleccione fecha",
  id,
  disabled = false,
  allowManualInput = false,
  ...props
}) {
  const [open, setOpen] = React.useState(false)
  const [manualValue, setManualValue] = React.useState('')
  const [manualError, setManualError] = React.useState('')

  const dateValue = React.useMemo(() => {
    if (!value || value === '') return undefined

    try {
      const parsedDate = parse(value, 'yyyy-MM-dd', new Date())
      return isValid(parsedDate) ? parsedDate : undefined
    } catch (error) {
      return undefined
    }
  }, [value])

  React.useEffect(() => {
    setManualValue(dateValue ? format(dateValue, 'dd/MM/yyyy', { locale: es }) : '')
  }, [dateValue])

  const updateValue = (newValue) => {
    onChange({
      target: {
        name,
        value: newValue
      }
    })
  }

  const handleSelect = (date) => {
    updateValue(date ? format(date, 'yyyy-MM-dd') : '')
    setManualError('')
    setOpen(false)
  }

  const displayDate = React.useMemo(() => {
    if (!dateValue) return placeholder

    try {
      return format(dateValue, 'dd/MM/yyyy', { locale: es })
    } catch (error) {
      return placeholder
    }
  }, [dateValue, placeholder])

  const parseManualDate = (text) => {
    const trimmedText = text.trim()
    if (!trimmedText) return ''

    const parsedDate = parse(trimmedText, 'dd/MM/yyyy', new Date())
    if (!isValid(parsedDate) || format(parsedDate, 'dd/MM/yyyy') !== trimmedText) {
      return null
    }

    if (!isAllowedInvoiceYear(parsedDate)) {
      return null
    }

    return format(parsedDate, 'yyyy-MM-dd')
  }

  const handleManualChange = (event) => {
    const nextValue = formatManualDateInput(event.target.value)
    setManualValue(nextValue)
    setManualError('')

    if (nextValue.length === 10) {
      const parsedValue = parseManualDate(nextValue)
      if (!parsedValue) {
        setManualError(getAllowedYearMessage())
      }
      updateValue(parsedValue || '')
      return
    }

    updateValue('')
  }

  const handleManualBlur = () => {
    const parsedValue = parseManualDate(manualValue)

    if (parsedValue === '') {
      setManualError('')
      updateValue('')
      return
    }

    if (parsedValue) {
      setManualError('')
      updateValue(parsedValue)
      setManualValue(format(parse(parsedValue, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy'))
      return
    }

    setManualError(getAllowedYearMessage())
    setManualValue('')
    updateValue('')
  }

  const calendar = (
    <Calendar
      mode="single"
      selected={dateValue}
      onSelect={handleSelect}
      locale={es}
    />
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {label && (
        <Label htmlFor={id} style={{ paddingLeft: '4px' }}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
        </Label>
      )}

      {allowManualInput ? (
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            id={id}
            name={name}
            value={manualValue}
            onChange={handleManualChange}
            onBlur={handleManualBlur}
            placeholder="DD/MM/AAAA"
            disabled={disabled}
            required={required}
            inputMode="numeric"
            pattern="\d{2}/\d{2}/\d{4}"
            style={{
              width: '100%',
              height: '40px',
              border: manualError ? '1px solid #ef4444' : '1px solid #d0d7e2',
              borderRadius: '6px',
              padding: '0 38px 0 12px',
              fontSize: '14px',
              color: '#0f172a',
              backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
              outline: 'none',
              cursor: disabled ? 'not-allowed' : 'text'
            }}
            {...props}
          />
          <Popover open={open && !disabled} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                aria-label="Abrir calendario"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '20px',
                  transform: 'translateY(-50%)',
                  border: 0,
                  background: 'transparent',
                  padding: 0,
                  color: '#94a3b8',
                  cursor: disabled ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronDownIcon style={{ height: '16px', width: '16px' }} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              style={{ width: 'auto', overflow: 'hidden', padding: 0 }}
              align="start"
            >
              {calendar}
            </PopoverContent>
          </Popover>
          {manualError && (
            <p style={{ margin: '6px 0 0', color: '#dc2626', fontSize: '12px' }}>{manualError}</p>
          )}
        </div>
      ) : (
        <Popover open={open && !disabled} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={id}
              disabled={disabled}
              style={{
                width: '100%',
                justifyContent: 'space-between',
                fontWeight: 'normal',
                color: dateValue ? '#0f172a' : '#94a3b8',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1
              }}
              {...props}
            >
              {displayDate}
              <ChevronDownIcon style={{ height: '16px', width: '16px' }} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            style={{ width: 'auto', overflow: 'hidden', padding: 0 }}
            align="start"
          >
            {calendar}
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}