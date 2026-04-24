import { Group, ActionIcon, Tooltip } from '@/components/base'
import { AppTable } from '@/components'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import type { IReview } from '@/store/slices/reviewsSlice'

interface ReviewsTableProps {
  list: IReview[]
  isLoading: boolean
  onEdit?: (_review: IReview) => void
  onDelete?: (_review: IReview) => void
}

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit?: (_review: IReview) => void
  onDelete?: (_review: IReview) => void
}) => [
  {
    key: 'product',
    header: 'Product',
    render: (r: IReview) => r.product?.title || 'N/A',
  },
  {
    key: 'user',
    header: 'User',
    render: (r: IReview) => r.user?.name || 'N/A',
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (r: IReview) => `${r.rating}/5`,
    width: 100,
  },
  {
    key: 'comment',
    header: 'Comment',
    render: (r: IReview) => r.comment,
  },
  {
    key: 'createdAt',
    header: 'Date',
    render: (r: IReview) => new Date(r.createdAt).toLocaleDateString(),
    width: 120,
  },
  {
    key: 'actions',
    header: 'Actions',
    width: 140,
    render: (review: IReview) => (
      <Group gap="xs">
        <Tooltip label="Edit review">
          <ActionIcon color="blue" onClick={() => onEdit?.(review)}>
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete review">
          <ActionIcon color="red" onClick={() => onDelete?.(review)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
]

export const ReviewsTable = ({
  list,
  isLoading,
  onEdit,
  onDelete,
}: ReviewsTableProps) => {
  const reviewsList = Array.isArray(list) ? list : []

  return (
    <AppTable<IReview>
      columns={columns({ onEdit, onDelete })}
      data={reviewsList}
      isLoading={isLoading}
      skeletonRows={10}
      emptyState="No reviews"
      getRowKey={(r) => r._id}
    />
  )
}
