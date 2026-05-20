"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/PlatformMonetisationDashboard.tsx
//
// Timestamp:
// 12 May 2026 00:15 (Sydney)
//
// PURPOSE:
// Platform monetisation operations dashboard
// =====================================================

import React
from "react"

import {

  getPlatformMonetisation,
  getTotalMonthlyRevenue,
  getAverageConversionRate

}
from "../../lib/parts-intelligence/platformMonetisationEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function PlatformMonetisationDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const monetisation =
    getPlatformMonetisation()

  const revenue =
    getTotalMonthlyRevenue()

  const conversion =
    getAverageConversionRate()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-money-shell">

      <div className="jd-money-header">

        Platform Monetisation Intelligence

      </div>

      <div className="jd-money-subtitle">

        Revenue orchestration,
        expedition commerce analytics and
        operational monetisation intelligence

      </div>

      {/* ============================================= */}
      {/* KPIs */}
      {/* ============================================= */}

      <div className="jd-money-kpis">

        <div className="jd-money-kpi">

          <div className="jd-money-kpi-label">

            Monthly Revenue

          </div>

          <div className="jd-money-kpi-value">

            $

            {revenue.toLocaleString()}

          </div>

        </div>

        <div className="jd-money-kpi">

          <div className="jd-money-kpi-label">

            Avg Conversion

          </div>

          <div className="jd-money-kpi-value">

            {conversion}%

          </div>

        </div>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-money-grid">

        {

          monetisation.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-money-card"
              >

                <div className="jd-money-top">

                  <div>

                    <div className="jd-money-stream">

                      {item.revenueStreamType}

                    </div>

                    <div className="jd-money-region">

                      {item.operationalRegion}

                    </div>

                  </div>

                  <div className="jd-money-health">

                    {

                      item.operationalHealth

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-money-metric">

                  Revenue:

                  {" "}

                  <strong>

                    $

                    {

                      item.monthlyRevenue?.toLocaleString()

                    }

                  </strong>

                </div>

                <div className="jd-money-metric">

                  Transactions:

                  {" "}

                  <strong>

                    {

                      item.monthlyTransactions

                    }

                  </strong>

                </div>

                <div className="jd-money-metric">

                  Growth:

                  {" "}

                  <strong>

                    {

                      item.growthPercentage

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* INSIGHTS */}
                {/* =============================== */}

                <div className="jd-money-section">

                  <div className="jd-money-section-title">

                    Operational Insights

                  </div>

                  <ul>

                    {

                      item.operationalInsights?.map(

                        (
                          insight:string,
                          insightIdx:number
                        )=>(

                          <li key={insightIdx}>

                            {insight}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-money-section">

                  <div className="jd-money-section-title">

                    Recommended Actions

                  </div>

                  <ul>

                    {

                      item.recommendedActions?.map(

                        (
                          action:string,
                          actionIdx:number
                        )=>(

                          <li key={actionIdx}>

                            {action}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* BUTTON */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  Open Revenue Stream

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
