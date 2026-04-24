import { Badge, Skeleton, Text } from '@/components/base'
import { EntitieCard } from '@/components/EntitieCard'
import type { IUser } from '@/store/slices/usersSlice'

interface UsersCardsProps {
  list: IUser[]
  isLoading: boolean
  onEdit?: (_user: IUser) => void
  onDelete?: (_user: IUser) => void
}

export const UsersCards = ({ list, isLoading, onEdit, onDelete }: UsersCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="border border-(--color-border) bg-(--color-surface) rounded-xl p-4 flex flex-col gap-3">
            <Skeleton height={20} width="70%" />
            <Skeleton height={16} width="50%" />
            <Skeleton height={24} width="30%" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4">
      {Array.isArray(list) &&
        list.map((user) => (
          <EntitieCard
            key={user._id}
            entitie={user}
            onEdit={onEdit ? () => onEdit(user) : undefined}
            onDelete={onDelete ? () => onDelete(user) : undefined}
          >
            <Text fw={600}>{user.name}</Text>
            <Text size="sm" c="dimmed">{user.email}</Text>
            <Badge color={user.role === 'admin' ? 'blue' : 'gray'}>{user.role}</Badge>
          </EntitieCard>
        ))}
    </div>
  )
}
