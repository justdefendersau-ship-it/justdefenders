// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\OperationalExpiryPanel.tsx
//
// Timestamp:
// 26 May 2026 20:00 Sydney
//
// PURPOSE:
// Operational expiry intelligence.
// ====================================================================

"use client"

const expiryItems = [

  {
    category:
      "Registration",

    expiry:
      "2026-11-14",

    status:
      "CURRENT"
  },

  {
    category:
      "Insurance",

    expiry:
      "2026-08-01",

    status:
      "ATTENTION"
  },

  {
    category:
      "Roadside Assistance",

    expiry:
      "2026-07-02",

    status:
      "ATTENTION"
  },

  {
    category:
      "Battery Warranty",

    expiry:
      "2026-06-01",

    status:
      "EXPIRING"
  }
]

export default function OperationalExpiryPanel(){

  function getStatusClasses(
    status:string
  ){

    switch(status){

      case "EXPIRING":

        return `
          border-red-500/30
          bg-red-500/10
          text-red-300
        `

      case "ATTENTION":

        return `
          border-amber-500/30
          bg-amber-500/10
          text-amber-300
        `

      default:

        return `
          border-green-500/30
          bg-green-500/10
          text-green-300
        `
    }
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

          Operational Expiry Intelligence

        </div>

        <div
          className="
            mt-2
            text-zinc-400
          "
        >

          Operational certification
          and survivability compliance tracking.

        </div>

      </div>

      {/* ============================================================
          ITEMS
      ============================================================ */}

      <div
        className="
          space-y-5
        "
      >

        {
          expiryItems.map(
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
                    getStatusClasses(
                      item.status
                    )
                  }
                `}
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

                      Expiry Date:
                      {" "}
                      {item.expiry}

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

                      Status

                    </div>

                    <div
                      className="
                        mt-2
                        text-3xl
                        font-black
                      "
                    >

                      {item.status}

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