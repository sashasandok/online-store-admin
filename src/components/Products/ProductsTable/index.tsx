import { Group, ActionIcon, Tooltip } from '@/components/base'
import { AppTable } from '@/components'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import type { IProduct } from '@/store/slices/productSlice'

interface ProductsTableProps {
  list: IProduct[]
  isLoading: boolean
  onEdit?: (_product: IProduct) => void
  onDelete?: (_product: IProduct) => void
}

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit?: (_product: IProduct) => void
  onDelete?: (_product: IProduct) => void
}) => [
  {
    key: 'title',
    header: 'Title',
    render: (p: IProduct) => p.title,
  },
  {
    key: 'description',
    header: 'Description',
    render: (p: IProduct) => p.description,
  },
  {
    key: 'category',
    header: 'Category',
    render: (p: IProduct) => p?.category?.name,
  },
  {
    key: 'price',
    header: 'Price',
    render: (p: IProduct) => `$${p.price.toFixed(2)}`,
    width: 120,
  },
  {
    key: 'stock',
    header: 'Stock',
    render: (p: IProduct) => p.stock,
    width: 100,
  },
  {
    key: 'actions',
    header: 'Actions',
    width: 140,
    render: (product: IProduct) => (
      <Group gap="xs">
        <Tooltip label="Edit product">
          <ActionIcon color="blue" onClick={() => onEdit?.(product)}>
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete product">
          <ActionIcon color="red" onClick={() => onDelete?.(product)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
]

export const ProductsTable = ({
  list,
  isLoading,
  onEdit,
  onDelete,
}: ProductsTableProps) => {
  return (
    <AppTable<IProduct>
      columns={columns({ onEdit, onDelete })}
      data={list}
      isLoading={isLoading}
      skeletonRows={10}
      emptyState="No products"
      getRowKey={(p) => p._id}
    />
  )
}
