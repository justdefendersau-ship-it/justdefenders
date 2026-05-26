// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\garage\notifications\page.tsx
//
// Timestamp:
// 26 May 2026 13:55 Sydney
//
// PURPOSE:
// Operational garage notifications centre.
// Stabilized SAFE MODE implementation.
// ====================================================================

"use client"

import {
  useEffect,
  useState
}
from "react"

import CanonicalDashboardShell
from "@/components/layout/CanonicalDashboardShell"

interface AlertItem {

  id: string

  message: string

  priority: string

  created_at: string

  triggered?: boolean
}

export default function NotificationsPage() {

  const [
    alerts,
    setAlerts
  ] = useState<AlertItem[]>([])

  const [
    loading,
    setLoading
  ] = useState(true)

  const [
    filter,
    setFilter
  ] = useState("ALL")

  // =====================================================
  // LOAD ALERTS
  // =====================================================

  async function loadAlerts() {

    try {

      const response =
        await fetch(
          "/api/garage/alerts"
        )

      const data =
        await response.json()

      setAlerts(
        data.alerts || []
      )

    } catch (error) {

      console.error(
        "Alert load failure",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  // =====================================================
  // MARK AS COMPLETE
  // =====================================================

  async function markRead(
    id: string
  ) {

    try {

      await fetch(
        "/api/garage/alerts",
        {

          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({

            id
          })
        }
      )

      loadAlerts()

    } catch (error) {

      console.error(
        "Alert update failure",
        error
      )
    }
  }

  useEffect(() => {

    loadAlerts()

  }, [])

  // =====================================================
  // FILTERS
  // =====================================================

  const filtered =
    alerts.filter(alert => {

      if(filter === "ALL"){
        return true
      }

      return (
        alert.priority?.toUpperCase()
        === filter
      )
    })

  // =====================================================
  // PRIORITY COLOUR
  // =====================================================

  function getPriorityClasses(
    priority:string
  ){

    switch(priority?.toLowerCase()){

      case "high":

        return `
          border-red-500/40
          bg-red-500/10
          text-red-300
        `

      case "medium":

        return `
          border-amber-500/40
          bg-amber-500/10
          text-amber-300
        `

      default:

        return `
          border-blue-500/40
          bg-blue-500/10
          text-blue-300
        `
    }
  }

  return (

    <CanonicalDashboardShell

      title="
        Garage Notifications
      "

      subtitle="
        Operational maintenance alerts,
        expedition readiness warnings,
        and predictive intelligence events.
      "
    >

      {/* ================================================= */}
      {/* FILTER BAR */}
      {/* ================================================= */}

      <div
        className="
          mb-8
          flex
          flex-wrap
          gap-3
        "
      >

        {
          [
            "ALL",
            "HIGH",
            "MEDIUM",
            "LOW"
          ].map(level => (

            <button
              key={level}

              onClick={() =>
                setFilter(level)
              }

              className={`
                rounded-full
                border
                px-5
                py-2
                text-sm
                font-semibold
                transition

                ${
                  filter === level
                    ? `
                      border-green-500
                      bg-green-500/20
                      text-green-300
                    `
                    : `
                      border-zinc-700
                      bg-zinc-900
                      text-zinc-400
                      hover:border-zinc-500
                      hover:text-white
                    `
                }
              `}
            >

              {level}

            </button>
          ))
        }

      </div>

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {
        loading && (

          <div
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-950/70
              p-8
              text-zinc-400
            "
          >

            Loading notifications...

          </div>
        )
      }

      {/* ================================================= */}
      {/* EMPTY STATE */}
      {/* ================================================= */}

      {
        !loading &&
        filtered.length === 0 && (

          <div
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-950/70
              p-12
              text-center
            "
          >

            <div
              className="
                text-2xl
                font-bold
                text-white
              "
            >

              No active alerts

            </div>

            <div
              className="
                mt-3
                text-zinc-500
              "
            >

              Operational systems currently stable.

            </div>

          </div>
        )
      }

      {/* ================================================= */}
      {/* ALERT LIST */}
      {/* ================================================= */}

      <div
        className="
          space-y-6
        "
      >

        {
          filtered.map(alert => (

            <div
              key={alert.id}

              className={`
                rounded-3xl
                border
                p-8
                transition

                ${
                  getPriorityClasses(
                    alert.priority
                  )
                }

                ${
                  alert.triggered
                    ? "opacity-40"
                    : ""
                }
              `}
            >

              <div
                className="
                  flex
                  flex-col
                  gap-6
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div>

                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-[0.3em]
                    "
                  >

                    {
                      alert.priority || "INFO"
                    }

                  </div>

                  <div
                    className="
                      mt-4
                      text-2xl
                      font-black
                    "
                  >

                    {
                      alert.message
                    }

                  </div>

                  <div
                    className="
                      mt-4
                      text-sm
                      text-zinc-400
                    "
                  >

                    {
                      new Date(
                        alert.created_at
                      ).toLocaleString()
                    }

                  </div>

                </div>

                {
                  !alert.triggered && (

                    <button
                      onClick={() =>
                        markRead(
                          alert.id
                        )
                      }

                      className="
                        rounded-2xl
                        border
                        border-green-500/40
                        bg-green-500/10
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-green-300
                        transition
                        hover:bg-green-500/20
                      "
                    >

                      Mark Complete

                    </button>
                  )
                }

              </div>

            </div>
          ))
        }

      </div>

    </CanonicalDashboardShell>
  )
}