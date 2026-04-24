export type KPITrend = 'up' | 'down' | 'neutral'

export interface KpiCardProps {
  label: string
  value: string
  delta?: string
  trend?: KPITrend
}

const deltaClass = (trend: KPITrend) => {
  if (trend === 'up')
    return 'text-green-700 bg-green-500/12 border-green-500/25'
  if (trend === 'down') return 'text-red-700 bg-red-500/12 border-red-500/25'
  return 'text-slate-500 bg-slate-400/12 border-slate-400/25'
}

export const KpiCard = ({
  label,
  value,
  delta,
  trend = 'neutral',
}: KpiCardProps) => {
  return (
    <div className="border border-[rgba(148,163,184,0.25)] bg-white dark:bg-[rgba(2,6,23,0.45)] rounded-xl p-3.5">
      <div className="text-xs text-[rgba(15,23,42,0.7)] dark:text-[rgba(226,232,240,0.75)]">
        {label}
      </div>
      <div className="mt-2 font-extrabold text-xl">{value}</div>
      {delta && (
        <div
          className={`mt-2 text-xs font-bold inline-flex px-2.5 py-1 rounded-full border ${deltaClass(trend)}`}
        >
          {delta}
        </div>
      )}
    </div>
  )
}
