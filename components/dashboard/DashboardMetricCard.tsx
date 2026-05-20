// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\dashboard\DashboardMetricCard.tsx
// Timestamp: 15 May 2026 15:20 Sydney
// ====================================================================

"use client"

interface Props {

  metric: {

    label: string

    value:
      string |
      number

    status:
      | "healthy"
      | "warning"
      | "critical"
  }
}

export default function DashboardMetricCard({
  metric
}: Props) {

  const borderClass = {

    healthy:
      "border-green-500",

    warning:
      "border-yellow-500",

    critical:
      "border-red-500"
  }

  return (

    <div
      className={`

        rounded-2xl
        border-2
        bg-zinc-900
        p-6
        shadow-xl

        ${borderClass[
          metric.status
        ]}
      `}
    >

      <div
        className="
          text-sm
          text-zinc-400
        "
      >

        {metric.label}

      </div>

      <div
        className="
          mt-3
          text-4xl
          font-bold
          text-white
        "
      >

        {metric.value}

      </div>

    </div>
  )
}