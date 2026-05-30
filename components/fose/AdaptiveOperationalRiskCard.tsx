"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fose\AdaptiveOperationalRiskCard.tsx
//
// Timestamp:
// 27 May 2026 23:10 Sydney
//
// PURPOSE:
// Adaptive operational risk intelligence.
// ====================================================================

export default function AdaptiveOperationalRiskCard(){

  const [
    risk,
    setRisk
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function loadRisk(){

    try {

      const response =
        await fetch(
          "/api/fose/adaptive-risk"
        )

      const result =
        await response.json()

      setRisk(
        result
      )

    } catch(error){

      console.error(
        "RISK LOAD FAILURE:",
        error
      )
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadRisk()

  },[])

  // ================================================================
  // LOADING
  // ================================================================

  if(!risk){

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

        Loading adaptive operational risk...

      </div>
    )
  }

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

        Adaptive Operational Risk

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >

        <div>

          <div
            className="
              text-zinc-400
              text-sm
            "
          >

            Risk Level

          </div>

          <div
            className="
              text-5xl
              font-bold
              text-red-400
            "
          >

            {risk.riskLevel || "UNKNOWN"}

          </div>

        </div>

        <div>

          <div
            className="
              text-zinc-400
              text-sm
            "
          >

            Operational Exposure

          </div>

          <div
            className="
              text-5xl
              font-bold
            "
          >

            {risk.operationalExposure || 0}%

          </div>

        </div>

      </div>

    </div>
  )
}