import * as React from "react"
import "./field.css"

const Field = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`field ${className || ''}`} {...props} />
))
Field.displayName = "Field"

const FieldLabel = React.forwardRef(({ className, required, ...props }, ref) => (
  <label
    ref={ref}
    className={`field-label ${required ? 'field-label-required' : ''} ${className || ''}`}
    {...props}
  />
))
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`field-description ${className || ''}`}
    {...props}
  />
))
FieldDescription.displayName = "FieldDescription"

export { Field, FieldLabel, FieldDescription }
