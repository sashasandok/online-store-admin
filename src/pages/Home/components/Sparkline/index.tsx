export interface SparklineProps {
  values: number[]
  ariaLabel?: string
  className?: string
}

export const Sparkline = ({
  values,
  ariaLabel = 'Trend chart',
  className,
}: SparklineProps) => {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = Math.max(1, max - min)

  const points = values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * 100
      const y = 100 - ((v - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`w-full h-27.5 text-blue-500 bg-linear-to-b from-blue-500/8 to-transparent rounded-xl p-2${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={ariaLabel}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
