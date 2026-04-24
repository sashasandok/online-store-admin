import { Link } from 'react-router'
import { Button } from '@/components/base'
import { Donut, KpiCard, type KPITrend, Sparkline } from './components'

type KPI = {
  label: string
  value: string
  delta?: string
  trend?: KPITrend
}

const muted = 'text-[rgba(15,23,42,0.7)] dark:text-[rgba(226,232,240,0.75)]'
const panel =
  'border border-[rgba(148,163,184,0.25)] bg-white dark:bg-[rgba(2,6,23,0.45)] rounded-xl p-3.5'

export const Home = () => {
  const kpis: KPI[] = [
    { label: 'Revenue (30d)', value: '$24,980', delta: '+12.4%', trend: 'up' },
    { label: 'Orders (30d)', value: '1,248', delta: '+6.1%', trend: 'up' },
    {
      label: 'Avg. order value',
      value: '$20.02',
      delta: '-1.2%',
      trend: 'down',
    },
    { label: 'Refund rate', value: '0.8%', delta: '0.0%', trend: 'neutral' },
  ]

  return (
    <div className="p-6 max-w-300 mx-auto">
      <section className="grid gap-5 mb-6 min-[920px]:grid-cols-[1.2fr_1fr]">
        <div className={`${panel} flex flex-col gap-4`}>
          <h1 className="text-3xl font-bold m-0 leading-tight">Store Admin</h1>
          <p className={`m-0 max-w-[60ch] ${muted}`}>
            Manage products, orders, users and reviews. Track performance with
            real-time insights.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-1">
            <Link to="/dashboard">
              <Button>Open Dashboard</Button>
            </Link>
            <Link to="/dashboard/products">
              <Button variant="outline">Manage Products</Button>
            </Link>
          </div>
        </div>

        <div className={panel}>
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between gap-3 items-start">
              <div>
                <div className="font-bold text-base">Online Store</div>
                <div className={`text-xs ${muted}`}>
                  Admin panel • Last sync: 2 min ago
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/14 border border-green-500/25 text-green-700 font-semibold">
                Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Timezone', value: 'UTC+2' },
                { label: 'Currency', value: 'USD' },
                { label: 'Catalog', value: '412 products' },
                { label: 'Stock alerts', value: '7 low' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className={`text-xs ${muted} mb-1`}>{label}</div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="flex max-[520px]:flex-col max-[520px]:items-start justify-between items-center gap-3 mb-3">
          <h2 className="text-lg font-bold m-0">Overview</h2>
          <Link to="/dashboard/orders">
            <Button variant="primary">View Orders</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[980px]:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-bold m-0 mb-3">Statistics</h2>
        <div className="grid grid-cols-1 min-[980px]:grid-cols-3 gap-3">
          <div className={panel}>
            <div className="flex justify-between items-start gap-2.5 mb-3">
              <div>
                <div className="font-bold">Sales trend</div>
                <div className={`text-xs ${muted} mt-0.5`}>Last 14 days</div>
              </div>
              <div className="font-extrabold">$9.2k</div>
            </div>
            <Sparkline
              values={[10, 12, 11, 14, 13, 18, 16, 19, 17, 21, 20, 24, 23, 26]}
            />
            <div className={`mt-2.5 text-xs ${muted} flex items-center gap-2`}>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Revenue
            </div>
          </div>

          <div className={panel}>
            <div className="flex justify-between items-start gap-2.5 mb-3">
              <div>
                <div className="font-bold">Fulfillment</div>
                <div className={`text-xs ${muted} mt-0.5`}>
                  Delivery performance
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <Donut label="Delivered" value={78} color="#22c55e" />
              <Donut label="In transit" value={16} color="#3b82f6" />
              <Donut label="Issues" value={6} color="#ef4444" />
            </div>
            <div className="mt-3 rounded-xl p-2.5 border border-dashed border-[rgba(148,163,184,0.5)] bg-[rgba(148,163,184,0.08)]">
              <div className="font-bold text-xs mb-1">Tip</div>
              <div className={`text-xs ${muted}`}>
                Connect real analytics later (Recharts/Chart.js). This page
                currently uses lightweight inline SVG.
              </div>
            </div>
          </div>

          <div className={panel}>
            <div className="flex justify-between items-start gap-2.5 mb-3">
              <div>
                <div className="font-bold">Popular categories</div>
                <div className={`text-xs ${muted} mt-0.5`}>Share of sales</div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { name: 'Electronics', value: 62 },
                { name: 'Clothing', value: 41 },
                { name: 'Home', value: 28 },
                { name: 'Beauty', value: 19 },
              ].map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-[110px_1fr_44px] items-center gap-2.5"
                >
                  <div className={`text-xs ${muted} truncate`}>{item.name}</div>
                  <div className="h-2.5 rounded-full bg-[rgba(148,163,184,0.22)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-blue-500 to-green-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <div className={`text-xs font-bold ${muted} text-right`}>
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
