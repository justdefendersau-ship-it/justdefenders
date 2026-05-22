/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\system\SkeletonCard.tsx
 *
 * Timestamp:
 * 21 May 2026 15:44 Sydney
 *
 * PURPOSE:
 * Tactical Skeleton Loader
 *
 * STRATEGY:
 * PASS 23 — Production Readiness Layer
 *
 * ============================================================
 */

"use client"

// ============================================================
// COMPONENT
// ============================================================

export default function SkeletonCard(){

  return (

    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-[32px]
        border
        border-slate-800
        bg-[#07101F]
      "
    >

      <div
        className="
          border-b
          border-slate-900
          p-7
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-6
          "
        >

          <div
            className="
              flex
              gap-5
            "
          >

            <div
              className="
                h-20
                w-20
                rounded-2xl
                bg-slate-800
              "
            />

            <div
              className="
                space-y-3
              "
            >

              <div
                className="
                  h-4
                  w-40
                  rounded-full
                  bg-slate-800
                "
              />

              <div
                className="
                  h-8
                  w-72
                  rounded-full
                  bg-slate-800
                "
              />

              <div
                className="
                  h-4
                  w-52
                  rounded-full
                  bg-slate-800
                "
              />

            </div>

          </div>

          <div
            className="
              h-14
              w-32
              rounded-full
              bg-slate-800
            "
          />

        </div>

      </div>

      <div
        className="
          p-7
        "
      >

        <div
          className="
            space-y-4
          "
        >

          {

            Array.from({

              length: 3

            }).map((_, index) => (

              <div
                key={index}
                className="
                  h-14
                  rounded-2xl
                  bg-slate-800
                "
              />

            ))
          }

        </div>

      </div>

    </div>
  )
}