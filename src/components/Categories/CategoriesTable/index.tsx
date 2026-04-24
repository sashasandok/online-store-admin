import { AppTable } from '@/components'
import { Group, ActionIcon, Tooltip } from '@/components/base'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import type { ICategory } from '@/store/slices/categoriesSlice'

interface CategoriesTableProps {
  list: ICategory[]
  isLoading: boolean
  onEdit?: (_category: ICategory) => void
  onDelete?: (_category: ICategory) => void
}

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit?: (_category: ICategory) => void
  onDelete?: (_category: ICategory) => void
}) => [
  {
    key: 'name',
    header: 'Name',
    render: (c: ICategory) => c.name,
  },
  {
    key: 'actions',
    header: 'Actions',
    width: 140,
    render: (category: ICategory) => (
      <Group gap="xs">
        <Tooltip label="Edit category">
          <ActionIcon color="blue" onClick={() => onEdit?.(category)}>
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete category">
          <ActionIcon color="red" onClick={() => onDelete?.(category)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
]

export const CategoriesTable = ({
  list,
  isLoading,
  onEdit,
  onDelete,
}: CategoriesTableProps) => {
  return (
    <AppTable<ICategory>
      columns={columns({ onEdit, onDelete })}
      data={list}
      isLoading={isLoading}
      skeletonRows={10}
      emptyState="No categories"
      getRowKey={(c) => c._id}
    />
  )
}
