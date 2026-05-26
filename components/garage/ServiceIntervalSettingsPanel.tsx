// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\ServiceIntervalSettingsPanel.tsx
//
// Timestamp:
// 26 May 2026 19:30 Sydney
//
// PURPOSE:
// Configurable operational maintenance doctrine.
// ====================================================================

"use client"

import {
  useState
}
from "react"

export default function ServiceIntervalSettingsPanel(){

  const [
    expeditionMode,
    setExpeditionMode
  ] = useState(true)

  const [
    harshConditions,
    setHarshConditions
  ] = useState(true)

  const [
    towingProfile,
    setTowingProfile
  ] = useState(false)

  const [
    waterCrossings,
    setWaterCrossings
  ] = useState(true)

  const baseIntervals = [

    {
      category:
        "Engine Oil",

      standard:
        10000,

      adjusted:
        expeditionMode
          ? 7000
          : 10000
    },

    {
      category:
        "Cooling System",

      standard:
        20000,

      adjusted:
        harshConditions
          ? 12000
          : 20000
    },

    {
      category:
        "Turbocharger Inspection",

      standard:
        15000,

      adjusted:
        towingProfile
          ? 8000
          : 15000
    },

    {
      category:
        "Driveline Inspection",

      standard:
        25000,

      adjusted:
        waterCrossings
          ? 12000
          : 25000
    }
  ]

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

          Service Interval Doctrine

        </div>

        <div
          className="
            mt-2
            text-zinc-400
          "
        >

          Adaptive expedition maintenance
          profile configuration.

        </div>

      </div>

      {/* ============================================================
          OPERATIONAL PROFILES
      ============================================================ */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        "
      >

        <button
          onClick={() =>
            setExpeditionMode(
              !expeditionMode
            )
          }

          className={`
            rounded-2xl
            border
            p-5
            text-left

            ${
              expeditionMode
                ? "border-green-500 bg-green-500/10"
                : "border-zinc-800 bg-black/30"
            }
          `}
        >

          <div
            className="
              text-lg
              font-bold
              text-white
            "
          >

            Expedition Mode

          </div>

          <div
            className="
              mt-2
              text-sm
              text-zinc-400
            "
          >

            Reduce intervals for remote touring.

          </div>

        </button>

        <button
          onClick={() =>
            setHarshConditions(
              !harshConditions
            )
          }

          className={`
            rounded-2xl
            border
            p-5
            text-left

            ${
              harshConditions
                ? "border-amber-500 bg-amber-500/10"
                : "border-zinc-800 bg-black/30"
            }
          `}
        >

          <div
            className="
              text-lg
              font-bold
              text-white
            "
          >

            Harsh Conditions

          </div>

          <div
            className="
              mt-2
              text-sm
              text-zinc-400
            "
          >

            Dust, heat, and severe operating environments.

          </div>

        </button>

        <button
          onClick={() =>
            setTowingProfile(
              !towingProfile
            )
          }

          className={`
            rounded-2xl
            border
            p-5
            text-left

            ${
              towingProfile
                ? "border-red-500 bg-red-500/10"
                : "border-zinc-800 bg-black/30"
            }
          `}
        >

          <div
            className="
              text-lg
              font-bold
              text-white
            "
          >

            Heavy Towing

          </div>

          <div
            className="
              mt-2
              text-sm
              text-zinc-400
            "
          >

            Increased driveline and turbo stress profile.

          </div>

        </button>

        <button
          onClick={() =>
            setWaterCrossings(
              !waterCrossings
            )
          }

          className={`
            rounded-2xl
            border
            p-5
            text-left

            ${
              waterCrossings
                ? "border-cyan-500 bg-cyan-500/10"
                : "border-zinc-800 bg-black/30"
            }
          `}
        >

          <div
            className="
              text-lg
              font-bold
              text-white
            "
          >

            Water Crossings

          </div>

          <div
            className="
              mt-2
              text-sm
              text-zinc-400
            "
          >

            Adaptive driveline and bearing service intervals.

          </div>

        </button>

      </div>

      {/* ============================================================
          INTERVAL OUTPUT
      ============================================================ */}

      <div
        className="
          mt-10
          space-y-5
        "
      >

        {
          baseIntervals.map(
            (
              item,
              index
            ) => (

              <div
                key={index}

                className="
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-black/40
                  p-6
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >

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
                        mt-2
                        text-zinc-400
                      "
                    >

                      Standard:
                      {" "}
                      {item.standard.toLocaleString()}
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
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        text-zinc-500
                      "
                    >

                      Adaptive Interval

                    </div>

                    <div
                      className="
                        mt-2
                        text-3xl
                        font-black
                        text-green-400
                      "
                    >

                      {item.adjusted.toLocaleString()} km

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