import React from 'react'
import { EntitieCard } from '@/components/EntitieCard'
import type { IOrder } from '@/store/slices/ordersSlice'

interface OrdersCardsProps {
  list: IOrder[]
  onEdit: (order: IOrder) => void
  onDelete: (order: IOrder) => void
}

export const OrdersCards: React.FC<OrdersCardsProps> = ({ list, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4">
      {list.map((order) => (
        <EntitieCard
          entitie={order}
          key={order._id}
          onEdit={onEdit ? () => onEdit(order) : undefined}
          onDelete={onDelete ? () => onDelete(order) : undefined}
        >
          <div className="mb-2"><strong>Number:</strong> {order.number}</div>
          <div className="mb-2"><strong>Customer:</strong> {order.customer}</div>
          <div className="mb-2"><strong>Status:</strong> {order.status}</div>
          <div className="mb-2"><strong>Total:</strong> {order.total}</div>
          <div className="mb-2"><strong>Date:</strong> {order.createdAt}</div>
        </EntitieCard>
      ))}
    </div>
  )
}
