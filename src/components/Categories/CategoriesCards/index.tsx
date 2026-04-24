import { EntitieCard } from '@/components/EntitieCard'
import { Skeleton } from '@/components/base'
import type { ICategory } from '@/store/slices/categoriesSlice'

export interface CategoriesCardsProps {
  list: ICategory[]
  isLoading: boolean
  onEdit?: (_category: ICategory) => void
  onDelete?: (_category: ICategory) => void
}

export const CategoriesCards = ({
  list,
  isLoading,
  onEdit,
  onDelete,
}: CategoriesCardsProps) => {
  const categoriesList = Array.isArray(list) ? list : []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4" aria-busy>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border border-(--color-border) bg-(--color-surface) rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden"
          >
            <Skeleton height={18} width="70%" />
            <Skeleton height={36} width="60%" />
          </div>
        ))}
      </div>
    )
  }

  if (categoriesList.length === 0) {
    return <div className="p-4 text-center text-(--color-text-weak)">No categories</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4">
      {categoriesList.map((c) => (
        <EntitieCard
          key={c._id}
          entitie={c}
          onEdit={() => onEdit?.(c)}
          onDelete={() => onDelete?.(c)}
        >
          <h3 className="m-0 text-base leading-snug text-(--color-text)">{c.name}</h3>
        </EntitieCard>
      ))}
    </div>
  )
}
