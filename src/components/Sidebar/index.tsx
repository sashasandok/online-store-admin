import {
  IconLayoutDashboard,
  IconPackage,
  IconTags,
  IconShoppingCart,
  IconUsers,
  IconStar,
} from '@tabler/icons-react'
import { Link, useLocation } from 'react-router'

interface SidebarProps {
  onNavigate?: () => void
}

export const Sidebar = ({ onNavigate }: SidebarProps) => {
  const { pathname } = useLocation()

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 font-semibold no-underline transition-colors duration-150 rounded-lg mx-2 my-0.5 ${
      pathname === path
        ? 'bg-(--color-brand) text-white! shadow-sm'
        : 'text-(--color-text-muted) hover:bg-(--color-border) hover:text-(--color-text) active:opacity-80'
    }`

  const iconProps = { size: 18, stroke: 1.8 }

  const links = [
    {
      to: '/dashboard',
      icon: <IconLayoutDashboard {...iconProps} />,
      label: 'Dashboard',
    },
    {
      to: '/dashboard/products',
      icon: <IconPackage {...iconProps} />,
      label: 'Products',
    },
    {
      to: '/dashboard/categories',
      icon: <IconTags {...iconProps} />,
      label: 'Categories',
    },
    {
      to: '/dashboard/orders',
      icon: <IconShoppingCart {...iconProps} />,
      label: 'Orders',
    },
    {
      to: '/dashboard/users',
      icon: <IconUsers {...iconProps} />,
      label: 'Users',
    },
    {
      to: '/dashboard/reviews',
      icon: <IconStar {...iconProps} />,
      label: 'Reviews',
    },
  ]

  return (
    <aside className="w-50 max-lg:w-full max-lg:h-full max-lg:overflow-y-auto bg-(--color-surface) text-(--color-text) border-r border-(--color-border)">
      <nav>
        <ul className="list-none p-0 m-0">
          {links.map(({ to, icon, label }) => (
            <li key={to}>
              <Link to={to} className={linkClass(to)} onClick={onNavigate}>
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
