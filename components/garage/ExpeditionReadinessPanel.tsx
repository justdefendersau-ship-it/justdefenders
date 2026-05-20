// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\garage\ExpeditionReadinessPanel.tsx
// Timestamp: 15 May 2026 21:05 Sydney
// ====================================================================

"use client"

interface Props {

  readiness: {

    overallScore: number

    drivetrainReadiness: number

    fuelSystemReadiness: number

    electricalReadiness: number

    coolingSystemReadiness: number

    recoveryReadiness: number

    operationalRisk: string

    recommendations: string[]
  }
}

export default function ExpeditionReadinessPanel({
  readiness
}: Props) {

  const riskColor = {

    low:
      "text-green-400",

    medium:
      "text-yellow-400",

    high:
      "text-red-400"
  }

  const readinessItems = [

    {
      label:
        "Drivetrain",

      value:
        readiness.drivetrainReadiness
    },

    {
      label:
        "Fuel System",

      value:
        readiness.fuelSystemReadiness
    },

    {
      label:
        "Electrical",

      value:
        readiness.electricalReadiness
    },

    {
      label:
        "Cooling System",

      value:
        readiness.coolingSystemReadiness
    },

    {
      label:
        "Recovery",

      value:
        readiness.recoveryReadiness
    }
  ]

  return (

    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >

            Expedition Readiness

          </h2>

          <div
            className="
              mt-2
              text-zinc-400
            "
          >

            Operational remote-travel assessment

          </div>

        </div>

        <div
          className="
            text-right
          "
        >

          <div
            className="
              text-5xl
              font-bold
              text-green-400
            "
          >

            {
              readiness.overallScore
            }%

          </div>

          <div
            className={`
              mt-2
              text-sm
              font-semibold
              uppercase

              ${riskColor[
                readiness.operationalRisk as
                  keyof typeof riskColor
              ]}
            `}
          >

            {
              readiness.operationalRisk
            } risk

          </div>

        </div>

      </div>

      <div
        className="
          mt-8
          grid
          gap-4
          md:grid-cols-2
        "
      >

        {
          readinessItems.map(
            item => (

              <div
                key={
                  item.label
                }

                className="
                  rounded-xl
                  bg-zinc-800
                  p-4
                "
              >

                <div
                  className="
                    text-sm
                    uppercase
                    tracking-wide
                    text-zinc-400
                  "
                >

                  {
                    item.label
                  }

                </div>

                <div
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    text-white
                  "
                >

                  {
                    item.value
                  }%

                </div>

              </div>
            )
          )
        }

      </div>

      <div
        className="
          mt-8
        "
      >

        <div
          className="
            mb-4
            text-lg
            font-bold
            text-white
          "
        >

          Operational Recommendations

        </div>

        <div
          className="
            space-y-3
          "
        >

          {
            readiness
              .recommendations
              .map(
                recommendation => (

                  <div
                    key={
                      recommendation
                    }

                    className="
                      rounded-xl
                      border
                      border-zinc-700
                      bg-zinc-800
                      p-4
                      text-zinc-200
                    "
                  >

                    {
                      recommendation
                    }

                  </div>
                )
              )
          }

        </div>

      </div>

    </div>
  )
}