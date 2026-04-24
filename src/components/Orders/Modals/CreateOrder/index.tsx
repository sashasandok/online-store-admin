import React, { useState } from 'react'
import { Modal, Button, TextInput, NumberInput } from '@/components/base'
import { useAppDispatch } from '@/store/hooks'
import { createOrder } from '@/store/slices/ordersSlice'

interface CreateOrderProps {
  opened: boolean
  onClose: () => void
}

export const CreateOrder: React.FC<CreateOrderProps> = ({
  opened,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  const [customer, setCustomer] = useState('')
  const [total, setTotal] = useState<number | ''>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(
      createOrder({
        number: Date.now().toString(),
        customer,
        status: 'pending',
        total: typeof total === 'number' ? total : 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    )
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Create Order">
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
          <Button type="submit">Create</Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
