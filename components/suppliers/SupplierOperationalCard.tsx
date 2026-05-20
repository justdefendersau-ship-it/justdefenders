// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\suppliers\SupplierOperationalCard.tsx
// Timestamp: 15 May 2026 22:05 Sydney
// ====================================================================

"use client"

interface Props {

  supplier: {

    id: string

    supplierName: string

    region: string

    operationalStatus: string

    reliabilityScore: number

    expeditionSupport: boolean

    activeParts: number

    averageResponseTime: string
  }
}

export default function SupplierOperationalCard({
  supplier
}: Props) {

  const borderColor = {

    healthy:
      "border-green-500",

    warning:
      "border-yellow-500",

    critical:
      "border-red-500"
  }

  return (

    <div
      className={`

        rounded-2xl
        border
        bg-zinc-900
        p-6
        shadow-xl

        ${borderColor[
          supplier.operationalStatus as
            keyof typeof borderColor
        ]}
      `}
    >

      <div
        className="
          flex
          items-start
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

            {
              supplier.supplierName
            }

          </h2>

          <div
            className="
              mt-2
              text-zinc-400
            "
          >

            {
              supplier.region
            }

          </div>

        </div>

        {
          supplier.expeditionSupport && (

            <div
              className="
                rounded-full
                bg-green-500/20
                px-4
                py-2
                text-sm
                font-semibold
                text-green-400
              "
            >

              EXPEDITION READY

            </div>
          )
        }

      </div>

      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-4
        "
      >

        <div
          className="
            rounded-xl
            bg-zinc-800
            p-4
          "
        >

          <div
            className="
              text-xs
              uppercase
              tracking-wide
              text-zinc-400
            "
          >

            Reliability

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
              supplier.reliabilityScore
            }%

          </div>

        </div>

        <div
          className="
            rounded-xl
            bg-zinc-800
            p-4
          "
        >

          <div
            className="
              text-xs
              uppercase
              tracking-wide
              text-zinc-400
            "
          >

            Active Parts

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
              supplier.activeParts
            }

          </div>

        </div>

      </div>

      <div
        className="
          mt-5
          rounded-xl
          border
          border-zinc-700
          bg-zinc-800
          p-4
        "
      >

        <div
          className="
            text-xs
            uppercase
            tracking-wide
            text-zinc-400
          "
        >

          Average Operational Response

        </div>

        <div
          className="
            mt-2
            text-xl
            font-bold
            text-green-400
          "
        >

          {
            supplier.averageResponseTime
          }

        </div>

      </div>

    </div>
  )
}