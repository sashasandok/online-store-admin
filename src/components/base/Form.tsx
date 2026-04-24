import React, { forwardRef, useState } from 'react'
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from 'react'
import {
  Button as HeroButton,
  FieldError,
  Input,
  Label,
  NumberField,
  Spinner,
  TextArea,
  TextField,
} from '@heroui/react'
import type { ButtonRootProps } from '@heroui/react'
import {
  IconChevronUp,
  IconChevronDown,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react'
import classNames from 'classnames'

// ─── Shared field wrapper ────────────────────────────────────────────────────

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  error?: string
  fullWidth?: boolean
}

// ─── Button ──────────────────────────────────────────────────────────────────

interface ButtonProps extends ButtonRootProps {
  loading?: boolean
}

export const Button = ({
  loading,
  children,
  isDisabled,
  ...rest
}: ButtonProps) => (
  <HeroButton isDisabled={isDisabled || loading} {...rest}>
    {loading ? <Spinner size="sm" /> : children}
  </HeroButton>
)

// ─── TextInput ───────────────────────────────────────────────────────────────

export const TextInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, fullWidth = true, className, required, ...rest }, ref) => {
    return (
      <TextField
        isInvalid={!!error}
        isRequired={required}
        fullWidth={fullWidth}
        className={classNames('flex flex-col gap-1', className)}
        // react-aria TextField controls value via its own props; pass through
        // uncontrolled via defaultValue or controlled via value
        {...(rest.value !== undefined
          ? { value: rest.value as string }
          : rest.defaultValue !== undefined
            ? { defaultValue: rest.defaultValue as string }
            : {})}
      >
        {label && (
          <Label isRequired={required} isInvalid={!!error}>
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          type={rest.type ?? 'text'}
          placeholder={rest.placeholder}
          disabled={rest.disabled}
          name={rest.name}
          id={rest.id}
          onBlur={rest.onBlur as never}
          onChange={rest.onChange as never}
        />
        {error && <FieldError>{error}</FieldError>}
      </TextField>
    )
  }
)
TextInput.displayName = 'TextInput'

// ─── PasswordInput ───────────────────────────────────────────────────────────

export const PasswordInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, fullWidth = true, className, required, ...rest }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <TextField
        isInvalid={!!error}
        isRequired={required}
        fullWidth={fullWidth}
        className={classNames('flex flex-col gap-1', className)}
        {...(rest.value !== undefined
          ? { value: rest.value as string }
          : rest.defaultValue !== undefined
            ? { defaultValue: rest.defaultValue as string }
            : {})}
      >
        {label && (
          <Label isRequired={required} isInvalid={!!error}>
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          <Input
            ref={ref}
            type={visible ? 'text' : 'password'}
            placeholder={rest.placeholder}
            disabled={rest.disabled}
            name={rest.name}
            id={rest.id}
            onBlur={rest.onBlur as never}
            onChange={rest.onChange as never}
            className="w-full pr-10"
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            className="absolute right-2 text-(--color-text-weak) hover:text-(--color-text) transition-colors"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        </div>
        {error && <FieldError>{error}</FieldError>}
      </TextField>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

// ─── NumberInput ─────────────────────────────────────────────────────────────

interface NumberInputProps {
  label?: ReactNode
  value?: number
  onChange?: (value: number | '') => void
  min?: number
  max?: number
  step?: number
  decimalScale?: number
  placeholder?: string
  error?: string
  required?: boolean
  className?: string
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  error,
  required,
  className,
}) => (
  <NumberField
    isInvalid={!!error}
    isRequired={required}
    value={value}
    onChange={(val) => onChange?.(isNaN(val) ? '' : val)}
    minValue={min}
    maxValue={max}
    step={step}
    fullWidth
    className={classNames('flex flex-col gap-1', className)}
  >
    {label && (
      <Label isRequired={required} isInvalid={!!error}>
        {label}
      </Label>
    )}
    <NumberField.Group className="flex items-center">
      <NumberField.DecrementButton className="px-2 border border-r-0 border-(--color-border) rounded-l h-9 hover:bg-(--color-surface-raised) transition-colors">
        <IconChevronDown size={14} />
      </NumberField.DecrementButton>
      <NumberField.Input className="flex-1 h-9 border border-(--color-border) text-center text-sm focus:outline-none px-2" />
      <NumberField.IncrementButton className="px-2 border border-l-0 border-(--color-border) rounded-r h-9 hover:bg-(--color-surface-raised) transition-colors">
        <IconChevronUp size={14} />
      </NumberField.IncrementButton>
    </NumberField.Group>
    {error && <FieldError>{error}</FieldError>}
  </NumberField>
)

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode
  error?: string
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = true, className, required, ...rest }, ref) => (
    <TextField
      isInvalid={!!error}
      isRequired={required}
      fullWidth={fullWidth}
      className={classNames('flex flex-col gap-1', className)}
    >
      {label && (
        <Label isRequired={required} isInvalid={!!error}>
          {label}
        </Label>
      )}
      <TextArea
        ref={ref}
        rows={(rest as { rows?: number }).rows ?? 4}
        placeholder={rest.placeholder}
        disabled={rest.disabled}
        name={rest.name}
        id={rest.id}
        value={rest.value as string | undefined}
        defaultValue={rest.defaultValue as string | undefined}
        onBlur={rest.onBlur as never}
        onChange={rest.onChange as never}
        className="w-full"
      />
      {error && <FieldError>{error}</FieldError>}
    </TextField>
  )
)
Textarea.displayName = 'Textarea'
