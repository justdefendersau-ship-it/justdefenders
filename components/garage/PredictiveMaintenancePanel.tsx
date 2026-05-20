// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\garage\PredictiveMaintenancePanel.tsx
// Timestamp: 15 May 2026 20:35 Sydney
// ====================================================================

"use client"

interface Insight {

  id: string

  title: string

  severity: string

  category: string

  recommendation: string
}

interface Props {

  insights:
    Insight[]
}

export default function PredictiveMaintenancePanel({
  insights
}: Props) {

  const severityColor = {

    low:
      "border-blue-500",

    medium:
      "border-yellow-500",

    high:
      "border-red-500"
  }

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
          mb-6
          text-2xl
          font-bold
          text-white
        "
      >

        Predictive Maintenance Intelligence

      </div>

      <div
        className="
          space-y-5
        "
      >

        {
          insights.map(
            insight => (

              <div
                key={
                  insight.id
                }

                className={`

                  rounded-xl
                  border
                  bg-zinc-800
                  p-5

                  ${severityColor[
                    insight.severity as
                      keyof typeof severityColor
                  ]}
                `}
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      text-lg
                      font-bold
                      text-white
                    "
                  >

                    {
                      insight.title
                    }

                  </div>

                  <div
                    className="
                      text-sm
                      uppercase
                      tracking-wide
                      text-zinc-400
                    "
                  >

                    {
                      insight.severity
                    }

                  </div>

                </div>

                <div
                  className="
                    mt-2
                    text-zinc-400
                  "
                >

                  {
                    insight.category
                  }

                </div>

                <div
                  className="
                    mt-4
                    text-zinc-200
                  "
                >

                  {
                    insight.recommendation
                  }

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}