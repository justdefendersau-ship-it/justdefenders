"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/AIOperationalStrategyDashboard.tsx
//
// Timestamp:
// 12 May 2026 09:15 (Sydney)
//
// PURPOSE:
// AI operational strategy dashboard
// =====================================================

import React
from "react"

import {

  getAIOperationalStrategies,
  getStrategicEfficiencyIndex

}
from "../../lib/parts-intelligence/aiOperationalStrategyEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function AIOperationalStrategyDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const strategies =
    getAIOperationalStrategies()

  const efficiency =
    getStrategicEfficiencyIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-strategy-shell">

      <div className="jd-strategy-header">

        AI Operational Strategy Engine

      </div>

      <div className="jd-strategy-subtitle">

        AI mission optimisation,
        predictive strategic intelligence and
        expedition command decision modelling

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-strategy-index">

        Strategic Efficiency Index:

        {" "}

        <strong>

          {efficiency}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-strategy-grid">

        {

          strategies.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-strategy-card"
              >

                <div className="jd-strategy-top">

                  <div>

                    <div className="jd-strategy-name">

                      {item.missionName}

                    </div>

                    <div className="jd-strategy-region">

                      {item.expeditionRegion}

                    </div>

                  </div>

                  <div className="jd-strategy-state">

                    {

                      item.strategicState

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-strategy-metric">

                  Operational Efficiency:

                  {" "}

                  <strong>

                    {

                      item.operationalEfficiency

                    }%

                  </strong>

                </div>

                <div className="jd-strategy-metric">

                  Survivability Index:

                  {" "}

                  <strong>

                    {

                      item.survivabilityIndex

                    }%

                  </strong>

                </div>

                <div className="jd-strategy-metric">

                  Logistics Efficiency:

                  {" "}

                  <strong>

                    {

                      item.logisticsEfficiency

                    }%

                  </strong>

                </div>

                <div className="jd-strategy-metric">

                  AI Confidence:

                  {" "}

                  <strong>

                    {

                      item.aiConfidence

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* RECOMMENDATIONS */}
                {/* =============================== */}

                <div className="jd-strategy-section">

                  <div className="jd-strategy-section-title">

                    AI Strategic Recommendations

                  </div>

                  <ul>

                    {

                      item.aiStrategicRecommendations?.map(

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
                {/* TRADEOFFS */}
                {/* =============================== */}

                <div className="jd-strategy-section">

                  <div className="jd-strategy-section-title">

                    Operational Tradeoffs

                  </div>

                  <ul>

                    {

                      item.operationalTradeoffs?.map(

                        (
                          tradeoff:string,
                          tradeoffIdx:number
                        )=>(

                          <li key={tradeoffIdx}>

                            {tradeoff}

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

                  Open Strategic Intelligence

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
