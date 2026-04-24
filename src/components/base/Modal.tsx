import type { FC, ReactNode } from 'react'
import { Modal as HeroModal, useOverlayState } from '@heroui/react'
import { IconX } from '@tabler/icons-react'

interface ModalProps {
  opened: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full' | 'cover'
  centered?: boolean
  className?: string
}

export const Modal: FC<ModalProps> = ({
  opened,
  onClose,
  title,
  children,
  size = 'md',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  centered: _centered,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className: _className,
}) => {
  const state = useOverlayState({
    isOpen: opened,
    onOpenChange: (open) => {
      if (!open) onClose()
    },
  })

  return (
    <HeroModal state={state}>
      <HeroModal.Backdrop isDismissable onClick={onClose} />
      <HeroModal.Container size={size} placement="center">
        <HeroModal.Dialog>
          <HeroModal.Header>
            {title && (
              <HeroModal.Heading className="text-lg font-semibold">
                {title}
              </HeroModal.Heading>
            )}
            <HeroModal.CloseTrigger className="ml-auto" onPress={onClose}>
              <IconX size={18} />
            </HeroModal.CloseTrigger>
          </HeroModal.Header>
          <HeroModal.Body>{children}</HeroModal.Body>
        </HeroModal.Dialog>
      </HeroModal.Container>
    </HeroModal>
  )
}
