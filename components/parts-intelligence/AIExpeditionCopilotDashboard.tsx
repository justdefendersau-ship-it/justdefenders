"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/AIExpeditionCopilotDashboard.tsx
//
// Timestamp:
// 12 May 2026 04:00 (Sydney)
//
// PURPOSE:
// AI expedition co-pilot dashboard
// =====================================================

import React
from "react"

import {

  getCopilotSessions,
  getCopilotConfidenceIndex

}
from "../../lib/parts-intelligence/aiExpeditionCopilotEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function AIExpeditionCopilotDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const sessions =
    getCopilotSessions()

  const confidence =
    getCopilotConfidenceIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-copilot-shell">

      <div className="jd-copilot-header">

        AI Expedition Co-Pilot

      </div>

      <div className="jd-copilot-subtitle">

        Conversational expedition intelligence,
        explainable operational guidance and
        mission-aware AI decision support

      </div>

      {/* ============================================= */}
      {/* CONFIDENCE */}
      {/* ============================================= */}

      <div className="jd-copilot-confidence">

        AI Operational Confidence Index:

        {" "}

        <strong>

          {confidence}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-copilot-grid">

        {

          sessions.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-copilot-card"
              >

                <div className="jd-copilot-top">

                  <div>

                    <div className="jd-copilot-vehicle">

                      {item.vehicleModel}

                    </div>

                    <div className="jd-copilot-route">

                      {item.expeditionRoute}

                    </div>

                  </div>

                  <div className="jd-copilot-state">

                    {

                      item.conversationalState

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* QUESTION */}
                {/* =============================== */}

                <div className="jd-copilot-question">

                  "{item.operationalQuestion}"

                </div>

                {/* =============================== */}
                {/* AI RESPONSE */}
                {/* =============================== */}

                <div className="jd-copilot-recommendation">

                  <strong>

                    AI Recommendation:

                  </strong>

                  {" "}

                  {item.aiRecommendation}

                </div>

                {/* =============================== */}
                {/* TELEMETRY */}
                {/* =============================== */}

                <div className="jd-copilot-section">

                  <div className="jd-copilot-section-title">

                    Supporting Telemetry

                  </div>

                  <ul>

                    {

                      item.supportingTelemetry?.map(

                        (
                          telemetry:string,
                          telemetryIdx:number
                        )=>(

                          <li key={telemetryIdx}>

                            {telemetry}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* REASONING */}
                {/* =============================== */}

                <div className="jd-copilot-section">

                  <div className="jd-copilot-section-title">

                    Explainable Reasoning

                  </div>

                  <ul>

                    {

                      item.explainableReasoning?.map(

                        (
                          reason:string,
                          reasonIdx:number
                        )=>(

                          <li key={reasonIdx}>

                            {reason}

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

                  Open Co-Pilot Session

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
