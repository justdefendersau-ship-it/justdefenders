// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\AdaptiveMaintenancePanel.tsx
//
// Timestamp:
// 26 May 2026 19:05 Sydney
//
// PURPOSE:
// Adaptive maintenance intelligence engine.
//
// FEATURES:
// - real maintenance API integration
// - overdue detection
// - survivability scoring
// - operational maintenance intelligence
// ====================================================================

"use client"

import {
  useEffect,
  useState
}
from "react"

interface MaintenanceItem {

  category:string

  intervalKm:number

  lastServiceKm:number

  currentOdometer:number

  distanceSince:number

  remaining:number

  status:string

  supplier:string

  lastServiceDate:string
}

export default function AdaptiveMaintenancePanel(){

  const [
    loading,
    setLoading
  ] = useState(true)

  const [
    maintenance,
    setMaintenance
  ] = useState<
    MaintenanceItem[]
  >([])

  // ================================================================
  // LOAD DATA
  // ================================================================

  useEffect(() => {

    async function loadMaintenance(){

      try {

        const response =
          await fetch(
            "/api/garage/adaptive-maintenance"
          )

        const data =
          await response.json()

        if(data.success){

          setMaintenance(
            data.analysis || []
          )
        }

      } catch(error){

        console.error(
          "Maintenance intelligence failure",
          error
        )

      } finally {

        setLoading(false)
      }
    }

    loadMaintenance()

  }, [])

  // ================================================================
  // STATUS STYLES
  // ================================================================

  function getStatusClasses(
    status:string
  ){

    switch(status){

      case "OVERDUE":

        return `
          border-red-500/30
          bg-red-500/10
          text-red-300
        `

      case "ATTENTION":

        return `
          border-amber-500/30
          bg-amber-500/10
          text-amber-300
        `

      default:

        return `
          border-green-500/30
          bg-green-500/10
          text-green-300
        `
    }
  }

  // ================================================================
  // LOADING
  // ================================================================

  if(loading){

    return (

      <div
        className="
          mt-10
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950/70
          p-8
          text-zinc-400
        "
      >

        Loading adaptive maintenance intelligence...

      </div>
    )
  }

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className="
        mt-10
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950/70
        p-8
      "
    >

      {/* ============================================================
          HEADER
      ============================================================ */}

      <div
        className="
          mb-8
        "
      >

        <div
          className="
            text-3xl
            font-black
            text-white
          "
        >

          Adaptive Maintenance Intelligence

        </div>

        <div
          className="
            mt-2
            text-zinc-400
          "
        >

          Real-time operational service interval analysis
          using longitudinal maintenance history.

        </div>

      </div>

      {/* ============================================================
          EMPTY STATE
      ============================================================ */}

      {
        maintenance.length === 0 && (

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-black/40
              p-6
              text-zinc-400
            "
          >

            No maintenance intelligence available.

          </div>
        )
      }

      {/* ============================================================
          ITEMS
      ============================================================ */}

      <div
        className="
          space-y-5
        "
      >

        {
          maintenance.map(
            (
              item,
              index
            ) => (

              <div
                key={index}

                className={`
                  rounded-2xl
                  border
                  p-6

                  ${
                    getStatusClasses(
                      item.status
                    )
                  }
                `}
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-6
                    md:flex-row
                    md:items-start
                    md:justify-between
                  "
                >

                  {/* ==================================================
                      LEFT
                  =================================================== */}

                  <div>

                    <div
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >

                      {item.category}

                    </div>

                    <div
                      className="
                        mt-3
                        space-y-2
                        text-sm
                        text-zinc-300
                      "
                    >

                      <div>
                        Interval:
                        {" "}
                        {item.intervalKm.toLocaleString()} km
                      </div>

                      <div>
                        Last Service:
                        {" "}
                        {item.lastServiceKm.toLocaleString()} km
                      </div>

                      <div>
                        Distance Since:
                        {" "}
                        {item.distanceSince.toLocaleString()} km
                      </div>

                      <div>
                        Remaining:
                        {" "}
                        {item.remaining.toLocaleString()} km
                      </div>

                      <div>
                        Supplier:
                        {" "}
                        {item.supplier}
                      </div>

                      <div>
                        Service Date:
                        {" "}
                        {item.lastServiceDate}
                      </div>

                    </div>

                  </div>

                  {/* ==================================================
                      RIGHT
                  =================================================== */}

                  <div
                    className="
                      text-right
                    "
                  >

                    <div
                      className="
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        text-zinc-500
                      "
                    >

                      Status

                    </div>

                    <div
                      className="
                        mt-3
                        text-3xl
                        font-black
                      "
                    >

                      {item.status}

                    </div>

                  </div>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}