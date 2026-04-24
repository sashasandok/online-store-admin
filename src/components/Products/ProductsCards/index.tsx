import { EntitieCard } from '@/components/EntitieCard'
import { Skeleton } from '@/components/base'
import type { IProduct } from '@/store/slices/productSlice'

export interface ProductsCardsProps {
  list: IProduct[]
  isLoading: boolean
  onEdit?: (_product: IProduct) => void
  onDelete?: (_product: IProduct) => void
}

const formatMoney = (value: number) => `$${value.toFixed(2)}`

export const ProductsCards = ({ list, isLoading, onEdit, onDelete }: ProductsCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4" aria-busy>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-(--color-border) bg-(--color-surface) rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
            <Skeleton height={18} width="70%" />
            <Skeleton height={14} width="100%" />
            <Skeleton height={14} width="100%" />
            <Skeleton height={36} width="60%" />
          </div>
        ))}
      </div>
    )
  }

  if (list.length === 0) {
    return <div className="p-4 text-center text-(--color-text-weak)">No products</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-3 sm:gap-4">
      {list.map((p) => (
        <EntitieCard key={p._id} entitie={p} onEdit={() => onEdit?.(p)} onDelete={() => onDelete?.(p)}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="m-0 text-base leading-snug text-(--color-text)">{p.title}</h3>
            <div className="font-bold text-(--color-text) shrink-0">{formatMoney(p.price)}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-3">
              <span className="text-sm text-(--color-text-weak)">Category</span>
              <span className="text-sm text-(--color-text) text-right">{p?.category?.name ?? '—'}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-sm text-(--color-text-weak)">Stock</span>
              <span className="text-sm text-(--color-text) text-right">{p.stock}</span>
            </div>
            {p.description && (
              <p className="mt-1 text-sm text-(--color-text-weak) leading-snug m-0">{p.description}</p>
            )}
          </div>
        </EntitieCard>
      ))}
    </div>
  )
}
