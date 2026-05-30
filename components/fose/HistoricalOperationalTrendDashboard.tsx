"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fose\HistoricalOperationalTrendDashboard.tsx
//
// Timestamp:
// 27 May 2026 22:15 Sydney
//
// PURPOSE:
// Historical operational trend dashboard.
// ====================================================================

export default function HistoricalOperationalTrendDashboard(){

  const [
    history,
    setHistory
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadHistory(){

    try {

      const response =
        await fetch(

          "/api/fose/replay"
        )

      const result =
        await response.json()

      setHistory(
        result.timeline || []
      )

    } catch(error){

      console.error(
        error
      )
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadHistory()

  },[])

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
    >

      <div
        className="
          text-2xl
          font-bold
          mb-8
        "
      >

        Historical Operational Trends

      </div>

      {history.length === 0 && (

        <div
          className="
            text-zinc-400
          "
        >

          No operational history available.

        </div>
      )}

      <div
        className="
          space-y-4
        "
      >

        {history.map(
          (
            event,
            index
          ) => (

            <div

              key={index}

              className="
                border
                border-zinc-800
                rounded-xl
                p-4
                bg-black
              "
            >

              <div
                className="
                  flex
                  justify-between
                  mb-2
                "
              >

                <div
                  className="
                    font-bold
                  "
                >

                  {event.operationalStatus}

                </div>

                <div
                  className="
                    text-xs
                    text-zinc-500
                  "
                >

                  {new Date(
                    event.timestamp
                  ).toLocaleString()}

                </div>

              </div>

              <div
                className="
                  text-sm
                  text-zinc-300
                "
              >

                Operational Readiness:
                {" "}
                {event.operationalReadiness}%

              </div>

              <div
                className="
                  text-sm
                  text-zinc-300
                "
              >

                Survivability Score:
                {" "}
                {event.survivabilityScore}%

              </div>

            </div>
          )
        )}

      </div>

    </div>
  )
}