/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\SupplierDetailWorkspace.tsx
 *
 * Timestamp:
 * 21 May 2026 09:02 Sydney
 *
 * PURPOSE:
 * Supplier Detail Operational Workspace
 *
 * STRATEGY:
 * PASS 15B — Procurement Intelligence Panels
 *
 * ============================================================
 */

"use client"

import { useState } from "react"

import Link from "next/link"

import Image from "next/image"

import {
  ArrowLeft,
  MapPin,
  Shield,
  Truck,
  Clock3,
  PackageCheck,
  AlertTriangle,
  CheckCircle2
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================

interface SupplierPart {
  brand: string
  sku: string
  oem: number
  status: string
}

interface Supplier {
  slug: string
  name: string
  fitment: number
  confidence: string
  region: string
  dispatch: string
  tier: string
  logo: string
  parts: SupplierPart[]
}

interface Props {
  supplier: Supplier
}

// ============================================================
// COMPONENT
// ============================================================

export default function SupplierDetailWorkspace({
  supplier
}: Props) {

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    activePanel,
    setActivePanel
  ] = useState<
    "overview"
    |
    "fitment"
  >(
    "overview"
  )

  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div
      className="
        mx-auto
        max-w-[1800px]
        px-6
        py-6
      "
    >

      {/* ================================================== */}
      {/* BACK */}
      {/* ================================================== */}

      <Link
        href="/parts"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-[#60A5FA]
        "
      >

        <ArrowLeft
          className="
            h-4
            w-4
          "
        />

        Back to Results

      </Link>

      {/* ================================================== */}
      {/* GRID */}
      {/* ================================================== */}

      <div
        className="
          mt-6
          grid
          gap-6
          xl:grid-cols-[minmax(0,1fr)_380px]
        "
      >

        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <div
          className="
            min-w-0
            space-y-6
          "
        >

          {/* ============================================= */}
          {/* HEADER */}
          {/* ============================================= */}

          <div
            className="
              rounded-3xl
              border
              border-slate-800
              bg-[#081122]
              p-6
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

              {/* LEFT */}

              <div
                className="
                  flex
                  items-start
                  gap-5
                "
              >

                {/* LOGO */}

                <div
                  className="
                    relative
                    h-20
                    w-20
                    overflow-hidden
                    rounded-2xl
                    bg-white
                  "
                >

                  <Image
                    src={supplier.logo}
                    alt={supplier.name}
                    fill
                    className="
                      object-contain
                      p-2
                    "
                  />

                </div>

                {/* META */}

                <div>

                  <h1
                    className="
                      text-4xl
                      font-black
                      text-white
                    "
                  >
                    {supplier.name}
                  </h1>

                  <p
                    className="
                      mt-2
                      text-slate-400
                    "
                  >
                    Procurement Intelligence
                  </p>

                  {/* TAGS */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        rounded-full
                        bg-[#123B2A]
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-[#4ADE80]
                      "
                    >
                      {supplier.fitment}% Fitment
                    </div>

                    <div
                      className="
                        rounded-full
                        border
                        border-slate-700
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-slate-200
                      "
                    >
                      {supplier.confidence}
                    </div>

                  </div>

                  {/* META */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      items-center
                      gap-5
                      text-sm
                      text-slate-400
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Truck
                        className="
                          h-4
                          w-4
                        "
                      />

                      {supplier.dispatch}

                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <MapPin
                        className="
                          h-4
                          w-4
                        "
                      />

                      {supplier.region}

                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Shield
                        className="
                          h-4
                          w-4
                        "
                      />

                      {supplier.tier}

                    </div>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div
                className="
                  text-right
                "
              >

                <div
                  className="
                    text-5xl
                    font-black
                    text-[#60A5FA]
                  "
                >
                  94%
                </div>

                <div
                  className="
                    mt-2
                    text-sm
                    text-slate-400
                  "
                >
                  Procurement Confidence
                </div>

              </div>

            </div>

          </div>

          {/* ============================================= */}
          {/* PROCUREMENT INTELLIGENCE */}
          {/* ============================================= */}

          <div
            className="
              grid
              gap-6
              lg:grid-cols-3
            "
          >

            {/* PRICE */}

            <div
              className="
                rounded-3xl
                border
                border-slate-800
                bg-[#081122]
                p-6
              "
            >

              <div
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                "
              >
                Pricing Intelligence
              </div>

              <div
                className="
                  mt-5
                  text-4xl
                  font-black
                  text-white
                "
              >
                $28.95
              </div>

              <div
                className="
                  mt-2
                  text-sm
                  text-[#4ADE80]
                "
              >
                Club Price: $24.95
              </div>

            </div>

            {/* DELIVERY */}

            <div
              className="
                rounded-3xl
                border
                border-slate-800
                bg-[#081122]
                p-6
              "
            >

              <div
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                "
              >
                Delivery Intelligence
              </div>

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                "
              >

                <Clock3
                  className="
                    h-6
                    w-6
                    text-[#60A5FA]
                  "
                />

                <div
                  className="
                    text-2xl
                    font-black
                    text-white
                  "
                >
                  2 Day Dispatch
                </div>

              </div>

            </div>

            {/* PROCUREMENT */}

            <div
              className="
                rounded-3xl
                border
                border-slate-800
                bg-[#081122]
                p-6
              "
            >

              <div
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                "
              >
                Procurement Status
              </div>

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                "
              >

                <PackageCheck
                  className="
                    h-6
                    w-6
                    text-[#4ADE80]
                  "
                />

                <div
                  className="
                    text-2xl
                    font-black
                    text-white
                  "
                >
                  Expedition Ready
                </div>

              </div>

            </div>

          </div>

          {/* ============================================= */}
          {/* PARTS TABLE */}
          {/* ============================================= */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-800
              bg-[#081122]
            "
          >

            {/* HEADER */}

            <div
              className="
                grid
                grid-cols-4
                border-b
                border-slate-800
                px-6
                py-4
                text-xs
                font-bold
                uppercase
                tracking-[0.24em]
                text-slate-500
              "
            >

              <div>Brand</div>
              <div>Part</div>
              <div>OEM</div>
              <div>Status</div>

            </div>

            {/* ROWS */}

            {

              supplier.parts.map(

                (
                  part,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      grid
                      grid-cols-4
                      border-b
                      border-slate-900
                      px-6
                      py-5
                      text-white
                    "
                  >

                    <div
                      className="
                        font-semibold
                      "
                    >
                      {part.brand}
                    </div>

                    <div
                      className="
                        font-semibold
                        text-[#38BDF8]
                      "
                    >
                      {part.sku}
                    </div>

                    <div
                      className="
                        font-black
                      "
                    >
                      {part.oem}
                    </div>

                    <div>

                      <span
                        className="
                          rounded-full
                          bg-[#123B2A]
                          px-4
                          py-2
                          text-sm
                          font-bold
                          text-[#4ADE80]
                        "
                      >
                        {part.status}
                      </span>

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDEBAR */}
        {/* ================================================= */}

        <div
          className="
            space-y-6
          "
        >

          {/* ============================================= */}
          {/* TOGGLES */}
          {/* ============================================= */}

          <div
            className="
              flex
              rounded-2xl
              border
              border-slate-800
              bg-[#081122]
              p-2
            "
          >

            <button

              onClick={() =>
                setActivePanel(
                  "overview"
                )
              }

              className={`
                flex-1
                rounded-xl
                px-4
                py-3
                text-sm
                font-bold
                transition-all

                ${
                  activePanel === "overview"
                    ? "bg-[#1D4ED8] text-white"
                    : "text-slate-400"
                }
              `}
            >
              Supplier Overview
            </button>

            <button

              onClick={() =>
                setActivePanel(
                  "fitment"
                )
              }

              className={`
                flex-1
                rounded-xl
                px-4
                py-3
                text-sm
                font-bold
                transition-all

                ${
                  activePanel === "fitment"
                    ? "bg-[#1D4ED8] text-white"
                    : "text-slate-400"
                }
              `}
            >
              Vehicle Fitment
            </button>

          </div>

          {/* ============================================= */}
          {/* OVERVIEW */}
          {/* ============================================= */}

          {
            activePanel === "overview"
            &&
            (
              <div
                className="
                  rounded-3xl
                  border
                  border-slate-800
                  bg-[#081122]
                  p-6
                "
              >

                <h2
                  className="
                    text-xl
                    font-black
                    text-white
                  "
                >
                  Supplier Overview
                </h2>

                <div
                  className="
                    mt-6
                    space-y-5
                  "
                >

                  <div>

                    <div
                      className="
                        text-sm
                        font-semibold
                        text-slate-500
                      "
                    >
                      OEM Confidence
                    </div>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-2
                        text-white
                      "
                    >

                      <CheckCircle2
                        className="
                          h-5
                          w-5
                          text-[#4ADE80]
                        "
                      />

                      High OEM validation confidence.

                    </div>

                  </div>

                  <div>

                    <div
                      className="
                        text-sm
                        font-semibold
                        text-slate-500
                      "
                    >
                      Procurement Reliability
                    </div>

                    <div
                      className="
                        mt-2
                        text-slate-300
                      "
                    >
                      Consistent delivery reliability
                      across Defender platforms.
                    </div>

                  </div>

                </div>

              </div>
            )
          }

          {/* ============================================= */}
          {/* FITMENT */}
          {/* ============================================= */}

          {
            activePanel === "fitment"
            &&
            (
              <div
                className="
                  rounded-3xl
                  border
                  border-slate-800
                  bg-[#081122]
                  p-6
                "
              >

                <h2
                  className="
                    text-xl
                    font-black
                    text-white
                  "
                >
                  Vehicle Fitment Intelligence
                </h2>

                <div
                  className="
                    mt-6
                    space-y-5
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      border-[#123B2A]
                      bg-[#071B13]
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-[#4ADE80]
                      "
                    >

                      <CheckCircle2
                        className="
                          h-5
                          w-5
                        "
                      />

                      Confirmed Fitment

                    </div>

                    <div
                      className="
                        mt-3
                        text-sm
                        text-slate-300
                      "
                    >
                      Defender 110 300Tdi validated.
                    </div>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-[#3B2A12]
                      bg-[#1B1307]
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-[#FBBF24]
                      "
                    >

                      <AlertTriangle
                        className="
                          h-5
                          w-5
                        "
                      />

                      Fitment Notes

                    </div>

                    <div
                      className="
                        mt-3
                        text-sm
                        text-slate-300
                      "
                    >
                      Verify late-model transition vehicles.
                    </div>

                  </div>

                </div>

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}