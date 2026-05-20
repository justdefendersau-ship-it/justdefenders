"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/OperationalAnalyticsDashboard.tsx
//
// Timestamp:
// 11 May 2026 21:15 (Sydney)
//
// PURPOSE:
// Executive operational analytics dashboard
// =====================================================

import React
from "react"

import {

  getOperationalAnalytics,
  getOperationalHealthScore

}
from "../../lib/parts-intelligence/operationalAnalyticsEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function OperationalAnalyticsDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const analytics =
    getOperationalAnalytics()

  const health =
    getOperationalHealthScore()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-analytics-shell">

      <div className="jd-analytics-header">

        Operational Analytics Intelligence

      </div>

      <div className="jd-analytics-subtitle">

        Expedition readiness metrics,
        procurement visibility and
        operational performance analytics

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-analytics-health">

        Platform Operational Health:

        {" "}

        <strong>

          {health}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-analytics-grid">

        {

          analytics.map(

            (
              metric:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-analytics-card"
              >

                <div className="jd-analytics-top">

                  <div>

                    <div className="jd-analytics-name">

                      {metric.metricName}

                    </div>

                    <div className="jd-analytics-type">

                      {metric.analyticsType}

                    </div>

                  </div>

                  <div className="jd-analytics-status">

                    {

                      metric.operationalStatus

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* VALUE */}
                {/* =============================== */}

                <div className="jd-analytics-value">

                  {metric.metricValue}

                  {metric.metricUnit}

                </div>

                {/* =============================== */}
                {/* FACTORS */}
                {/* =============================== */}

                <div className="jd-analytics-section">

                  <div className="jd-analytics-section-title">

                    Supporting Factors

                  </div>

                  <ul>

                    {

                      metric.supportingFactors?.map(

                        (
                          factor:string,
                          factorIdx:number
                        )=>(

                          <li key={factorIdx}>

                            {factor}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-analytics-section">

                  <div className="jd-analytics-section-title">

                    Recommended Actions

                  </div>

                  <ul>

                    {

                      metric.recommendedActions?.map(

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

                  View Analytics

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
