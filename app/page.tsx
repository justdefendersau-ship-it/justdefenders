// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\page.tsx
// Timestamp: 15 May 2026 23:20 Sydney
// ====================================================================

import Link from "next/link"

export default function LandingPage() {

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
      "
    >

      <section
        className="
          relative
          overflow-hidden
          px-8
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
          "
        >

          <div
            className="
              inline-flex
              rounded-full
              border
              border-zinc-700
              bg-zinc-900
              px-5
              py-2
              text-sm
              text-zinc-300
            "
          >

            Alpha Operational Intelligence Platform

          </div>

          <h1
            className="
              mt-8
              max-w-5xl
              text-6xl
              font-black
              leading-tight
              tracking-tight
              md:text-7xl
            "
          >

            Defender Operational Intelligence

          </h1>

          <p
            className="
              mt-8
              max-w-3xl
              text-xl
              leading-relaxed
              text-zinc-400
            "
          >

            Predictive maintenance, expedition readiness,
            supplier intelligence and operational ownership
            workflows for Defender owners, workshops and
            expedition operators.

          </p>

          <div
            className="
              mt-12
              flex
              flex-wrap
              gap-5
            "
          >

            <Link
              href="/garage"

              className="
                rounded-2xl
                bg-green-500
                px-8
                py-4
                text-lg
                font-bold
                text-black
                transition
                hover:scale-105
              "
            >

              Launch Garage Intelligence

            </Link>

            <Link
              href="/suppliers"

              className="
                rounded-2xl
                border
                border-zinc-700
                bg-zinc-900
                px-8
                py-4
                text-lg
                font-bold
                text-white
                transition
                hover:bg-zinc-800
              "
            >

              Explore Supplier Intelligence

            </Link>

          </div>

        </div>

      </section>

      <section
        className="
          border-t
          border-zinc-900
          px-8
          py-20
        "
      >

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-8
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {
            [

              {
                title:
                  "Predictive Maintenance",

                description:
                  "Operational failure prediction and preventative servicing intelligence."
              },

              {
                title:
                  "Expedition Readiness",

                description:
                  "Remote travel operational assessment and readiness scoring."
              },

              {
                title:
                  "Supplier Intelligence",

                description:
                  "AU-first operational sourcing and expedition fulfilment intelligence."
              },

              {
                title:
                  "Operational Ownership",

                description:
                  "Unified Defender operational lifecycle intelligence."
              }

            ].map(
              feature => (

                <div
                  key={
                    feature.title
                  }

                  className="
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-zinc-900
                    p-8
                  "
                >

                  <div
                    className="
                      text-2xl
                      font-bold
                    "
                  >

                    {
                      feature.title
                    }

                  </div>

                  <div
                    className="
                      mt-4
                      leading-relaxed
                      text-zinc-400
                    "
                  >

                    {
                      feature.description
                    }

                  </div>

                </div>
              )
            )
          }

        </div>

      </section>

      <section
        className="
          border-t
          border-zinc-900
          px-8
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >

          <h2
            className="
              text-5xl
              font-black
            "
          >

            Alpha Access

          </h2>

          <p
            className="
              mt-6
              text-xl
              text-zinc-400
            "
          >

            Join the operational intelligence platform
            built specifically for Defender ownership,
            workshops and expedition operations.

          </p>

          <div
            className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-5
            "
          >

            <Link
              href="/garage"

              className="
                rounded-2xl
                bg-white
                px-8
                py-4
                text-lg
                font-bold
                text-black
              "
            >

              Enter Alpha Platform

            </Link>

          </div>

        </div>

      </section>

    </main>
  )
}