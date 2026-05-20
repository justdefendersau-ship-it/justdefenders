"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ExpeditionMissionControlDashboard.tsx
//
// Timestamp:
// 12 May 2026 06:15 (Sydney)
//
// PURPOSE:
// Expedition mission control dashboard
// =====================================================

import React
from "react"

import {

  getMissionControlOperations,
  getMissionControlReadinessIndex

}
from "../../lib/parts-intelligence/expeditionMissionControlEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ExpeditionMissionControlDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const missions =
    getMissionControlOperations()

  const readiness =
    getMissionControlReadinessIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-mission-shell">

      <div className="jd-mission-header">

        Expedition Mission Control

      </div>

      <div className="jd-mission-subtitle">

        Real-time expedition command,
        operational escalation management and
        mission-level telemetry orchestration

      </div>

      {/* ============================================= */}
      {/* READINESS */}
      {/* ============================================= */}

      <div className="jd-mission-readiness">

        Mission Control Readiness Index:

        {" "}

        <strong>

          {readiness}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-mission-grid">

        {

          missions.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-mission-card"
              >

                <div className="jd-mission-top">

                  <div>

                    <div className="jd-mission-name">

                      {item.missionName}

                    </div>

                    <div className="jd-mission-state">

                      {

                        item.missionState

                      }

                    </div>

                  </div>

                  <div className="jd-mission-score">

                    {

                      item.operationalReadiness

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-mission-metric">

                  Telemetry Integrity:

                  {" "}

                  <strong>

                    {

                      item.telemetryIntegrity

                    }%

                  </strong>

                </div>

                <div className="jd-mission-metric">

                  Logistics Readiness:

                  {" "}

                  <strong>

                    {

                      item.logisticsReadiness

                    }%

                  </strong>

                </div>

                <div className="jd-mission-metric">

                  Environmental Severity:

                  {" "}

                  <strong>

                    {

                      item.environmentalSeverity

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* ESCALATIONS */}
                {/* =============================== */}

                <div className="jd-mission-section">

                  <div className="jd-mission-section-title">

                    Active Escalations

                  </div>

                  <ul>

                    {

                      item.activeEscalations?.map(

                        (
                          escalation:string,
                          escalationIdx:number
                        )=>(

                          <li key={escalationIdx}>

                            {escalation}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* COMMAND ACTIONS */}
                {/* =============================== */}

                <div className="jd-mission-section">

                  <div className="jd-mission-section-title">

                    Command Actions

                  </div>

                  <ul>

                    {

                      item.commandActions?.map(

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

                  Open Mission Control

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
