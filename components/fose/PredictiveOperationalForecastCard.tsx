"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fose\PredictiveOperationalForecastCard.tsx
//
// Timestamp:
// 27 May 2026 16:20 Sydney
//
// PURPOSE:
// Predictive operational forecast dashboard.
// ====================================================================

export default function PredictiveOperationalForecastCard(){

  const [
    forecast,
    setForecast
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function loadForecast(){

    try {

      const response =
        await fetch(

          "/api/fose/forecast"
        )

      const result =
        await response.json()

      setForecast(
        result.forecast
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

    loadForecast()

  },[])

  // ================================================================
  // LOADING
  // ================================================================

  if(!forecast){

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

        Loading predictive operational intelligence...

      </div>
    )
  }

  // ================================================================
  // STATUS COLOUR
  // ================================================================

  function getStatusColour(){

    switch(
      forecast.projectedOperationalStatus
    ){

      case "GREEN":
        return "text-green-400"

      case "AMBER":
        return "text-yellow-400"

      case "RED":
        return "text-red-400"

      default:
        return "text-white"
    }
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

        Predictive Operational Forecast

      </div>

      {/* ============================================================
          GRID
      ============================================================ */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
        "
      >

        <div>

          <div
            className="
              text-zinc-500
              text-sm
            "
          >

            Projected Operational

          </div>

          <div
            className="
              text-4xl
              font-bold
              mt-2
            "
          >

            {
              forecast.projectedOperationalReadiness
            }%

          </div>

        </div>

        <div>

          <div
            className="
              text-zinc-500
              text-sm
            "
          >

            Expedition Forecast

          </div>

          <div
            className="
              text-4xl
              font-bold
              mt-2
            "
          >

            {
              forecast.projectedExpeditionReadiness
            }%

          </div>

        </div>

        <div>

          <div
            className="
              text-zinc-500
              text-sm
            "
          >

            Survivability Forecast

          </div>

          <div
            className="
              text-4xl
              font-bold
              mt-2
            "
          >

            {
              forecast.projectedSurvivabilityScore
            }%

          </div>

        </div>

        <div>

          <div
            className="
              text-zinc-500
              text-sm
            "
          >

            Forecast Status

          </div>

          <div
            className={`
              text-4xl
              font-bold
              mt-2
              ${getStatusColour()}
            `}
          >

            {
              forecast.projectedOperationalStatus
            }

          </div>

        </div>

      </div>

      {/* ============================================================
          DETAIL
      ============================================================ */}

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-4
          text-sm
        "
      >

        <div>

          Forecast Risk:
          {" "}
          {forecast.forecastRisk}

        </div>

        <div>

          Degradation Rate:
          {" "}
          {forecast.degradationRate}

        </div>

      </div>

    </div>
  )
}