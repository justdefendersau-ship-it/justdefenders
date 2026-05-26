// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\VehicleOperationalTimeline.tsx
//
// Timestamp:
// 26 May 2026 17:20 Sydney
//
// PURPOSE:
// Operational vehicle lifecycle timeline.
//
// FEATURES:
// - maintenance chronology
// - operational events
// - severity visualization
// - lifecycle intelligence tags
//
// IMPORTANT:
// - SAFE MODE ONLY
// - NO realtime
// - NO federation runtime
// ====================================================================

"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// TYPES
// ====================================================================

interface TimelineEvent {

  id:number

  type:string

  severity:string

  date:string

  supplier:string

  description:string

  odometer:number

  cost:number

  tags:string[]
}

// ====================================================================
// COMPONENT
// ====================================================================

export default function VehicleOperationalTimeline(){

  const [
    events,
    setEvents
  ] = useState<TimelineEvent[]>([])

  const [
    loading,
    setLoading
  ] = useState(true)

  // ================================================================
  // LOAD TIMELINE
  // ================================================================

  async function loadTimeline(){

    try {

      const response =
        await fetch(
          "/api/garage/operational-timeline"
        )

      const data =
        await response.json()

      setEvents(
        data.events || []
      )

    } catch(error){

      console.error(
        "Timeline load failure",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  // ================================================================
  // INITIAL LOAD
  // ================================================================

  useEffect(() => {

    loadTimeline()

  }, [])

  // ================================================================
  // SEVERITY STYLING
  // ================================================================

  function getSeverityClasses(
    severity:string
  ){

    switch(severity){

      case "HIGH":

        return `
          border-red-500/40
          bg-red-500/10
        `

      case "MEDIUM":

        return `
          border-amber-500/40
          bg-amber-500/10
        `

      default:

        return `
          border-zinc-800
          bg-zinc-950/70
        `
    }
  }

  // ================================================================
  // TYPE BADGES
  // ================================================================

  function getTypeClasses(
    type:string
  ){

    switch(type){

      case "REPAIR":

        return `
          bg-red-500/20
          text-red-300
        `

      case "MODIFICATION":

        return `
          bg-blue-500/20
          text-blue-300
        `

      default:

        return `
          bg-green-500/20
          text-green-300
        `
    }
  }

  // ================================================================
  // UI
  // ================================================================

  return (

    <div
      className="
        space-y-6
      "
    >

      {/* ============================================================
          LOADING
      ============================================================ */}

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

            Loading operational timeline...

          </div>
        )
      }

      {/* ============================================================
          EVENTS
      ============================================================ */}

      {
        events.map(event => (

          <div
            key={event.id}

            className={`
              rounded-3xl
              border
              p-8
              transition

              ${
                getSeverityClasses(
                  event.severity
                )
              }
            `}
          >

            {/* ======================================================
                HEADER
            ====================================================== */}

            <div
              className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-start
                md:justify-between
              "
            >

              <div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >

                  <div
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.25em]

                      ${
                        getTypeClasses(
                          event.type
                        )
                      }
                    `}
                  >

                    {event.type}

                  </div>

                  <div
                    className="
                      text-sm
                      uppercase
                      tracking-[0.2em]
                      text-zinc-500
                    "
                  >

                    {event.date}

                  </div>

                </div>

                {/* ==================================================
                    DESCRIPTION
                ================================================== */}

                <div
                  className="
                    mt-5
                    text-2xl
                    font-black
                    text-white
                  "
                >

                  {event.description}

                </div>

                {/* ==================================================
                    SUPPLIER
                ================================================== */}

                <div
                  className="
                    mt-4
                    text-zinc-400
                  "
                >

                  {event.supplier}

                </div>

              </div>

              {/* ====================================================
                  ODOMETER / COST
              ==================================================== */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/40
                  p-5
                  text-right
                "
              >

                <div
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-zinc-500
                  "
                >

                  Odometer

                </div>

                <div
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    text-white
                  "
                >

                  {
                    event.odometer ||
                    "Unknown"
                  }

                  {" "}
                  km

                </div>

                <div
                  className="
                    mt-4
                    text-green-400
                    font-semibold
                  "
                >

                  $
                  {
                    event.cost || 0
                  }

                </div>

              </div>

            </div>

            {/* ======================================================
                TAGS
            ====================================================== */}

            {
              event.tags.length > 0 && (

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    gap-3
                  "
                >

                  {
                    event.tags.map(
                      (
                        tag,
                        index
                      ) => (

                        <div
                          key={index}

                          className="
                            rounded-full
                            border
                            border-zinc-700
                            bg-black/50
                            px-4
                            py-2
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-zinc-300
                          "
                        >

                          {tag}

                        </div>
                      )
                    )
                  }

                </div>
              )
            }

          </div>
        ))
      }

    </div>
  )
}