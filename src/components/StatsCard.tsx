import { type ReactNode } from 'react'

export interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
  highlight?: string
  icon?: ReactNode
  imageSrc?: string
}

function StatsCard({ title, value, subtitle, highlight, icon, imageSrc }: StatsCardProps) {
  return (
    <div className="relative bg-white p-6 flex flex-col gap-2 overflow-hidden" style={{ borderRadius: 0 }}>
      <span className="text-xs uppercase tracking-wide text-gray-500">{title}</span>
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      {subtitle && (
        <span className="text-sm text-gray-500">{subtitle}</span>
      )}
      {highlight && (
        <span className="text-xs font-medium text-gray-900">{highlight}</span>
      )}

      {icon && (
        <div className="pointer-events-none absolute -bottom-6 -right-6 opacity-20 text-gray-400">
          {icon}
        </div>
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="pointer-events-none absolute -bottom-6 -right-6 w-32 opacity-40 object-cover"
          draggable={false}
        />
      )}
    </div>
  )
}

export default StatsCard
