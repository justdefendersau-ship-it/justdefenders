"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/PredictiveSurvivalIntelligenceDashboard.tsx
//
// Timestamp:
// 12 May 2026 10:45 (Sydney)
//
// PURPOSE:
// Predictive survival intelligence dashboard
// =====================================================

import React
from "react"

import {

  getPredictiveSurvivalStates,
  getGlobalSurvivalIndex

}
from "../../lib/parts-intelligence/predictiveSurvivalIntelligenceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function PredictiveSurvivalIntelligenceDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const survivability =
    getPredictiveSurvivalStates()

  const survivalIndex =
    getGlobalSurvivalIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-survival-shell">

      <div className="jd-survival-header">

        Predictive Survival Intelligence

      </div>

      <div className="jd-survival-subtitle">

        Human survivability forecasting,
        environmental threat intelligence and
        AI expedition survival orchestration

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-survival-index">

        Global Survival Index:

        {" "}

        <strong>

          {survivalIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-survival-grid">

        {

          survivability.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-survival-card"
              >

                <div className="jd-survival-top">

                  <div>

                    <div className="jd-survival-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-survival-state">

                      {

                        item.survivalState

                      }

                    </div>

                  </div>

                  <div className="jd-survival-hours">

                    {

                      item.survivabilityWindowHours

                    }h

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-survival-metric">

                  Water Security:

                  {" "}

                  <strong>

                    {

                      item.waterSecurity

                    }%

                  </strong>

                </div>

                <div className="jd-survival-metric">

                  Thermal Risk:

                  {" "}

                  <strong>

                    {

                      item.thermalRisk

                    }%

                  </strong>

                </div>

                <div className="jd-survival-metric">

                  Communications Resilience:

                  {" "}

                  <strong>

                    {

                      item.communicationsResilience

                    }%

                  </strong>

                </div>

                <div className="jd-survival-metric">

                  Extraction Probability:

                  {" "}

                  <strong>

                    {

                      item.extractionProbability

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* THREATS */}
                {/* =============================== */}

                <div className="jd-survival-section">

                  <div className="jd-survival-section-title">

                    Environmental Threats

                  </div>

                  <ul>

                    {

                      item.environmentalThreats?.map(

                        (
                          threat:string,
                          threatIdx:number
                        )=>(

                          <li key={threatIdx}>

                            {threat}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* RECOMMENDATIONS */}
                {/* =============================== */}

                <div className="jd-survival-section">

                  <div className="jd-survival-section-title">

                    Survival Recommendations

                  </div>

                  <ul>

                    {

                      item.survivalRecommendations?.map(

                        (
                          recommendation:string,
                          recommendationIdx:number
                        )=>(

                          <li key={recommendationIdx}>

                            {recommendation}

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

                  Open Survival Intelligence

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
