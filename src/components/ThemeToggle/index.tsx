import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from '@/providers/ThemeProvider/useTheme'

export const ThemeToggle = () => {
  const { mode, toggle } = useTheme()

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 h-9 px-3 rounded-[10px] border border-(--color-border) bg-(--color-surface) text-(--color-text) cursor-pointer select-none transition-[background-color,border-color,transform] duration-150 ease hover:bg-(--color-surface-subtle) hover:border-(--color-border-strong) active:translate-y-px focus-visible:outline-2 focus-visible:outline-(--color-brand) focus-visible:outline-offset-2"
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={mode === 'dark' ? 'Light theme' : 'Dark theme'}
    >
      {mode === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
      <span className="text-[13px] font-semibold text-(--color-text-muted)">
        {mode === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
