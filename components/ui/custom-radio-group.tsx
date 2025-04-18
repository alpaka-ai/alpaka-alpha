"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

type RadioGroupProps = {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  children: React.ReactNode
}

type RadioGroupItemProps = {
  className?: string
  value: string
  id?: string
  disabled?: boolean
  children?: React.ReactNode
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
}>({})

export function RadioGroup({
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")

  const contextValue = React.useMemo(
    () => ({
      value: value !== undefined ? value : internalValue,
      onValueChange: (newValue: string) => {
        setInternalValue(newValue)
        onValueChange?.(newValue)
      },
      disabled,
      name,
    }),
    [value, internalValue, onValueChange, disabled, name],
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={cn("grid gap-3", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export function RadioGroupItem({ className, value, id, disabled, ...props }: RadioGroupItemProps) {
  const { value: groupValue, onValueChange, disabled: groupDisabled, name } = React.useContext(RadioGroupContext)
  const isDisabled = disabled || groupDisabled
  const isChecked = groupValue === value

  return (
    <label
      htmlFor={id}
      className={cn("flex items-center space-x-2", isDisabled && "cursor-not-allowed opacity-50", className)}
    >
      <div className="relative">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => onValueChange?.(value)}
          className="sr-only"
        />
        <div
          className={cn(
            "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            isChecked && "border-primary",
          )}
        >
          {isChecked && (
            <div className="relative flex items-center justify-center">
              <Circle className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>
      </div>
      <div>{props.children}</div>
    </label>
  )
}
