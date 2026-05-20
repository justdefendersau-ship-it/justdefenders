// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\garage\PartsIntelligencePanel.tsx
// Timestamp: 15 May 2026 21:35 Sydney
// ====================================================================

"use client"

interface Part {

  id: string

  partName: string

  category: string

  supplier: string

  estimatedPrice: number

  expeditionCritical: boolean

  compatibility: string
}

interface Props {

  parts:
    Part[]
}

export default function PartsIntelligencePanel({
  parts
}: Props) {

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

            Parts Intelligence

          </h2>

          <div
            className="
              mt-2
              text-zinc-400
            "
          >

            Operational sourcing and compatibility intelligence

          </div>

        </div>

        <button
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-2
            text-sm
            text-zinc-300
            transition
            hover:bg-zinc-700
          "
        >

          International Search

        </button>

      </div>

      <div
        className="
          space-y-5
        "
      >

        {
          parts.map(
            part => (

              <div
                key={
                  part.id
                }

                className="
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-800
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-start
                    justify-between
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
                        part.partName
                      }

                    </div>

                    <div
                      className="
                        mt-2
                        text-zinc-400
                      "
                    >

                      {
                        part.category
                      }

                    </div>

                  </div>

                  <div
                    className="
                      text-right
                    "
                  >

                    <div
                      className="
                        text-2xl
                        font-bold
                        text-green-400
                      "
                    >

                      $
                      {
                        part.estimatedPrice
                      }

                    </div>

                    <div
                      className="
                        mt-2
                        text-sm
                        text-zinc-400
                      "
                    >

                      {
                        part.supplier
                      }

                    </div>

                  </div>

                </div>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-3
                  "
                >

                  <div
                    className="
                      rounded-full
                      bg-zinc-700
                      px-4
                      py-2
                      text-sm
                      text-zinc-200
                    "
                  >

                    {
                      part.compatibility
                    }

                  </div>

                  {
                    part.expeditionCritical && (

                      <div
                        className="
                          rounded-full
                          bg-red-500/20
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-red-400
                        "
                      >

                        EXPEDITION CRITICAL

                      </div>
                    )
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