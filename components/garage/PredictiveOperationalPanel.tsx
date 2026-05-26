// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\PredictiveOperationalPanel.tsx
//
// Timestamp:
// 26 May 2026 20:30 Sydney
//
// PURPOSE:
// Predictive operational intelligence.
// ====================================================================

"use client"

const predictions = [

  {
    component:
      "Turbocharger",

    probability:
      82,

    timeframe:
      "6,000 km",

    severity:
      "HIGH",

    reason:
      "Historical overboost events and recurring turbo maintenance."
  },

  {
    component:
      "Cooling System",

    probability:
      67,

    timeframe:
      "12,000 km",

    severity:
      "MEDIUM",

    reason:
      "Cooling service intervals approaching survivability threshold."
  },

  {
    component:
      "Driveline",

    probability:
      41,

    timeframe:
      "18,000 km",

    severity:
      "LOW",

    reason:
      "Normal operational wear detected across historical servicing."
  }
]

export default function PredictiveOperationalPanel(){

  function getSeverityClasses(
    severity:string
  ){

    switch(severity){

      case "HIGH":

        return `
          border-red-500/30
          bg-red-500/10
        `

      case "MEDIUM":

        return `
          border-amber-500/30
          bg-amber-500/10
        `

      default:

        return `
          border-green-500/30
          bg-green-500/10
        `
    }
  }

  function getProbabilityColour(
    probability:number
  ){

    if(probability >= 75){
      return "text-red-400"
    }

    if(probability >= 50){
      return "text-amber-400"
    }

    return "text-green-400"
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

          Predictive Operational Intelligence

        </div>

        <div
          className="
            mt-2
            text-zinc-400
          "
        >

          Longitudinal survivability forecasting
          and predictive failure intelligence.

        </div>

      </div>

      {/* ============================================================
          PREDICTIONS
      ============================================================ */}

      <div
        className="
          space-y-5
        "
      >

        {
          predictions.map(
            (
              item,
              index
            ) => (

              <div
                key={index}

                className={`
                  rounded-2xl
                  border
                  p-6

                  ${
                    getSeverityClasses(
                      item.severity
                    )
                  }
                `}
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-6
                    md:flex-row
                    md:items-start
                    md:justify-between
                  "
                >

                  {/* ==================================================
                      LEFT
                  =================================================== */}

                  <div>

                    <div
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >

                      {item.component}

                    </div>

                    <div
                      className="
                        mt-4
                        max-w-3xl
                        text-zinc-300
                      "
                    >

                      {item.reason}

                    </div>

                    <div
                      className="
                        mt-4
                        text-sm
                        uppercase
                        tracking-[0.25em]
                        text-zinc-500
                      "
                    >

                      Estimated Risk Window:
                      {" "}
                      {item.timeframe}

                    </div>

                  </div>

                  {/* ==================================================
                      RIGHT
                  =================================================== */}

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

                      Failure Probability

                    </div>

                    <div
                      className={`
                        mt-3
                        text-5xl
                        font-black

                        ${
                          getProbabilityColour(
                            item.probability
                          )
                        }
                      `}
                    >

                      {item.probability}%

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