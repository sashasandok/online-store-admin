import { useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { StoreProvider } from './StoreProvider'
import { PageLoader } from '@/components'
import { ThemeProvider } from './ThemeProvider'
import { NotificationProvider } from './NotificationProvider'

const AppLoadingGate: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageLoader text="Loading application..." />
  }

  return <>{children}</>
}

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <NotificationProvider>
          <AppLoadingGate>{children}</AppLoadingGate>
        </NotificationProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
