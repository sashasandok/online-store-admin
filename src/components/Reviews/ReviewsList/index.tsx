import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchReviews } from '@/store/slices/reviewsSlice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button, PageLoader } from '@/components/base'
import { ReviewsTable } from '../ReviewsTable'
import { ReviewsCards } from '../ReviewsCards'
import { CreateReview } from '../Modals/CreateReview'
import { EditReview } from '../Modals/EditReview'
import { DeleteEntitieModal } from '../../DeleteEntitieModal'
import type { RootState } from '@/store/store'

type IReview = RootState['reviews']['reviewsList'][number]

export const ReviewsList = () => {
  const dispatch = useAppDispatch()
  const { reviewsList = [], isLoading, error } = useAppSelector((state: RootState) => state.reviews || {})
  const isDesktop = useMediaQuery('(min-width: 1200px)')

  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [editReview, setEditReview] = useState<IReview | null>(null)
  const [deleteReview, setDeleteReview] = useState<IReview | null>(null)

  useEffect(() => { dispatch(fetchReviews()) }, [dispatch])

  const handleRefresh = () => dispatch(fetchReviews())

  const heading = (
    <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-4 justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold m-0">Reviews management</h2>
      <Button onClick={() => setCreateModalOpen(true)}>Create Review</Button>
    </div>
  )

  if (isLoading && reviewsList.length === 0) {
    return <div>{heading}<div className="relative min-h-[400px]"><PageLoader /></div></div>
  }

  if (error && reviewsList.length === 0) {
    return (
      <div>
        {heading}
        <div className="p-8 text-center"><p>Error loading reviews: {error}</p><Button onClick={handleRefresh}>Retry</Button></div>
      </div>
    )
  }

  return (
    <div>
      {heading}
      <div className={isDesktop ? '' : ''}>
        {isDesktop ? (
          <ReviewsTable list={reviewsList} isLoading={isLoading} onEdit={setEditReview} onDelete={setDeleteReview} />
        ) : (
          <ReviewsCards list={reviewsList} isLoading={isLoading} onEdit={setEditReview} onDelete={setDeleteReview} />
        )}
      </div>
      <CreateReview opened={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
      <EditReview review={editReview} opened={!!editReview} onClose={() => setEditReview(null)} />
      <DeleteEntitieModal
        entitie={deleteReview ? { _id: deleteReview._id, name: deleteReview._id } : null}
        opened={!!deleteReview}
        onClose={() => setDeleteReview(null)}
        entitieTitle="Review"
      />
    </div>
  )
}
