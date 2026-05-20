"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/GlobalExpeditionIntelligenceDashboard.tsx
//
// Timestamp:
// 12 May 2026 01:45 (Sydney)
//
// PURPOSE:
// Global expedition intelligence dashboard
// =====================================================

import React
from "react"

import {

  getGlobalExpeditionIntelligence,
  getGlobalOperationalComplexityAverage

}
from "../../lib/parts-intelligence/globalExpeditionIntelligenceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function GlobalExpeditionIntelligenceDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const expeditions =
    getGlobalExpeditionIntelligence()

  const complexity =
    getGlobalOperationalComplexityAverage()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-global-shell">

      <div className="jd-global-header">

        Global Expedition Intelligence

      </div>

      <div className="jd-global-subtitle">

        International expedition operations,
        environmental risk modelling and
        cross-border logistics intelligence

      </div>

      {/* ============================================= */}
      {/* COMPLEXITY */}
      {/* ============================================= */}

      <div className="jd-global-complexity">

        Global Expedition Complexity Index:

        {" "}

        <strong>

          {complexity}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-global-grid">

        {

          expeditions.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-global-card"
              >

                <div className="jd-global-top">

                  <div>

                    <div className="jd-global-route">

                      {item.expeditionRoute}

                    </div>

                    <div className="jd-global-region">

                      {item.expeditionRegion}

                    </div>

                  </div>

                  <div className="jd-global-risk">

                    {

                      item.environmentalRiskLevel

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-global-meta">

                  Operational Complexity:

                  {" "}

                  <strong>

                    {

                      item.operationalComplexity

                    }%

                  </strong>

                </div>

                <div className="jd-global-meta">

                  Logistics Difficulty:

                  {" "}

                  <strong>

                    {

                      item.logisticsDifficulty

                    }%

                  </strong>

                </div>

                <div className="jd-global-meta">

                  Border Crossings:

                  {" "}

                  <strong>

                    {

                      item.borderCrossings

                    }

                  </strong>

                </div>

                {/* =============================== */}
                {/* THREATS */}
                {/* =============================== */}

                <div className="jd-global-section">

                  <div className="jd-global-section-title">

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

                <div className="jd-global-section">

                  <div className="jd-global-section-title">

                    Operational Recommendations

                  </div>

                  <ul>

                    {

                      item.operationalRecommendations?.map(

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

                  Open Expedition Intelligence

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
