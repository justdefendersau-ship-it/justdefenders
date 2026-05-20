/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalSupplierSkeleton.tsx
 *
 * Timestamp:
 * 17 May 2026 11:25 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Intelligence Skeleton
 * ============================================================
 */

"use client"

import TacticalCard
from "./TacticalCard"

import TacticalSkeleton
from "./TacticalSkeleton"

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalSupplierSkeleton() {

  return (

    <TacticalCard>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >

        <div className="space-y-3">

          <TacticalSkeleton
            className="
              h-6
              w-[240px]
            "
          />

          <TacticalSkeleton
            className="
              h-4
              w-[180px]
            "
          />

        </div>

        <TacticalSkeleton
          className="
            h-[88px]
            w-[140px]
          "
        />

      </div>

      {/* ================================================= */}
      {/* METRICS */}
      {/* ================================================= */}

      <div
        className="
          mt-7
          grid
          grid-cols-1
          gap-4
          md:grid-cols-3
        "
      >

        {[1,2,3].map((idx)=>(

          <div
            key={idx}
            className="
              rounded-2xl
              border
              p-4
              border-white/5
              bg-white/[0.03]
            "
          >

            <TacticalSkeleton
              className="
                h-4
                w-[120px]
              "
            />

            <TacticalSkeleton
              className="
                mt-4
                h-6
                w-[80px]
              "
            />

            <TacticalSkeleton
              className="
                mt-4
                h-2
                w-full
              "
            />

          </div>
        ))}

      </div>

      {/* ================================================= */}
      {/* RECOMMENDATION */}
      {/* ================================================= */}

      <div
        className="
          mt-7
          rounded-2xl
          border
          border-white/5
          bg-white/[0.03]
          p-5
        "
      >

        <TacticalSkeleton
          className="
            h-5
            w-[220px]
          "
        />

        <TacticalSkeleton
          className="
            mt-4
            h-4
            w-full
          "
        />

        <TacticalSkeleton
          className="
            mt-2
            h-4
            w-[92%]
          "
        />

      </div>

      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div
        className="
          mt-7
          flex
          gap-3
        "
      >

        <TacticalSkeleton
          className="
            h-12
            w-[160px]
          "
        />

        <TacticalSkeleton
          className="
            h-12
            w-[180px]
          "
        />

      </div>

    </TacticalCard>
  )
}