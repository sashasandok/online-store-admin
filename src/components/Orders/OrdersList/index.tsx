import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchOrders } from '@/store/slices/ordersSlice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button, PageLoader } from '@/components/base'
import { OrdersTable } from '../OrdersTable'
import { OrdersCards } from '../OrdersCards'
import { CreateOrder } from '../Modals/CreateOrder'
import { EditOrder } from '../Modals/EditOrder'
import { DeleteEntitieModal } from '../../DeleteEntitieModal'
import type { RootState } from '@/store/store'

type IOrder = RootState['orders']['ordersList'][number]

export const OrdersList = () => {
  const dispatch = useAppDispatch()
  const { ordersList = [], isLoading, error } = useAppSelector((state: RootState) => state.orders || {})
  const isDesktop = useMediaQuery('(min-width: 1200px)')

  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [editOrder, setEditOrder] = useState<IOrder | null>(null)
  const [deleteOrder, setDeleteOrder] = useState<IOrder | null>(null)

  useEffect(() => { dispatch(fetchOrders()) }, [dispatch])

  const handleRefresh = () => dispatch(fetchOrders())

  const heading = (
    <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-4 justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold m-0">Orders management</h2>
      <Button onClick={() => setCreateModalOpen(true)}>Create Order</Button>
    </div>
  )

  if (isLoading && ordersList.length === 0) {
    return <div>{heading}<div className="relative min-h-[400px]"><PageLoader /></div></div>
  }

  if (error && ordersList.length === 0) {
    return (
      <div>
        {heading}
        <div className="p-8 text-center"><p>Error loading orders: {error}</p><Button onClick={handleRefresh}>Retry</Button></div>
      </div>
    )
  }

  const showOrders = !isLoading && ordersList.length > 0
  const showEmptyState = !isLoading && ordersList.length === 0

  return (
    <div>
      {heading}
      {isLoading && <PageLoader />}
      {showEmptyState && <div className="p-8 text-center"><p>No orders found.</p></div>}
      {showOrders && isDesktop && (
        <OrdersTable list={ordersList} isLoading={isLoading} onEdit={setEditOrder} onDelete={setDeleteOrder} />
      )}
      {showOrders && !isDesktop && (
        <OrdersCards list={ordersList} onEdit={setEditOrder} onDelete={setDeleteOrder} />
      )}
      <CreateOrder opened={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
      <EditOrder order={editOrder} opened={!!editOrder} onClose={() => setEditOrder(null)} />
      <DeleteEntitieModal
        entitie={deleteOrder ? { _id: deleteOrder._id, name: deleteOrder._id } : null}
        opened={!!deleteOrder}
        onClose={() => setDeleteOrder(null)}
        entitieTitle="Order"
      />
    </div>
  )
}
