import type { FC, ReactNode } from 'react'
import { Alert as HeroAlert } from '@heroui/react'
import { IconX } from '@tabler/icons-react'

type AlertStatus = 'success' | 'danger' | 'warning' | 'default' | 'accent'

interface AlertProps {
  children: ReactNode
  title?: ReactNode
  variant?: 'success' | 'error' | 'info'
  status?: AlertStatus
  onClose?: () => void
  className?: string
}

const variantToStatus: Record<string, AlertStatus> = {
  success: 'success',
  error: 'danger',
  info: 'default',
}

export const Alert: FC<AlertProps> = ({
  children,
  title,
  variant,
  status,
  onClose,
  className,
}) => {
  const resolvedStatus: AlertStatus =
    status ?? (variant ? variantToStatus[variant] : 'default')

  return (
    <HeroAlert status={resolvedStatus} className={className}>
      <HeroAlert.Indicator />
      <HeroAlert.Content>
        {title && <HeroAlert.Title>{title}</HeroAlert.Title>}
        <HeroAlert.Description>{children}</HeroAlert.Description>
      </HeroAlert.Content>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <IconX size={16} />
        </button>
      )}
    </HeroAlert>
  )
}
