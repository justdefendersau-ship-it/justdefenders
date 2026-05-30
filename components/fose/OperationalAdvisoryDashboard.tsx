"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fose\OperationalAdvisoryDashboard.tsx
//
// Timestamp:
// 27 May 2026 23:30 Sydney
//
// PURPOSE:
// Operational advisory intelligence dashboard.
// ====================================================================

export default function OperationalAdvisoryDashboard(){

  const [
    advisories,
    setAdvisories
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadAdvisories(){

    try {

      const response =
        await fetch(
          "/api/fose/advisories"
        )

      const result =
        await response.json()

      setAdvisories(
        result.advisories || []
      )

    } catch(error){

      console.error(
        "ADVISORY LOAD FAILURE:",
        error
      )
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadAdvisories()

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

        Operational Advisory Intelligence

      </div>

      {advisories.length === 0 && (

        <div
          className="
            text-zinc-400
          "
        >

          No operational advisories generated.

        </div>
      )}

      <div
        className="
          space-y-4
        "
      >

        {advisories.map(
          (
            advisory,
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
                  mb-3
                "
              >

                <div
                  className="
                    text-lg
                    font-bold
                  "
                >

                  {advisory.title}

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

                  {advisory.category}

                </div>

              </div>

              <div
                className="
                  text-zinc-300
                  text-sm
                "
              >

                {advisory.recommendation}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  )
}