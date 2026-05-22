/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\PartIntelligenceWorkspace.tsx
 *
 * Timestamp:
 * 21 May 2026 10:04 Sydney
 *
 * PURPOSE:
 * Part Intelligence Workspace
 *
 * STRATEGY:
 * PASS 16B — Add To Procurement List
 *
 * ============================================================
 */

"use client"

import Link from "next/link"

import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  AlertTriangle,
  PackageCheck,
  Plus,
  Check
} from "lucide-react"

import {
  useProcurementList
} from "@/contexts/ProcurementListContext"

// ============================================================
// TYPES
// ============================================================

interface CrossReference {

  brand: string

  sku: string
}

interface Fitment {

  model: string

  engine: string

  years: string

  confidence: string
}

interface PartIntelligence {

  sku: string

  brand: string

  title: string

  oemConfidence: number

  expeditionReady: boolean

  supersession: string

  lifecycle: string

  crossReferences:
    CrossReference[]

  fitments:
    Fitment[]

  notes: string[]
}

interface Props {

  part: PartIntelligence
}

// ============================================================
// COMPONENT
// ============================================================

export default function PartIntelligenceWorkspace({

  part

}: Props){

  // ==========================================================
  // PROCUREMENT LIST
  // ==========================================================

  const {

    addItem,

    isSaved

  } = useProcurementList()

  const saved =
    isSaved(
      part.sku
    )

  function savePart(){

    addItem({

      sku:
        part.sku,

      brand:
        part.brand,

      title:
        part.title,

      supplier:
        "Operational Federation",

      fitment:
        part.oemConfidence,

      expeditionReady:
        part.expeditionReady
    })
  }

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
      {/* HEADER */}
      {/* ================================================== */}

      <div
        className="
          mt-6
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
            flex-wrap
            items-start
            justify-between
            gap-6
          "
        >

          {/* LEFT */}

          <div>

            <div
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#60A5FA]
              "
            >
              {part.brand}
            </div>

            <h1
              className="
                mt-3
                text-5xl
                font-black
                text-white
              "
            >
              {part.sku}
            </h1>

            <div
              className="
                mt-3
                text-xl
                text-slate-300
              "
            >
              {part.title}
            </div>

            {/* TAGS */}

            <div
              className="
                mt-6
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
                {part.oemConfidence}% OEM Confidence
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
                Supersession:
                {" "}
                {part.supersession}
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
                Lifecycle:
                {" "}
                {part.lifecycle}
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-col
              items-end
              gap-4
            "
          >

            <div
              className="
                rounded-2xl
                bg-[#123B2A]
                px-5
                py-4
                text-[#4ADE80]
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-lg
                  font-black
                "
              >

                <PackageCheck
                  className="
                    h-5
                    w-5
                  "
                />

                Expedition Ready

              </div>

            </div>

            {/* SAVE */}

            <button

              onClick={savePart}

              disabled={saved}

              className={`
                flex
                items-center
                gap-2
                rounded-2xl
                px-5
                py-3
                text-sm
                font-black
                transition-all

                ${
                  saved

                  ?

                  "bg-[#123B2A] text-[#4ADE80]"

                  :

                  "bg-[#1D4ED8] text-white hover:bg-[#2563EB]"
                }
              `}
            >

              {

                saved

                ?

                <Check
                  className="
                    h-4
                    w-4
                  "
                />

                :

                <Plus
                  className="
                    h-4
                    w-4
                  "
                />
              }

              {

                saved

                ?

                "Saved To Procurement List"

                :

                "Add To Procurement List"
              }

            </button>

          </div>

        </div>

      </div>

      {/* ================================================== */}
      {/* GRID */}
      {/* ================================================== */}

      <div
        className="
          mt-6
          grid
          gap-6
          xl:grid-cols-[minmax(0,1fr)_420px]
        "
      >

        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <div
          className="
            space-y-6
          "
        >

          {/* ============================================= */}
          {/* CROSS REFERENCES */}
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

            <div
              className="
                border-b
                border-slate-800
                px-6
                py-5
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                Cross References
              </h2>

            </div>

            {

              part.crossReferences.map(

                (
                  reference,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      grid
                      grid-cols-2
                      border-b
                      border-slate-900
                      px-6
                      py-5
                    "
                  >

                    <div
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      {reference.brand}
                    </div>

                    <div
                      className="
                        font-bold
                        text-[#38BDF8]
                      "
                    >
                      {reference.sku}
                    </div>

                  </div>
                )
              )
            }

          </div>

          {/* ============================================= */}
          {/* FITMENT MATRIX */}
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

            <div
              className="
                border-b
                border-slate-800
                px-6
                py-5
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                Fitment Matrix
              </h2>

            </div>

            {

              part.fitments.map(

                (
                  fitment,
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
                    "
                  >

                    <div
                      className="
                        text-white
                      "
                    >
                      {fitment.model}
                    </div>

                    <div
                      className="
                        text-slate-300
                      "
                    >
                      {fitment.engine}
                    </div>

                    <div
                      className="
                        text-slate-300
                      "
                    >
                      {fitment.years}
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
                        {fitment.confidence}
                      </span>

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT */}
        {/* ================================================= */}

        <div
          className="
            space-y-6
          "
        >

          {/* ============================================= */}
          {/* PROCUREMENT */}
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

            <h2
              className="
                text-2xl
                font-black
                text-white
              "
            >
              Procurement Intelligence
            </h2>

            <div
              className="
                mt-6
                space-y-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Shield
                  className="
                    h-5
                    w-5
                    text-[#60A5FA]
                  "
                />

                <div
                  className="
                    text-slate-200
                  "
                >
                  OEM validation confirmed.
                </div>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <CheckCircle2
                  className="
                    h-5
                    w-5
                    text-[#4ADE80]
                  "
                />

                <div
                  className="
                    text-slate-200
                  "
                >
                  AU operational stock available.
                </div>

              </div>

            </div>

          </div>

          {/* ============================================= */}
          {/* NOTES */}
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

            <h2
              className="
                text-2xl
                font-black
                text-white
              "
            >
              Technical Notes
            </h2>

            <div
              className="
                mt-6
                space-y-4
              "
            >

              {

                part.notes.map(

                  (
                    note,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-[#3B2A12]
                        bg-[#1B1307]
                        p-4
                      "
                    >

                      <AlertTriangle
                        className="
                          mt-0.5
                          h-5
                          w-5
                          text-[#FBBF24]
                        "
                      />

                      <div
                        className="
                          text-sm
                          text-slate-300
                        "
                      >
                        {note}
                      </div>

                    </div>
                  )
                )
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}