import type { ReactNode } from 'react'
import {
  Select as HeroSelect,
  Label,
  FieldError,
  ListBox,
  ListBoxItem,
} from '@heroui/react'
import classNames from 'classnames'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: ReactNode
  placeholder?: string
  data: SelectOption[]
  value?: string
  onChange?: (value: string | null) => void
  error?: string
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

export const Select = ({
  label,
  placeholder,
  data,
  value,
  onChange,
  error,
  required,
  disabled,
  fullWidth = true,
  className,
}: SelectProps) => (
  <HeroSelect
    isInvalid={!!error}
    isRequired={required}
    isDisabled={disabled}
    fullWidth={fullWidth}
    selectedKey={value ?? null}
    onSelectionChange={(key) => onChange?.(key ? String(key) : null)}
    className={classNames('flex flex-col gap-1', className)}
  >
    {label && (
      <Label isRequired={required} isInvalid={!!error}>
        {label}
      </Label>
    )}
    <HeroSelect.Trigger>
      <HeroSelect.Value>
        {({ selectedText }) => selectedText ?? placeholder ?? 'Select...'}
      </HeroSelect.Value>
      <HeroSelect.Indicator />
    </HeroSelect.Trigger>
    <HeroSelect.Popover>
      <ListBox>
        {data.map((item) => (
          <ListBoxItem key={item.value} id={item.value}>
            {item.label}
          </ListBoxItem>
        ))}
      </ListBox>
    </HeroSelect.Popover>
    {error && <FieldError>{error}</FieldError>}
  </HeroSelect>
)
