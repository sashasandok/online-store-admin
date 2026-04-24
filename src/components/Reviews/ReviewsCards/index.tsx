import React from 'react'
import { EntitieCard } from '@/components/EntitieCard'
import type { IReview } from '@/store/slices/reviewsSlice'

interface ReviewsCardsProps {
  list: IReview[]
  isLoading: boolean
  onEdit: (review: IReview) => void
  onDelete: (review: IReview) => void
}

export const ReviewsCards: React.FC<ReviewsCardsProps> = ({ list, onEdit, onDelete }) => {
  const reviewsList = Array.isArray(list) ? list : []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4">
      {reviewsList.map((review) => (
        <EntitieCard
          entitie={review}
          key={review._id}
          onEdit={onEdit ? () => onEdit(review) : undefined}
          onDelete={onDelete ? () => onDelete(review) : undefined}
        >
          <div className="mb-2"><strong>Product:</strong> {review.product?.title || 'N/A'}</div>
          <div className="mb-2"><strong>User:</strong> {review.user?.name || 'N/A'}</div>
          <div className="mb-2"><strong>Rating:</strong> {review.rating}/5</div>
          <div className="mb-2"><strong>Comment:</strong> {review.comment}</div>
          <div className="mb-2"><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</div>
        </EntitieCard>
      ))}
    </div>
  )
}
