// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\dashboard\page.tsx
// Timestamp: 15 May 2026 15:00 Sydney
// ====================================================================

"use client"

import {
  useEffect,
  useState
} from "react"

import {
  fetchDashboardStatus
} from "../../lib/dashboard/dashboardApi"

import DashboardMetricCard
from "../../components/dashboard/DashboardMetricCard"

export default function DashboardPage() {

  const [
    dashboard,
    setDashboard
  ] = useState<any>(
    null
  )

  useEffect(() => {

    fetchDashboardStatus()
      .then(
        setDashboard
      )

  }, [])

  if (!dashboard) {

    return (

      <main
        className="
          min-h-screen
          bg-black
          p-8
          text-white
        "
      >

        Loading Dashboard...

      </main>
    )
  }

  return (

    <main
      className="
        min-h-screen
        bg-black
        p-8
        text-white
      "
    >

      <div
        className="
          mb-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold
          "
        >

          JustDefenders
          Command Centre

        </h1>

        <p
          className="
            mt-3
            text-zinc-400
          "
        >

          Live Operational Intelligence

        </p>

      </div>

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        <DashboardMetricCard
          metric={{

            label:
              "Defender Models",

            value:
              dashboard
                .defenderModels,

            status:
              "healthy"
          }}
        />

        <DashboardMetricCard
          metric={{

            label:
              "Suppliers",

            value:
              dashboard
                .suppliers,

            status:
              "healthy"
          }}
        />

        <DashboardMetricCard
          metric={{

            label:
              "Supplier Parts",

            value:
              dashboard
                .supplierParts,

            status:
              "healthy"
          }}
        />

        <DashboardMetricCard
          metric={{

            label:
              "Pricing Records",

            value:
              dashboard
                .pricingEvents,

            status:
              "healthy"
          }}
        />

      </div>

    </main>
  )
}