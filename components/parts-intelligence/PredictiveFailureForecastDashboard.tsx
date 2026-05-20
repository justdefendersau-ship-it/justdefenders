"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/PredictiveFailureForecastDashboard.tsx
//
// Timestamp:
// 12 May 2026 01:00 (Sydney)
//
// PURPOSE:
// Predictive expedition failure forecasting dashboard
// =====================================================

import React
from "react"

import {

  getPredictiveFailureForecasts,
  getAverageFailureRisk

}
from "../../lib/parts-intelligence/predictiveFailureForecastEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function PredictiveFailureForecastDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const forecasts =
    getPredictiveFailureForecasts()

  const risk =
    getAverageFailureRisk()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-forecast-shell">

      <div className="jd-forecast-header">

        Predictive Failure Forecasting

      </div>

      <div className="jd-forecast-subtitle">

        Expedition predictive maintenance,
        operational risk escalation and
        explainable failure intelligence

      </div>

      {/* ============================================= */}
      {/* RISK */}
      {/* ============================================= */}

      <div className="jd-forecast-risk">

        Fleet Failure Risk Index:

        {" "}

        <strong>

          {

            Math.round(
              risk * 100
            )

          }%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-forecast-grid">

        {

          forecasts.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-forecast-card"
              >

                <div className="jd-forecast-top">

                  <div>

                    <div className="jd-forecast-component">

                      {item.componentName}

                    </div>

                    <div className="jd-forecast-vehicle">

                      {item.vehicleModel}

                    </div>

                  </div>

                  <div className="jd-forecast-severity">

                    {

                      item.operationalSeverity

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* ROUTE */}
                {/* =============================== */}

                <div className="jd-forecast-meta">

                  Route:

                  {" "}

                  <strong>

                    {item.expeditionRoute}

                  </strong>

                </div>

                {/* =============================== */}
                {/* FAILURE */}
                {/* =============================== */}

                <div className="jd-forecast-meta">

                  Failure Probability:

                  {" "}

                  <strong>

                    {

                      Math.round(

                        item.predictedFailureProbability
                        * 100

                      )

                    }%

                  </strong>

                </div>

                <div className="jd-forecast-meta">

                  Estimated Failure Window:

                  {" "}

                  <strong>

                    {

                      item.estimatedFailureWindowKm

                    }

                    km

                  </strong>

                </div>

                {/* =============================== */}
                {/* SIGNALS */}
                {/* =============================== */}

                <div className="jd-forecast-section">

                  <div className="jd-forecast-section-title">

                    Supporting Signals

                  </div>

                  <ul>

                    {

                      item.supportingSignals?.map(

                        (
                          signal:string,
                          signalIdx:number
                        )=>(

                          <li key={signalIdx}>

                            {signal}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* MITIGATIONS */}
                {/* =============================== */}

                <div className="jd-forecast-section">

                  <div className="jd-forecast-section-title">

                    Recommended Mitigations

                  </div>

                  <ul>

                    {

                      item.recommendedMitigations?.map(

                        (
                          mitigation:string,
                          mitigationIdx:number
                        )=>(

                          <li key={mitigationIdx}>

                            {mitigation}

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

                  Open Failure Forecast

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
