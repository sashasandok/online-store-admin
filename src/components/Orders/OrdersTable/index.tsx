import { Group, ActionIcon, Tooltip } from '@/components/base'
import { AppTable } from '@/components'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import type { IOrder } from '@/store/slices/ordersSlice'

interface OrdersTableProps {
  list: IOrder[]
  isLoading: boolean
  onEdit?: (_order: IOrder) => void
  onDelete?: (_order: IOrder) => void
}

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit?: (_order: IOrder) => void
  onDelete?: (_order: IOrder) => void
}) => [
  {
    key: 'number',
    header: 'Number',
    render: (o: IOrder) => o.number,
  },
  {
    key: 'customer',
    header: 'Customer',
    render: (o: IOrder) => o.customer,
  },
  {
    key: 'status',
    header: 'Status',
    render: (o: IOrder) => o.status,
  },
  {
    key: 'total',
    header: 'Total',
    render: (o: IOrder) => `$${o.total.toFixed(2)}`,
    width: 120,
  },
  {
    key: 'createdAt',
    header: 'Date',
    render: (o: IOrder) => new Date(o.createdAt).toLocaleDateString(),
    width: 120,
  },
  {
    key: 'actions',
    header: 'Actions',
    width: 140,
    render: (order: IOrder) => (
      <Group gap="xs">
        <Tooltip label="Edit order">
          <ActionIcon color="blue" onClick={() => onEdit?.(order)}>
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete order">
          <ActionIcon color="red" onClick={() => onDelete?.(order)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
]

export const OrdersTable = ({
  list,
  isLoading,
  onEdit,
  onDelete,
}: OrdersTableProps) => {
  return (
    <AppTable<IOrder>
      columns={columns({ onEdit, onDelete })}
      data={list}
      isLoading={isLoading}
      skeletonRows={10}
      emptyState="No orders"
      getRowKey={(o) => o._id}
    />
  )
}
