import { IconEdit, IconTrash } from '@tabler/icons-react'
import { ActionIcon, Group, Tooltip } from '@/components/base'
import type { IUser } from '@/store/slices/usersSlice'
import type { ICategory } from '@/store/slices/categoriesSlice'
import type { IProduct } from '@/clientApi/product'
import type { IReview } from '@/store/slices/reviewsSlice'
import type { IOrder } from '@/store/slices/ordersSlice'

type IEntitie = IUser | ICategory | IProduct | IReview | IOrder

interface EntitieCardProps {
  entitie: IEntitie
  onEdit?: React.Dispatch<React.SetStateAction<IEntitie | null>>
  onDelete?: React.Dispatch<React.SetStateAction<IEntitie | null>>
  children: React.ReactNode
}

export const EntitieCard = ({
  entitie,
  onEdit,
  onDelete,
  children,
}: EntitieCardProps) => {
  return (
    <div
      key={entitie._id}
      className="border border-(--color-border) bg-(--color-surface) rounded-xl p-4 flex items-start gap-(--spacing-md)"
    >
      <div className="flex-1 flex flex-col gap-(--spacing-xs)">{children}</div>
      <Group gap="xs" className="shrink-0">
        <Tooltip label="Edit">
          <ActionIcon color="blue" onClick={() => onEdit?.(entitie)}>
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => onDelete?.(entitie)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </div>
  )
}
