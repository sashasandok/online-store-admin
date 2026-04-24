import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { Sidebar } from '@/components'

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleCloseSidebar = () => setIsSidebarOpen(false)

  useEffect(() => {
    if (!isSidebarOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isSidebarOpen])

  useEffect(() => {
    if (!isSidebarOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isSidebarOpen])

  return (
    <div className="flex flex-1 min-h-0 max-xl:flex-col">
      {/* Mobile top bar */}
      <header className="xl:hidden flex items-center gap-3 h-14 px-4 border-b border-(--color-border) bg-(--color-surface) sticky top-0 z-40">
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] border border-(--color-border) bg-(--color-surface) text-(--color-text) cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          <IconMenu2 size={20} />
        </button>
        <div className="font-bold text-(--color-text)">Dashboard</div>
      </header>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/35 backdrop-blur-sm z-50"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar drawer (mobile) / static (desktop) */}
      <div
        className={`xl:static xl:translate-x-0! xl:visible! xl:pointer-events-auto! fixed top-0 left-0 h-dvh w-70 z-60 bg-(--color-surface) border-r border-(--color-border) shadow-xl transition-transform duration-200 ease ${
          isSidebarOpen
            ? 'translate-x-0 visible pointer-events-auto'
            : '-translate-x-full invisible pointer-events-none'
        }`}
      >
        <div className="xl:hidden flex justify-end p-3 border-b border-(--color-border)">
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] border border-(--color-border) bg-(--color-surface) text-(--color-text) cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <IconX size={20} />
          </button>
        </div>
        <Sidebar onNavigate={handleCloseSidebar} />
      </div>

      <div className="flex-1 p-4 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}

export { DashboardNotFound } from './NotFound'
