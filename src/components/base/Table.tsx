import type { FC, ReactNode, CSSProperties } from 'react'
import { Skeleton as HeroSkeleton } from '@heroui/react'
import classNames from 'classnames'

// ─── Skeleton ────────────────────────────────────────────────────────────────

interface SkeletonProps {
  height?: number | string
  width?: number | string
  className?: string
}

export const Skeleton: FC<SkeletonProps> = ({ height, width, className }) => {
  const style: CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
  }

  return (
    <HeroSkeleton className={classNames('rounded', className)} style={style} />
  )
}

// ─── Table ───────────────────────────────────────────────────────────────────

interface TableRootProps {
  children: ReactNode
  striped?: boolean
  highlightOnHover?: boolean
  withTableBorder?: boolean
  withColumnBorders?: boolean
  className?: string
}

const TableRoot: FC<TableRootProps> & {
  Thead: FC<{ children: ReactNode }>
  Tbody: FC<{ children: ReactNode }>
  Tr: FC<{ children: ReactNode; className?: string }>
  Th: FC<{ children: ReactNode; style?: CSSProperties }>
  Td: FC<{ children: ReactNode }>
} = ({
  children,
  striped,
  highlightOnHover,
  withTableBorder,
  withColumnBorders,
  className,
}) => {
  return (
    <table
      className={classNames(
        'w-full border-collapse text-sm',
        withTableBorder && 'border border-(--color-border)',
        withColumnBorders &&
          '[&_th]:border-x [&_th]:border-(--color-border) [&_td]:border-x [&_td]:border-(--color-border)',
        striped && '[&_tbody_tr:nth-child(odd)]:bg-(--color-surface-raised)',
        highlightOnHover && '[&_tbody_tr:hover]:bg-(--color-surface-hover)',
        className
      )}
    >
      {children}
    </table>
  )
}

const Thead: FC<{ children: ReactNode }> = ({ children }) => (
  <thead className="bg-(--color-surface-raised) text-(--color-text-weak) uppercase text-xs">
    {children}
  </thead>
)

const Tbody: FC<{ children: ReactNode }> = ({ children }) => (
  <tbody>{children}</tbody>
)

const Tr: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <tr
    className={classNames(
      'border-b border-(--color-border) transition-colors',
      className
    )}
  >
    {children}
  </tr>
)

const Th: FC<{ children: ReactNode; style?: CSSProperties }> = ({
  children,
  style,
}) => (
  <th
    className="px-4 py-3 text-left font-semibold whitespace-nowrap"
    style={style}
  >
    {children}
  </th>
)

const Td: FC<{ children: ReactNode }> = ({ children }) => (
  <td className="px-4 py-3 align-middle">{children}</td>
)

TableRoot.Thead = Thead
TableRoot.Tbody = Tbody
TableRoot.Tr = Tr
TableRoot.Th = Th
TableRoot.Td = Td

export const Table = TableRoot
