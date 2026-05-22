/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\observability\FederationObservabilityConsole.tsx
 *
 * Timestamp:
 * 21 May 2026 17:08 Sydney
 *
 * PURPOSE:
 * Federation Observability Console
 *
 * STRATEGY:
 * PASS 26 — Production Observability Console
 *
 * ============================================================
 */

"use client"

import {
  useEffect,
  useState
} from "react"

import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  TimerReset,
  ServerCrash
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================

interface SupplierHealth {

  supplier: string

  healthy: boolean

  lastSuccess?: string

  lastFailure?: string
}

interface SupplierPerformance {

  supplier: string

  responseTime: number

  timestamp: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function FederationObservabilityConsole(){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    loading,

    setLoading

  ] = useState(true)

  const [

    supplierHealth,

    setSupplierHealth

  ] = useState<
    SupplierHealth[]
  >([])

  const [

    supplierPerformance,

    setSupplierPerformance

  ] = useState<
    SupplierPerformance[]
  >([])

  // ==========================================================
  // LOAD
  // ==========================================================

  async function loadObservability(){

    try {

      const response =

        await fetch(
          "/api/observability/federation"
        )

      const data =
        await response.json()

      setSupplierHealth(

        data.supplierHealth || []
      )

      setSupplierPerformance(

        data.supplierPerformance || []
      )

    } catch (

      err

    ) {

      console.error(

        "OBSERVABILITY LOAD FAILURE",

        err
      )

    } finally {

      setLoading(false)
    }
  }

  // ==========================================================
  // EFFECT
  // ==========================================================

  useEffect(() => {

    loadObservability()

    const interval =

      setInterval(

        loadObservability,

        5000
      )

    return () =>

      clearInterval(
        interval
      )

  }, [])

  // ==========================================================
  // LOADING
  // ==========================================================

