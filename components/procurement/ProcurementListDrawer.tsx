/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\ProcurementListDrawer.tsx
 *
 * Timestamp:
 * 21 May 2026 14:22 Sydney
 *
 * PURPOSE:
 * Procurement List Drawer
 *
 * STRATEGY:
 * PASS 21 — PDF Procurement Packs
 *
 * FEATURES:
 * - Saved procurement items
 * - CSV export
 * - PDF procurement pack generation
 * - Operational workflow persistence
 *
 * ============================================================
 */

"use client"

import {
  X,
  Trash2,
  PackageCheck,
  Download,
  FileText
} from "lucide-react"

import jsPDF from "jspdf"

import autoTable
from "jspdf-autotable"

import {
  useProcurementList
} from "@/contexts/ProcurementListContext"

// ============================================================
// TYPES
// ============================================================

interface Props {

  open: boolean

  onClose: () => void
}

// ============================================================
// COMPONENT
// ============================================================

export default function ProcurementListDrawer({

  open,

  onClose

}: Props){

  const {

    items,

    removeItem,

    clearList

  } = useProcurementList()

  // ==========================================================
  // EXPORT CSV
  // ==========================================================

  function exportCSV(){

    if (
      items.length === 0
    ) {

      return
    }

    const headers = [

      "SKU",
      "Brand",
      "Title",
      "Supplier",
      "Fitment",
      "ExpeditionReady"
    ]

    const rows =

      items.map(item => [

        item.sku,
        item.brand,
        item.title,
        item.supplier,
        item.fitment,
        item.expeditionReady
      ])

    const csvContent = [

      headers.join(","),

      ...rows.map(

        row =>

          row.join(",")
      )

    ].join("\n")

    const blob =

      new Blob(

        [csvContent],

        {
          type:
            "text/csv;charset=utf-8;"
        }
      )

    const url =
      URL.createObjectURL(blob)

    const link =
      document.createElement("a")

    link.href = url

    link.setAttribute(

      "download",

      "justdefenders_procurement_list.csv"
    )

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
  }

  // ==========================================================
  // EXPORT PDF
  // ==========================================================

  function exportPDF(){

    if (
      items.length === 0
    ) {

      return
    }

    const doc =
      new jsPDF()

    // ========================================================
    // HEADER
    // ========================================================

    doc.setFontSize(24)

    doc.text(

      "JustDefenders Procurement Pack",

      14,

      22
    )

    doc.setFontSize(11)

    doc.text(

      "Operational Procurement Intelligence Platform",

      14,

      30
    )

    doc.text(

      `Generated: ${new Date().toLocaleString()}`,

      14,

      38
    )

    // ========================================================
    // SUMMARY
    // ========================================================

    doc.setFontSize(14)

    doc.text(

      "Operational Summary",

      14,

      52
    )

    doc.setFontSize(11)

    doc.text(

      `Saved Procurement Items: ${items.length}`,

      14,

      62
    )

    // ========================================================
    // TABLE
    // ========================================================

    autoTable(doc, {

      startY: 74,

      head: [[

        "SKU",
        "Brand",
        "Title",
        "Supplier",
        "Fitment",
        "Expedition"
      ]],

      body:

        items.map(item => [

          item.sku,

          item.brand,

          item.title,

          item.supplier,

          `${item.fitment}%`,

          item.expeditionReady
            ? "READY"
            : "NO"
        ]),

      styles: {

        fontSize: 10
      },

      headStyles: {

        fillColor: [29, 78, 216]
      }
    })

    // ========================================================
    // FOOTER
    // ========================================================

    const pageHeight =
      doc.internal.pageSize.height

    doc.setFontSize(10)

    doc.text(

      "JustDefenders© Operational Procurement Intelligence",

      14,

      pageHeight - 10
    )

    // ========================================================
    // SAVE
    // ========================================================

    doc.save(

      "justdefenders_procurement_pack.pdf"
    )
  }

  // ==========================================================
  // CLOSED
  // ==========================================================

  if (
    !open
  ) {

    return null
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div
      className="
        fixed
        inset-0
        z-[300]
        bg-black/60
        backdrop-blur-sm
      "
    >

      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-full
          max-w-[520px]
          overflow-y-auto
          border-l
          border-slate-800
          bg-[#020617]
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            px-6
            py-5
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-white
              "
            >
              Procurement List
            </h2>

            <div
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              Saved operational procurement items
            </div>

          </div>

          <button

            onClick={onClose}

            className="
              rounded-xl
              border
              border-slate-700
              p-2
              text-slate-300
            "
          >

            <X
              className="
                h-5
                w-5
              "
            />

          </button>

        </div>

        {/* ================================================= */}
        {/* ACTIONS */}
        {/* ================================================= */}

        {

          items.length > 0

          &&

          <div
            className="
              flex
              flex-wrap
              gap-3
              border-b
              border-slate-800
              px-6
              py-4
            "
          >

            {/* CSV */}

            <button

              onClick={exportCSV}

              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-[#1D4ED8]
                px-4
                py-3
                text-sm
                font-black
                text-white
              "
            >

              <Download
                className="
                  h-4
                  w-4
                "
              />

              Export CSV

            </button>

            {/* PDF */}

            <button

              onClick={exportPDF}

              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-[#14532D]
                px-4
                py-3
                text-sm
                font-black
                text-white
              "
            >

              <FileText
                className="
                  h-4
                  w-4
                "
              />

              Export PDF

            </button>

            {/* CLEAR */}

            <button

              onClick={clearList}

              className="
                rounded-2xl
                border
                border-slate-700
                px-4
                py-3
                text-sm
                font-bold
                text-slate-300
              "
            >
              Clear List
            </button>

          </div>
        }

        {/* ================================================= */}
        {/* ITEMS */}
        {/* ================================================= */}

        <div
          className="
            space-y-4
            p-6
          "
        >

          {

            items.length === 0

            &&

            <div
              className="
                rounded-3xl
                border
                border-slate-800
                bg-[#081122]
                p-10
                text-center
              "
            >

              <PackageCheck
                className="
                  mx-auto
                  h-10
                  w-10
                  text-slate-500
                "
              />

              <div
                className="
                  mt-4
                  text-lg
                  font-bold
                  text-white
                "
              >
                No Saved Parts
              </div>

              <div
                className="
                  mt-2
                  text-sm
                  text-slate-400
                "
              >
                Add parts from procurement intelligence pages.
              </div>

            </div>
          }

          {

            items.map(

              item => (

                <div
                  key={item.sku}
                  className="
                    rounded-3xl
                    border
                    border-slate-800
                    bg-[#081122]
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div>

                      <div
                        className="
                          text-lg
                          font-black
                          text-white
                        "
                      >
                        {item.sku}
                      </div>

                      <div
                        className="
                          mt-1
                          text-sm
                          text-slate-400
                        "
                      >
                        {item.title}
                      </div>

                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >

                        <span
                          className="
                            rounded-full
                            bg-[#123B2A]
                            px-3
                            py-1
                            text-xs
                            font-bold
                            text-[#4ADE80]
                          "
                        >
                          {item.fitment}% Fitment
                        </span>

                        <span
                          className="
                            rounded-full
                            border
                            border-slate-700
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-slate-300
                          "
                        >
                          {item.supplier}
                        </span>

                      </div>

                    </div>

                    <button

                      onClick={() =>

                        removeItem(
                          item.sku
                        )

                      }

                      className="
                        rounded-xl
                        border
                        border-slate-700
                        p-2
                        text-slate-300
                      "
                    >

                      <Trash2
                        className="
                          h-4
                          w-4
                        "
                      />

                    </button>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  )
}