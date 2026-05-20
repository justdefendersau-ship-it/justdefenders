"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/AutonomousRecoveryPlanningDashboard.tsx
//
// Timestamp:
// 12 May 2026 08:30 (Sydney)
//
// PURPOSE:
// Autonomous expedition recovery planning dashboard
// =====================================================

import React
from "react"

import {

  getAutonomousRecoveryPlans,
  getRecoverySurvivabilityIndex

}
from "../../lib/parts-intelligence/autonomousRecoveryPlanningEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function AutonomousRecoveryPlanningDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const plans =
    getAutonomousRecoveryPlans()

  const survivability =
    getRecoverySurvivabilityIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-autorecovery-shell">

      <div className="jd-autorecovery-header">

        Autonomous Recovery Planning

      </div>

      <div className="jd-autorecovery-subtitle">

        Expedition survivability modelling,
        predictive evacuation intelligence and
        autonomous contingency orchestration

      </div>

      {/* ============================================= */}
      {/* SURVIVABILITY */}
      {/* ============================================= */}

      <div className="jd-autorecovery-index">

        Recovery Survivability Index:

        {" "}

        <strong>

          {survivability}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-autorecovery-grid">

        {

          plans.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-autorecovery-card"
              >

                <div className="jd-autorecovery-top">

                  <div>

                    <div className="jd-autorecovery-route">

                      {item.expeditionRoute}

                    </div>

                    <div className="jd-autorecovery-level">

                      {

                        item.contingencyLevel

                      }

                    </div>

                  </div>

                  <div className="jd-autorecovery-score">

                    {

                      item.survivabilityScore

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-autorecovery-metric">

                  Recovery Complexity:

                  {" "}

                  <strong>

                    {

                      item.recoveryComplexity

                    }%

                  </strong>

                </div>

                <div className="jd-autorecovery-metric">

                  Evacuation Probability:

                  {" "}

                  <strong>

                    {

                      item.evacuationProbability

                    }%

                  </strong>

                </div>

                <div className="jd-autorecovery-metric">

                  Environmental Severity:

                  {" "}

                  <strong>

                    {

                      item.environmentalSeverity

                    }%

                  </strong>

                </div>

                <div className="jd-autorecovery-metric">

                  Nearest Support:

                  {" "}

                  <strong>

                    {

                      item.nearestSupportDistanceKm

                    }

                    km

                  </strong>

                </div>

                {/* =============================== */}
                {/* THREATS */}
                {/* =============================== */}

                <div className="jd-autorecovery-section">

                  <div className="jd-autorecovery-section-title">

                    Predictive Threats

                  </div>

                  <ul>

                    {

                      item.predictiveThreats?.map(

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
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-autorecovery-section">

                  <div className="jd-autorecovery-section-title">

                    Contingency Actions

                  </div>

                  <ul>

                    {

                      item.contingencyActions?.map(

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

                  Open Recovery Planning

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
