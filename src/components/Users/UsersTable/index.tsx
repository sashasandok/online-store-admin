import { AppTable } from '@/components'
import { Group, ActionIcon, Tooltip, Badge } from '@/components/base'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import type { IUser } from '@/store/slices/usersSlice'

interface UsersTableProps {
  list: IUser[]
  isLoading: boolean
  onEdit?: (_user: IUser) => void
  onDelete?: (_user: IUser) => void
}

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit?: (_user: IUser) => void
  onDelete?: (_user: IUser) => void
}) => [
  {
    key: 'name',
    header: 'Name',
    render: (u: IUser) => u.name,
  },
  {
    key: 'email',
    header: 'Email',
    render: (u: IUser) => u.email,
  },
  {
    key: 'role',
    header: 'Role',
    render: (u: IUser) => (
      <Badge color={u.role === 'admin' ? 'blue' : 'gray'}>{u.role}</Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    width: 140,
    render: (user: IUser) => (
      <Group gap="xs">
        <Tooltip label="Edit user">
          <ActionIcon color="blue" onClick={() => onEdit?.(user)}>
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete user">
          <ActionIcon color="red" onClick={() => onDelete?.(user)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
]

export const UsersTable = ({
  list,
  isLoading,
  onEdit,
  onDelete,
}: UsersTableProps) => {
  return (
    <AppTable<IUser>
      columns={columns({ onEdit, onDelete })}
      data={list}
      isLoading={isLoading}
      skeletonRows={10}
      emptyState="No users"
      getRowKey={(u) => u._id}
    />
  )
}
