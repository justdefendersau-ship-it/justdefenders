// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\garage\GarageVehicleCard.tsx
// Timestamp: 15 May 2026 20:05 Sydney
// ====================================================================

"use client"

interface Props {

  vehicle: {

    id: string

    make: string

    model: string

    year: number

    vin?: string

    operationalStatus: string

    expeditionReady: boolean

    reliabilityScore: number
  }
}

export default function GarageVehicleCard({
  vehicle
}: Props) {

  const statusBorder = {

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

        ${statusBorder[
          vehicle.operationalStatus as
            keyof typeof statusBorder
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

            {vehicle.year}{" "}
            {vehicle.make}{" "}
            {vehicle.model}

          </h2>

          <div
            className="
              mt-2
              text-sm
              text-zinc-400
            "
          >

            VIN:
            {" "}
            {vehicle.vin ?? "Unknown"}

          </div>

        </div>

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

          {
            vehicle.expeditionReady
              ? "EXPEDITION READY"
              : "SERVICE REQUIRED"
          }

        </div>

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

            Reliability Score

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
              vehicle.reliabilityScore
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

            Operational Status

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
              vehicle.operationalStatus
                .toUpperCase()
            }

          </div>

        </div>

      </div>

    </div>
  )
}