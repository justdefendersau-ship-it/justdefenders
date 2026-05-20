"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/GlobalRecoveryCoordinationDashboard.tsx
//
// Timestamp:
// 12 May 2026 07:45 (Sydney)
//
// PURPOSE:
// Global recovery coordination dashboard
// =====================================================

import React
from "react"

import {

  getGlobalRecoveryOperations,
  getRecoveryReadinessIndex

}
from "../../lib/parts-intelligence/globalRecoveryCoordinationEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function GlobalRecoveryCoordinationDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const recoveries =
    getGlobalRecoveryOperations()

  const readiness =
    getRecoveryReadinessIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-recovery-shell">

      <div className="jd-recovery-header">

        Global Recovery Coordination

      </div>

      <div className="jd-recovery-subtitle">

        Expedition recovery orchestration,
        emergency response coordination and
        remote operational recovery intelligence

      </div>

      {/* ============================================= */}
      {/* READINESS */}
      {/* ============================================= */}

      <div className="jd-recovery-readiness">

        Recovery Readiness Index:

        {" "}

        <strong>

          {readiness}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-recovery-grid">

        {

          recoveries.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-recovery-card"
              >

                <div className="jd-recovery-top">

                  <div>

                    <div className="jd-recovery-name">

                      {item.recoveryMissionName}

                    </div>

                    <div className="jd-recovery-region">

                      {item.expeditionRegion}

                    </div>

                  </div>

                  <div className="jd-recovery-state">

                    {

                      item.recoveryState

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-recovery-metric">

                  Recovery Readiness:

                  {" "}

                  <strong>

                    {

                      item.recoveryReadiness

                    }%

                  </strong>

                </div>

                <div className="jd-recovery-metric">

                  Communications Integrity:

                  {" "}

                  <strong>

                    {

                      item.communicationsIntegrity

                    }%

                  </strong>

                </div>

                <div className="jd-recovery-metric">

                  Environmental Severity:

                  {" "}

                  <strong>

                    {

                      item.environmentalSeverity

                    }%

                  </strong>

                </div>

                <div className="jd-recovery-metric">

                  Nearest Recovery Distance:

                  {" "}

                  <strong>

                    {

                      item.nearestRecoveryDistanceKm

                    }

                    km

                  </strong>

                </div>

                {/* =============================== */}
                {/* THREATS */}
                {/* =============================== */}

                <div className="jd-recovery-section">

                  <div className="jd-recovery-section-title">

                    Active Recovery Threats

                  </div>

                  <ul>

                    {

                      item.activeRecoveryThreats?.map(

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

                <div className="jd-recovery-section">

                  <div className="jd-recovery-section-title">

                    Recovery Actions

                  </div>

                  <ul>

                    {

                      item.recoveryActions?.map(

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

                  Open Recovery Coordination

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
