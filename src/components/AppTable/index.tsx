import React from 'react'
import { Table, Skeleton } from '@/components/base'

export type AppTableColumn<T> = {
  key: string
  header: React.ReactNode
  render: (row: T) => React.ReactNode
  width?: string | number
}

export interface AppTableProps<T> {
  columns: Array<AppTableColumn<T>>
  data: T[]
  /** Unique key for each row */
  getRowKey: (row: T, index: number) => React.Key
  isLoading?: boolean
  /** Number of skeleton rows when isLoading */
  skeletonRows?: number
  /** Empty state shown when !isLoading and data is empty */
  emptyState?: React.ReactNode
  className?: string
}

export const AppTable = <T,>({
  columns,
  data,
  getRowKey,
  isLoading = false,
  skeletonRows = 10,
  emptyState,
  className,
}: AppTableProps<T>) => {
  const safeData = Array.isArray(data) ? data : []
  const showEmpty = !isLoading && safeData.length === 0

  return (
    <div
      className={`w-full xl:max-w-300 xl:mx-auto${className ? ` ${className}` : ''}`}
    >
      <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch] [&_table]:w-full [&_table]:min-w-140 sm:[&_table]:min-w-180">
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              {columns.map((c) => (
                <Table.Th key={c.key} style={{ width: c.width }}>
                  {c.header}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {isLoading
              ? Array.from({ length: skeletonRows }).map((_, i) => (
                  <Table.Tr key={`skeleton-${i}`}>
                    {columns.map((c) => (
                      <Table.Td key={c.key}>
                        <Skeleton height={18} width="80%" />
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))
              : safeData.map((row, index) => (
                  <Table.Tr key={getRowKey(row, index)}>
                    {columns.map((c) => (
                      <Table.Td key={c.key}>{c.render(row)}</Table.Td>
                    ))}
                  </Table.Tr>
                ))}
          </Table.Tbody>
        </Table>
      </div>

      {showEmpty && (
        <div className="p-4 text-center text-(--color-text-weak)">
          {emptyState ?? 'No data'}
        </div>
      )}
    </div>
  )
}
