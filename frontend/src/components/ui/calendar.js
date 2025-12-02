import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "./calendar.css"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`calendar ${className || ''}`}
      classNames={{
        months: "calendar-months",
        month: "calendar-month",
        caption: "calendar-caption",
        caption_label: "calendar-caption-label",
        caption_dropdowns: "calendar-caption-dropdowns",
        nav: "calendar-nav",
        nav_button: "calendar-nav-button",
        nav_button_previous: "calendar-nav-button-previous",
        nav_button_next: "calendar-nav-button-next",
        table: "calendar-table",
        head_row: "calendar-head-row",
        head_cell: "calendar-head-cell",
        row: "calendar-row",
        cell: "calendar-cell",
        day: "calendar-day",
        day_selected: "calendar-day-selected",
        day_today: "calendar-day-today",
        day_outside: "calendar-day-outside",
        day_disabled: "calendar-day-disabled",
        day_range_middle: "calendar-day-range-middle",
        day_hidden: "calendar-day-hidden",
        dropdown: "calendar-dropdown",
        dropdown_month: "calendar-dropdown-month",
        dropdown_year: "calendar-dropdown-year",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="calendar-icon" />,
        IconRight: () => <ChevronRightIcon className="calendar-icon" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
