// ============================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fuel\FuelOperationsPanel.tsx
//
// Timestamp:
// 26 May 2026 14:55 Sydney
//
// PURPOSE:
// SAFE MODE operational fuel workflow.
//
// FEATURES:
// - API persistence
// - Fuel history
// - Anomaly detection
// - Operational telemetry workflow
//
// IMPORTANT:
// - NO realtime
// - NO sockets
// - NO federation
// - SAFE operational restoration
// ============================================================

"use client"

import {
  useEffect,
  useState
}
from "react"

// ============================================================
// TYPES
// ============================================================

interface FuelEntry {

  id?: string

  litres:number

  odometer:number

  price:number

  source:string

  timestamp:string
}

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
  ] = useState<FuelEntry[]>([])

  const [
    anomaly,
    setAnomaly
  ] = useState<any>(null)

  const [
    loading,
    setLoading
  ] = useState(false)

  // ============================================================
  // LOAD HISTORY
  // ============================================================

  async function loadHistory(){

    try {

      const response =
        await fetch("/api/fuel")

      const data =
        await response.json()

      setHistory(
        data.history || []
      )

    } catch(error){

      console.error(
        "Fuel history load failure",
        error
      )
    }
  }

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {

    loadHistory()

  }, [])

  // ============================================================
  // SAVE ENTRY
  // ============================================================

  async function saveFuelEvent(){

    setLoading(true)

    try {

      const response =
        await fetch(

          "/api/fuel",

          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({

              litres,
              odometer,
              price,
              source
            })
          }
        )

      const data =
        await response.json()

      if(data.success){

        setHistory(
          data.history || []
        )

        setAnomaly(
          data.anomaly || null
        )

        setLitres("")
        setOdometer("")
        setPrice("")
      }

    } catch(error){

      console.error(
        "Fuel save failure",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  // ============================================================
  // UI
  // ============================================================

  return (

    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950/70
        p-8
      "
    >

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
          Fuel Operations
        </div>

        <div
          className="
            mt-2
            text-zinc-400
          "
        >
          Operational fuel telemetry
          and expedition intelligence.
        </div>

      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        "
      >

        <input
          value={litres}
          onChange={e =>
            setLitres(
              e.target.value
            )
          }

          placeholder="Litres"

          className="
            rounded-2xl
            border
            border-zinc-700
            bg-black
            p-4
            text-white
          "
        />

        <input
          value={odometer}
          onChange={e =>
            setOdometer(
              e.target.value
            )
          }

          placeholder="Odometer"

          className="
            rounded-2xl
            border
            border-zinc-700
            bg-black
            p-4
            text-white
          "
        />

        <input
          value={price}
          onChange={e =>
            setPrice(
              e.target.value
            )
          }

          placeholder="Price Per Litre"

          className="
            rounded-2xl
            border
            border-zinc-700
            bg-black
            p-4
            text-white
          "
        />

        <select
          value={source}

          onChange={e =>
            setSource(
              e.target.value
            )
          }

          className="
            rounded-2xl
            border
            border-zinc-700
            bg-black
            p-4
            text-white
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
          SAVE
      ===================================================== */}

      <button
        onClick={saveFuelEvent}

        disabled={loading}

        className="
          mt-6
          w-full
          rounded-2xl
          bg-green-600
          p-4
          font-semibold
          text-white
          transition
          hover:bg-green-500
          disabled:opacity-50
        "
      >

        {
          loading
            ? "Saving..."
            : "Save Fuel Event"
        }

      </button>

      {/* =====================================================
          ANOMALY
      ===================================================== */}

      {
        anomaly && (

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-amber-500/30
              bg-amber-500/10
              p-6
            "
          >

            <div
              className="
                text-lg
                font-bold
                text-amber-300
              "
            >

              {
                anomaly.message
              }

            </div>

            <div
              className="
                mt-2
                text-sm
                text-zinc-300
              "
            >

              Efficiency:
              {" "}
              {
                anomaly.value
              }
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
          mt-10
        "
      >

        <div
          className="
            mb-4
            text-2xl
            font-bold
            text-white
          "
        >
          Fuel History
        </div>

        <div
          className="
            space-y-4
          "
        >

          {
            history.map(

              item => (

                <div
                  key={
                    item.id ||
                    item.timestamp
                  }

                  className="
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-black
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      md:flex-row
                      md:items-center
                      md:justify-between
                    "
                  >

                    <div>

                      <div
                        className="
                          text-lg
                          font-bold
                          text-white
                        "
                      >

                        {
                          item.litres
                        }
                        {" "}
                        litres

                      </div>

                      <div
                        className="
                          mt-1
                          text-zinc-400
                        "
                      >

                        Odometer:
                        {" "}
                        {
                          item.odometer
                        }
                        {" "}
                        km

                      </div>

                    </div>

                    <div
                      className="
                        text-right
                      "
                    >

                      <div
                        className="
                          text-sm
                          uppercase
                          tracking-[0.2em]
                          text-zinc-500
                        "
                      >

                        {
                          item.source
                        }

                      </div>

                      <div
                        className="
                          mt-2
                          text-green-400
                          font-semibold
                        "
                      >

                        $
                        {
                          item.price
                        }
                        /L

                      </div>

                    </div>

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