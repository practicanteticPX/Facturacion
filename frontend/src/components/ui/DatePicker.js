import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { format, parse } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Label } from "./label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

/**
 * DatePicker Component
 * Selector de fecha reutilizable con calendario dropdown
 *
 * @param {string} label - Etiqueta del campo
 * @param {string} value - Valor de la fecha en formato YYYY-MM-DD
 * @param {function} onChange - Callback cuando cambia la fecha
 * @param {boolean} required - Si el campo es requerido
 * @param {string} name - Nombre del campo para formularios
 * @param {string} placeholder - Texto placeholder cuando no hay fecha
 * @param {string} id - ID del campo
 */
export function DatePicker({
  label,
  value,
  onChange,
  required = false,
  name,
  placeholder = "Seleccione fecha",
  id,
  ...props
}) {
  const [open, setOpen] = React.useState(false)

  // Convertir el valor string (YYYY-MM-DD) a objeto Date
  const dateValue = React.useMemo(() => {
    if (!value || value === '') return undefined
    try {
      // Parse la fecha desde formato YYYY-MM-DD
      return parse(value, 'yyyy-MM-dd', new Date())
    } catch (error) {
      return undefined
    }
  }, [value])

  // Manejar la selección de fecha
  const handleSelect = (date) => {
    if (date) {
      // Formatear la fecha a YYYY-MM-DD para el formulario
      const formattedDate = format(date, 'yyyy-MM-dd')
      onChange({
        target: {
          name: name,
          value: formattedDate
        }
      })
    } else {
      onChange({
        target: {
          name: name,
          value: ''
        }
      })
    }
    setOpen(false)
  }

  // Formatear fecha para mostrar en el botón
  const displayDate = React.useMemo(() => {
    if (!dateValue) return placeholder
    try {
      return format(dateValue, 'dd/MM/yyyy', { locale: es })
    } catch (error) {
      return placeholder
    }
  }, [dateValue, placeholder])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {label && (
        <Label htmlFor={id} style={{ paddingLeft: '4px' }}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            style={{
              width: '100%',
              justifyContent: 'space-between',
              fontWeight: 'normal',
              color: dateValue ? '#0f172a' : '#94a3b8'
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
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleSelect}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
