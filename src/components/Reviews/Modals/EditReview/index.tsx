import React, { useState } from 'react'
import { Modal, Button, NumberInput, Textarea } from '@/components/base'
import { useAppDispatch } from '@/store/hooks'
import { updateReview } from '@/store/slices/reviewsSlice'
import type { IReview } from '@/store/slices/reviewsSlice'

interface EditReviewProps {
  review: IReview | null
  opened: boolean
  onClose: () => void
}

export const EditReview: React.FC<EditReviewProps> = ({ review, opened, onClose }) => {
  const dispatch = useAppDispatch()
  const [rating, setRating] = useState<number | ''>(review?.rating ?? '')
  const [comment, setComment] = useState(review?.comment ?? '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!review) return
    await dispatch(updateReview({ id: review._id, rating: typeof rating === 'number' ? rating : 0, comment }))
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Review">
      <form key={review?._id} className="grid gap-4" onSubmit={handleSubmit}>
        <NumberInput label="Rating (1-5)" value={typeof rating === 'number' ? rating : undefined} onChange={setRating} min={1} max={5} required />
        <Textarea label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  )
}
