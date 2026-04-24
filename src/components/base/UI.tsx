import type {
  FC,
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
  ElementType,
} from 'react'
import { Tooltip as HeroTooltip } from '@heroui/react'
import classNames from 'classnames'

// ─── Group ───────────────────────────────────────────────────────────────────

interface GroupProps {
  children: ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
  className?: string
  style?: CSSProperties
}

const gapMap: Record<string, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const justifyMap: Record<string, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
}

export const Group: FC<GroupProps> = ({
  children,
  gap = 'md',
  justify,
  className,
  style,
}) => (
  <div
    className={classNames(
      'flex items-center',
      gapMap[gap] ?? gap,
      justify && (justifyMap[justify] ?? `justify-${justify}`),
      className
    )}
    style={style}
  >
    {children}
  </div>
)

// ─── ActionIcon ──────────────────────────────────────────────────────────────

interface ActionIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'blue' | 'red' | 'green' | 'gray' | string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
}

const colorMap: Record<string, string> = {
  blue: 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30',
  red: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30',
  green: 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30',
  gray: 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
}

const sizeMap: Record<string, string> = {
  xs: 'p-0.5',
  sm: 'p-1',
  md: 'p-1.5',
  lg: 'p-2',
}

export const ActionIcon: FC<ActionIconProps> = ({
  color = 'gray',
  size = 'sm',
  className,
  children,
  ...rest
}) => (
  <button
    type="button"
    className={classNames(
      'inline-flex items-center justify-center rounded transition-colors cursor-pointer',
      colorMap[color] ?? `text-[${color}]`,
      sizeMap[size],
      className
    )}
    {...rest}
  >
    {children}
  </button>
)

// ─── Tooltip ─────────────────────────────────────────────────────────────────

interface TooltipProps {
  label: ReactNode
  children: ReactNode
}

export const Tooltip: FC<TooltipProps> = ({ label, children }) => (
  <HeroTooltip>
    <HeroTooltip.Trigger>{children}</HeroTooltip.Trigger>
    <HeroTooltip.Content showArrow>{label}</HeroTooltip.Content>
  </HeroTooltip>
)

// ─── Text ─────────────────────────────────────────────────────────────────────

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'

interface TextProps {
  children: ReactNode
  size?: TextSize
  weight?: TextWeight
  /** Shorthand for weight (Mantine-style: 400–900 or named) */
  fw?: number | TextWeight
  color?: string
  /** Shorthand for color (Mantine-style: 'dimmed' maps to muted color) */
  c?: string
  className?: string
  style?: CSSProperties
  as?: ElementType
}

const textSizeMap: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const textWeightMap: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const resolveColor = (c?: string, color?: string): string | undefined => {
  const val = c ?? color
  if (!val) return undefined
  if (val === 'dimmed') return 'var(--color-text-weak)'
  return val
}

const resolveFontWeight = (
  fw?: number | TextWeight,
  weight?: TextWeight
): string => {
  if (fw !== undefined) {
    if (typeof fw === 'number') return `font-[${fw}]`
    return textWeightMap[fw] ?? 'font-normal'
  }
  return textWeightMap[weight ?? 'normal']
}

export const Text: FC<TextProps> = ({
  children,
  size = 'md',
  weight,
  fw,
  color,
  c,
  className,
  style,
  as: Tag = 'p',
}) => (
  <Tag
    className={classNames(
      textSizeMap[size],
      resolveFontWeight(fw, weight),
      className
    )}
    style={{ color: resolveColor(c, color), ...style }}
  >
    {children}
  </Tag>
)

// ─── Stack ───────────────────────────────────────────────────────────────────

interface StackProps {
  children: ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
  align?: 'start' | 'end' | 'center' | 'stretch'
  className?: string
  style?: CSSProperties
}

const stackGapMap: Record<string, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const stackAlignMap: Record<string, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  stretch: 'items-stretch',
}

export const Stack: FC<StackProps> = ({
  children,
  gap = 'md',
  align = 'stretch',
  className,
  style,
}) => (
  <div
    className={classNames(
      'flex flex-col',
      stackGapMap[gap] ?? gap,
      stackAlignMap[align] ?? align,
      className
    )}
    style={style}
  >
    {children}
  </div>
)
