import type { FC } from 'react'
import { Spinner } from '@heroui/react'

interface PageLoaderProps {
  text?: string
}

export const PageLoader: FC<PageLoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <Spinner size="lg" />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  )
}
