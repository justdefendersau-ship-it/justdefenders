"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/AutonomousFleetIntelligenceDashboard.tsx
//
// Timestamp:
// 12 May 2026 05:30 (Sydney)
//
// PURPOSE:
// Autonomous fleet intelligence dashboard
// =====================================================

import React
from "react"

import {

  getAutonomousFleets,
  getAutonomousFleetHealthIndex

}
from "../../lib/parts-intelligence/autonomousFleetIntelligenceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function AutonomousFleetIntelligenceDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const fleets =
    getAutonomousFleets()

  const health =
    getAutonomousFleetHealthIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-autofleet-shell">

      <div className="jd-autofleet-header">

        Autonomous Fleet Intelligence

      </div>

      <div className="jd-autofleet-subtitle">

        Multi-vehicle expedition autonomy,
        predictive fleet coordination and
        autonomous operational optimisation

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-autofleet-health">

        Autonomous Fleet Health Index:

        {" "}

        <strong>

          {health}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-autofleet-grid">

        {

          fleets.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-autofleet-card"
              >

                <div className="jd-autofleet-top">

                  <div>

                    <div className="jd-autofleet-name">

                      {item.fleetName}

                    </div>

                    <div className="jd-autofleet-region">

                      {item.expeditionRegion}

                    </div>

                  </div>

                  <div className="jd-autofleet-state">

                    {

                      item.autonomyState

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-autofleet-metric">

                  Fleet Health:

                  {" "}

                  <strong>

                    {

                      item.fleetHealthScore

                    }%

                  </strong>

                </div>

                <div className="jd-autofleet-metric">

                  Predictive Risk:

                  {" "}

                  <strong>

                    {

                      item.predictiveRiskIndex

                    }%

                  </strong>

                </div>

                <div className="jd-autofleet-metric">

                  Operational Load:

                  {" "}

                  <strong>

                    {

                      item.operationalLoadIndex

                    }%

                  </strong>

                </div>

                <div className="jd-autofleet-metric">

                  Synchronisation Confidence:

                  {" "}

                  <strong>

                    {

                      item.synchronisationConfidence

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-autofleet-section">

                  <div className="jd-autofleet-section-title">

                    Autonomous Actions

                  </div>

                  <ul>

                    {

                      item.autonomousActions?.map(

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
                {/* RECOMMENDATIONS */}
                {/* =============================== */}

                <div className="jd-autofleet-section">

                  <div className="jd-autofleet-section-title">

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

                  Open Fleet Intelligence

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