  if (
    loading
  ) {

    return (

      <div
        className="
          rounded-[32px]
          border
          border-slate-800
          bg-[#07101F]
          p-10
          text-slate-300
        "
      >
        Loading federation observability...
      </div>
    )
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div
      className="
        space-y-6
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          rounded-[32px]
          border
          border-slate-800
          bg-[#07101F]
          p-8
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <Activity
            className="
              h-10
              w-10
              text-[#38BDF8]
            "
          />

          <div>

            <div
              className="
                text-[34px]
                font-black
                text-white
              "
            >
              Federation Observability
            </div>

            <div
              className="
                mt-1
                text-slate-400
              "
            >
              Operational supplier federation diagnostics
            </div>

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* HEALTH */}
      {/* ==================================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-3
        "
      >

        {

          supplierHealth.map(

            supplier => (

              <div
                key={supplier.supplier}
                className="
                  rounded-[28px]
                  border
                  border-slate-800
                  bg-[#07101F]
                  p-6
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
                        text-sm
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-[#38BDF8]
                      "
                    >
                      Supplier
                    </div>

                    <div
                      className="
                        mt-2
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      {supplier.supplier}
                    </div>

                  </div>

                  {

                    supplier.healthy

                    ?

                    <CheckCircle2
                      className="
                        h-8
                        w-8
                        text-[#4ADE80]
                      "
                    />

                    :

                    <AlertTriangle
                      className="
                        h-8
                        w-8
                        text-red-400
                      "
                    />
                  }

                </div>

                <div
                  className="
                    mt-6
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#050C18]
                    px-4
                    py-3
                    text-sm
                    text-slate-300
                  "
                >

                  {

                    supplier.healthy

                    ?

                    "Federation Operational"

                    :

                    "Federation Failure Detected"
                  }

                </div>

                {

                  supplier.lastSuccess

                  &&

                  <div
                    className="
                      mt-4
                      text-xs
                      text-slate-500
                    "
                  >
                    Last Success:
                    {" "}
                    {supplier.lastSuccess}
                  </div>
                }

                {

                  supplier.lastFailure

                  &&

                  <div
                    className="
                      mt-2
                      text-xs
                      text-red-400
                    "
                  >
                    Last Failure:
                    {" "}
                    {supplier.lastFailure}
                  </div>
                }

              </div>
            )
          )
        }

      </div>

      {/* ==================================================== */}
      {/* PERFORMANCE */}
      {/* ==================================================== */}

      <div
        className="
          overflow-hidden
          rounded-[32px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        {/* HEADER */}

        <div
          className="
            border-b
            border-slate-900
            px-7
            py-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <TimerReset
              className="
                h-6
                w-6
                text-[#38BDF8]
              "
            />

            <div
              className="
                text-2xl
                font-black
                text-white
              "
            >
              Federation Performance
            </div>

          </div>

        </div>

        {/* TABLE */}

        <div
          className="
            overflow-x-auto
          "
        >

          <table
            className="
              w-full
            "
          >

            <thead
              className="
                bg-[#050C18]
              "
            >

              <tr>

                <th
                  className="
                    px-7
                    py-4
                    text-left
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-slate-500
                  "
                >
                  Supplier
                </th>

                <th
                  className="
                    px-7
                    py-4
                    text-left
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-slate-500
                  "
                >
                  Response
                </th>

                <th
                  className="
                    px-7
                    py-4
                    text-left
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-slate-500
                  "
                >
                  Timestamp
                </th>

              </tr>

            </thead>

            <tbody>

              {

                supplierPerformance
                  .slice(-12)
                  .reverse()
                  .map((entry, index) => (

                    <tr
                      key={index}
                      className="
                        border-t
                        border-slate-900
                      "
                    >

                      <td
                        className="
                          px-7
                          py-5
                          text-lg
                          font-bold
                          text-white
                        "
                      >
                        {entry.supplier}
                      </td>

                      <td
                        className="
                          px-7
                          py-5
                        "
                      >

                        <div
                          className={`
                            inline-flex
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-black

                            ${entry.responseTime < 700
                              ? "bg-[#123B2A] text-[#4ADE80]"
                              : entry.responseTime < 1800
                              ? "bg-[#3B2A12] text-[#FBBF24]"
                              : "bg-[#2A1212] text-red-400"
                            }
                          `}
                        >
                          {entry.responseTime}ms
                        </div>

                      </td>

                      <td
                        className="
                          px-7
                          py-5
                          text-sm
                          text-slate-400
                        "
                      >
                        {entry.timestamp}
                      </td>

                    </tr>
                  ))
              }

            </tbody>

          </table>

        </div>

      </div>

      {/* ==================================================== */}
      {/* SUMMARY */}
      {/* ==================================================== */}

      <div
        className="
          rounded-[32px]
          border
          border-slate-800
          bg-[#07101F]
          p-8
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <ServerCrash
            className="
              h-6
              w-6
              text-[#38BDF8]
            "
          />

          <div
            className="
              text-2xl
              font-black
              text-white
            "
          >
            Operational Federation Summary
          </div>

        </div>

        <div
          className="
            mt-6
            grid
            gap-4
            md:grid-cols-3
          "
        >

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-[#050C18]
              p-5
            "
          >

            <div
              className="
                text-sm
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Suppliers
            </div>

            <div
              className="
                mt-2
                text-4xl
                font-black
                text-white
              "
            >
              {supplierHealth.length}
            </div>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-[#050C18]
              p-5
            "
          >

            <div
              className="
                text-sm
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Healthy
            </div>

            <div
              className="
                mt-2
                text-4xl
                font-black
                text-[#4ADE80]
              "
            >
              {
                supplierHealth.filter(

                  supplier =>

                    supplier.healthy
                ).length
              }
            </div>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-[#050C18]
              p-5
            "
          >

            <div
              className="
                text-sm
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Failures
            </div>

            <div
              className="
                mt-2
                text-4xl
                font-black
                text-red-400
              "
            >
              {
                supplierHealth.filter(

                  supplier =>

                    !supplier.healthy
                ).length
              }
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}