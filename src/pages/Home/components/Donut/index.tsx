export interface DonutProps {
  label: string
  value: number
  color?: string
  className?: string
}

export const Donut = ({
  label,
  value,
  color = '#3b82f6',
  className,
}: DonutProps) => {
  const clamped = Math.max(0, Math.min(100, value))
  const r = 18
  const c = 2 * Math.PI * r
  const dash = (clamped / 100) * c

  return (
    <div
      className={`grid grid-cols-[56px_1fr] items-center gap-2.5 border border-[rgba(148,163,184,0.22)] rounded-xl p-2.5 bg-[rgba(15,23,42,0.02)] dark:bg-[rgba(148,163,184,0.06)] dark:border-[rgba(148,163,184,0.18)]${className ? ` ${className}` : ''}`}
    >
      <svg viewBox="0 0 48 48" className="w-14 h-14">
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="rgba(148, 163, 184, 0.35)"
          strokeWidth="6"
        />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90 24 24)"
        />
      </svg>
      <div className="min-w-0">
        <div className="font-extrabold">{clamped}%</div>
        <div className="text-xs text-[rgba(15,23,42,0.7)] dark:text-[rgba(226,232,240,0.75)]">
          {label}
        </div>
      </div>
    </div>
  )
}
