// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\ExpeditionReadinessPanel.tsx
//
// Timestamp:
// 26 May 2026 17:45 Sydney
//
// PURPOSE:
// Expedition operational readiness intelligence.
// ====================================================================

"use client"

export default function ExpeditionReadinessPanel(){

  const readiness = {

    overall: 87,

    engine: 92,

    cooling: 81,

    driveline: 76,

    fuel: 89,

    electrical: 84
  }

  function getStatusColour(
    score:number
  ){

    if(score >= 85){
      return "text-green-400"
    }

    if(score >= 70){
      return "text-amber-400"
    }

    return "text-red-400"
  }

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

          Expedition Readiness

        </div>

        <div
          className="
            mt-2
            text-zinc-400
          "
        >

          Operational survivability
          and mission confidence scoring.

        </div>

      </div>

      {/* ============================================================
          OVERALL SCORE
      ============================================================ */}

      <div
        className="
          rounded-3xl
          border
          border-green-500/30
          bg-green-500/10
          p-8
        "
      >

        <div
          className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-green-300
          "
        >

          Overall Readiness

        </div>

        <div
          className="
            mt-4
            text-6xl
            font-black
            text-white
          "
        >

          {readiness.overall}%

        </div>

      </div>

      {/* ============================================================
          CATEGORY GRID
      ============================================================ */}

      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
        "
      >

        {
          Object.entries(readiness)
            .filter(
              ([key]) =>
                key !== "overall"
            )
            .map(
              (
                [key,value]
              ) => (

                <div
                  key={key}

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
                      text-sm
                      uppercase
                      tracking-[0.2em]
                      text-zinc-500
                    "
                  >

                    {key}

                  </div>

                  <div
                    className={`
                      mt-3
                      text-4xl
                      font-black

                      ${
                        getStatusColour(
                          Number(value)
                        )
                      }
                    `}
                  >

                    {value}%

                  </div>

                </div>
              )
            )
        }

      </div>

    </div>
  )
}