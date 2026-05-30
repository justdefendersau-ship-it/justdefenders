"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fose\OperationalAnomalyDashboard.tsx
//
// Timestamp:
// 27 May 2026 19:10 Sydney
//
// PURPOSE:
// Operational anomaly intelligence dashboard.
// ====================================================================

export default function OperationalAnomalyDashboard(){

  const [
    anomalies,
    setAnomalies
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadAnomalies(){

    try {

      const response =
        await fetch(

          "/api/fose/anomalies"
        )

      const result =
        await response.json()

      setAnomalies(
        result.anomalies || []
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

    loadAnomalies()

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

        Operational Anomaly Intelligence

      </div>

      {/* ============================================================
          EMPTY
      ============================================================ */}

      {anomalies.length === 0 && (

        <div
          className="
            text-zinc-400
          "
        >

          No operational anomalies detected.

        </div>
      )}

      {/* ============================================================
          LIST
      ============================================================ */}

      <div
        className="
          space-y-4
        "
      >

        {anomalies.map(
          (
            anomaly,
            index
          ) => (

            <div

              key={index}

              className="
                border
                border-red-500
                rounded-xl
                p-4
                bg-black
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-3
                "
              >

                <div
                  className="
                    text-lg
                    font-bold
                    text-red-400
                  "
                >

                  {anomaly.title}

                </div>

                <div
                  className="
                    text-xs
                    bg-zinc-800
                    px-3
                    py-1
                    rounded-full
                  "
                >

                  {anomaly.category}

                </div>

              </div>

              <div
                className="
                  text-zinc-300
                  text-sm
                  mb-3
                "
              >

                {anomaly.description}

              </div>

              <div
                className="
                  text-xs
                  text-zinc-500
                "
              >

                {new Date(
                  anomaly.timestamp
                ).toLocaleString()}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  )
}