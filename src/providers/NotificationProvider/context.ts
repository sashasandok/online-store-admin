import { createContext } from 'react'

export interface NotificationContextType {
  showNotification: (
    message: string,
    type: 'error' | 'success' | 'info'
  ) => void
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)
