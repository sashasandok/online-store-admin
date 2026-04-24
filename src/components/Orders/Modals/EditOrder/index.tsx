import React, { useState, useEffect } from 'react'
import { Modal, Button, TextInput, NumberInput } from '@/components/base'
import { useAppDispatch } from '@/store/hooks'
import { updateOrder } from '@/store/slices/ordersSlice'
import type { IOrder } from '@/store/slices/ordersSlice'

interface EditOrderProps {
  order: IOrder | null
  opened: boolean
  onClose: () => void
}

export const EditOrder: React.FC<EditOrderProps> = ({
  order,
  opened,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  const [customer, setCustomer] = useState('')
  const [total, setTotal] = useState<number | ''>('')

  useEffect(() => {
    if (!order) return
    const timer = setTimeout(() => {
      setCustomer(order.customer)
      setTotal(order.total)
    }, 0)
    return () => clearTimeout(timer)
  }, [order])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!order) return
    await dispatch(
      updateOrder({
        id: order._id,
        customer,
        total: typeof total === 'number' ? total : 0,
      })
    )
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Order">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextInput
          label="Customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
        />
        <NumberInput
          label="Total"
          value={typeof total === 'number' ? total : undefined}
          onChange={setTotal}
          required
        />
        <div className="flex gap-3 justify-end">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
