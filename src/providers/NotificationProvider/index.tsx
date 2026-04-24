import { useState } from 'react'
import type { ReactNode } from 'react'
import { Alert } from '@/components/base'
import { NotificationContext } from './context'

interface Notification {
  id: number
  message: string
  type: 'error' | 'success' | 'info'
}

let notificationId = 0

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = (
    message: string,
    type: 'error' | 'success' | 'info' = 'info'
  ) => {
    const id = ++notificationId
    const notification = { id, message, type }

    setNotifications((prev) => [...prev, notification])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 5000)
  }

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed bottom-4 right-4 z-9999 flex flex-col gap-2 w-80">
        {notifications.map((notification) => (
          <Alert
            key={notification.id}
            variant={notification.type === 'info' ? 'info' : notification.type}
            onClose={() => dismissNotification(notification.id)}
          >
            {notification.message}
          </Alert>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
