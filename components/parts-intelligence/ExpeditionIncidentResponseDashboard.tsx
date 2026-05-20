"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ExpeditionIncidentResponseDashboard.tsx
//
// Timestamp:
// 12 May 2026 10:00 (Sydney)
//
// PURPOSE:
// Expedition incident response dashboard
// =====================================================

import React
from "react"

import {

  getExpeditionIncidentResponses,
  getIncidentResponseReadinessIndex

}
from "../../lib/parts-intelligence/expeditionIncidentResponseEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ExpeditionIncidentResponseDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const incidents =
    getExpeditionIncidentResponses()

  const readiness =
    getIncidentResponseReadinessIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-incident-shell">

      <div className="jd-incident-header">

        Expedition Incident Response Intelligence

      </div>

      <div className="jd-incident-subtitle">

        Real-time emergency response orchestration,
        expedition survivability coordination and
        incident escalation intelligence

      </div>

      {/* ============================================= */}
      {/* READINESS */}
      {/* ============================================= */}

      <div className="jd-incident-readiness">

        Incident Response Readiness Index:

        {" "}

        <strong>

          {readiness}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-incident-grid">

        {

          incidents.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-incident-card"
              >

                <div className="jd-incident-top">

                  <div>

                    <div className="jd-incident-name">

                      {item.incidentName}

                    </div>

                    <div className="jd-incident-route">

                      {item.expeditionRoute}

                    </div>

                  </div>

                  <div className="jd-incident-severity">

                    {

                      item.incidentSeverity

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-incident-metric">

                  Survivability Index:

                  {" "}

                  <strong>

                    {

                      item.survivabilityIndex

                    }%

                  </strong>

                </div>

                <div className="jd-incident-metric">

                  Response Readiness:

                  {" "}

                  <strong>

                    {

                      item.responseReadiness

                    }%

                  </strong>

                </div>

                <div className="jd-incident-metric">

                  Evacuation Complexity:

                  {" "}

                  <strong>

                    {

                      item.evacuationComplexity

                    }%

                  </strong>

                </div>

                <div className="jd-incident-metric">

                  Communications Integrity:

                  {" "}

                  <strong>

                    {

                      item.communicationsIntegrity

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* THREATS */}
                {/* =============================== */}

                <div className="jd-incident-section">

                  <div className="jd-incident-section-title">

                    Active Incident Threats

                  </div>

                  <ul>

                    {

                      item.activeIncidentThreats?.map(

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

                <div className="jd-incident-section">

                  <div className="jd-incident-section-title">

                    Emergency Actions

                  </div>

                  <ul>

                    {

                      item.emergencyActions?.map(

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

                  Open Incident Command

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
