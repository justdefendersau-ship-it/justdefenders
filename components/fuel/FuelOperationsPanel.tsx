// ============================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fuel\FuelOperationsPanel.tsx
//
// Timestamp:
// 26 May 2026 11:45 Sydney
// ============================================================
//
// PURPOSE:
// Safe operational fuel workflow restoration.
//
// FEATURES:
// - Fuel entry
// - Odometer capture
// - Fuel source selection
// - Efficiency tracking
// - Local operational history
//
// IMPORTANT:
// - NO realtime
// - NO sockets
// - NO federation
// - NO orchestration
// - SAFE STABILIZED RESTORATION
// ============================================================

"use client"

import {
  useState
}
from "react"

// ============================================================
// COMPONENT
// ============================================================

export default function FuelOperationsPanel(){

  const [
    litres,
    setLitres
  ] = useState("")

  const [
    odometer,
    setOdometer
  ] = useState("")

  const [
    price,
    setPrice
  ] = useState("")

  const [
    source,
    setSource
  ] = useState("fuel_station")

  const [
    history,
    setHistory
  ] = useState<any[]>([])

  const [
    anomaly,
    setAnomaly
  ] = useState<any>(null)

  // ============================================================
  // SAVE ENTRY
  // ============================================================

  function saveFuelEvent(){

    const litresValue =
      parseFloat(litres)

    const odometerValue =
      parseFloat(odometer)

    const priceValue =
      parseFloat(price)

    if(
      !litresValue ||
      !odometerValue
    ){
      return
    }

    const entry = {

      litres: litresValue,

      odometer: odometerValue,

      price: priceValue,

      source,

      timestamp:
        new Date().toISOString()
    }

    const updated =
      [entry, ...history]

    setHistory(updated)

    // ==========================================================
    // SIMPLE ANOMALY DETECTION
    // ==========================================================

    if(updated.length >= 2){

      const current =
        updated[0]

      const previous =
        updated[1]

      const kmDiff =
        current.odometer -
        previous.odometer

      if(
        kmDiff > 0 &&
        current.litres > 0
      ){

        const kmPerLitre =
          kmDiff / current.litres

        if(kmPerLitre < 5){

          setAnomaly({

            level: "warn",

            message:
              "Fuel efficiency anomaly detected",

            value:
              kmPerLitre.toFixed(2)
          })

        } else {

          setAnomaly(null)
        }
      }
    }

    // ==========================================================
    // RESET FORM
    // ==========================================================

    setLitres("")
    setOdometer("")
    setPrice("")
  }

  // ============================================================
  // UI
  // ============================================================

  return (

    <div
      className="
        bg-zinc-900
        rounded-2xl
        p-6
        border
        border-zinc-800
      "
    >

      <div
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Fuel Operations
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >

        <input
          value={litres}
          onChange={e =>
            setLitres(e.target.value)
          }
          placeholder="Litres"
          className="
            bg-black
            border
            border-zinc-700
            rounded-xl
            p-3
          "
        />

        <input
          value={odometer}
          onChange={e =>
            setOdometer(e.target.value)
          }
          placeholder="Odometer"
          className="
            bg-black
            border
            border-zinc-700
            rounded-xl
            p-3
          "
        />

        <input
          value={price}
          onChange={e =>
            setPrice(e.target.value)
          }
          placeholder="Price Per Litre"
          className="
            bg-black
            border
            border-zinc-700
            rounded-xl
            p-3
          "
        />

        <select
          value={source}
          onChange={e =>
            setSource(e.target.value)
          }
          className="
            bg-black
            border
            border-zinc-700
            rounded-xl
            p-3
          "
        >

          <option value="fuel_station">
            Fuel Station
          </option>

          <option value="jerry_can">
            Jerry Can
          </option>

          <option value="portable_tank">
            Portable Tank
          </option>

          <option value="aux_tank">
            Auxiliary Tank
          </option>

        </select>

      </div>

      {/* =====================================================
          SAVE BUTTON
      ===================================================== */}

      <button
        onClick={saveFuelEvent}
        className="
          mt-6
          w-full
          bg-blue-700
          hover:bg-blue-600
          rounded-xl
          p-4
          font-semibold
        "
      >
        Save Fuel Event
      </button>

      {/* =====================================================
          ANOMALY
      ===================================================== */}

      {

        anomaly && (

          <div
            className="
              mt-6
              bg-amber-900/40
              border
              border-amber-700
              rounded-xl
              p-4
            "
          >

            <div
              className="
                font-semibold
              "
            >
              {anomaly.message}
            </div>

            <div
              className="
                text-sm
                text-zinc-300
                mt-2
              "
            >
              Efficiency:
              {" "}
              {anomaly.value}
              {" "}
              km/L
            </div>

          </div>
        )
      }

      {/* =====================================================
          HISTORY
      ===================================================== */}

      <div
        className="
          mt-8
        "
      >

        <div
          className="
            text-xl
            font-semibold
            mb-4
          "
        >
          Fuel History
        </div>

        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          {

            history.map(

              (item, index) => (

                <div
                  key={index}
                  className="
                    bg-black
                    border
                    border-zinc-800
                    rounded-xl
                    p-4
                  "
                >

                  <div>
                    Litres:
                    {" "}
                    {item.litres}
                  </div>

                  <div>
                    Odometer:
                    {" "}
                    {item.odometer}
                  </div>

                  <div>
                    Source:
                    {" "}
                    {item.source}
                  </div>

                  <div>
                    Price:
                    {" "}
                    ${item.price}
                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  )
}