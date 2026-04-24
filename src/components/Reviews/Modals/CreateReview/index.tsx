import React, { useState } from 'react'
import { Modal, Button, TextInput, NumberInput, Textarea } from '@/components/base'
import { useAppDispatch } from '@/store/hooks'
import { createReview } from '@/store/slices/reviewsSlice'

interface CreateReviewProps {
  opened: boolean
  onClose: () => void
}

export const CreateReview: React.FC<CreateReviewProps> = ({ opened, onClose }) => {
  const dispatch = useAppDispatch()
  const [productId, setProductId] = useState('')
  const [userId, setUserId] = useState('')
  const [rating, setRating] = useState<number | ''>('')
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(createReview({
      product: { _id: productId, title: 'Product Title' },
      user: { _id: userId, name: 'User Name' },
      rating: typeof rating === 'number' ? rating : 0,
      comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Create Review">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextInput label="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} required />
        <TextInput label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        <NumberInput label="Rating (1-5)" value={typeof rating === 'number' ? rating : undefined} onChange={setRating} min={1} max={5} required />
        <Textarea label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  )
}
