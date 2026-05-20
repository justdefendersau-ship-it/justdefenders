"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/AutonomousExpeditionGovernanceDashboard.tsx
//
// Timestamp:
// 12 May 2026 15:15 (Sydney)
//
// PURPOSE:
// Autonomous expedition governance dashboard
// =====================================================

import React
from "react"

import {

  getAutonomousGovernanceStates,
  getGovernanceConfidenceIndex

}
from "../../lib/parts-intelligence/autonomousExpeditionGovernanceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function AutonomousExpeditionGovernanceDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const governance =
    getAutonomousGovernanceStates()

  const governanceIndex =
    getGovernanceConfidenceIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-governance-shell">

      <div className="jd-governance-header">

        Autonomous Expedition Governance Engine

      </div>

      <div className="jd-governance-subtitle">

        Autonomous operational governance,
        AI policy orchestration and
        expedition authority intelligence

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-governance-index">

        Governance Confidence Index:

        {" "}

        <strong>

          {governanceIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-governance-grid">

        {

          governance.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-governance-card"
              >

                <div className="jd-governance-top">

                  <div>

                    <div className="jd-governance-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-governance-state">

                      {

                        item.governanceState

                      }

                    </div>

                  </div>

                  <div className="jd-governance-confidence">

                    {

                      item.aiGovernanceConfidence

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-governance-metric">

                  Operational Compliance:

                  {" "}

                  <strong>

                    {

                      item.operationalComplianceIndex

                    }%

                  </strong>

                </div>

                <div className="jd-governance-metric">

                  Survivability Governance:

                  {" "}

                  <strong>

                    {

                      item.survivabilityGovernanceIndex

                    }%

                  </strong>

                </div>

                <div className="jd-governance-metric">

                  Logistics Governance:

                  {" "}

                  <strong>

                    {

                      item.logisticsGovernanceIndex

                    }%

                  </strong>

                </div>

                <div className="jd-governance-metric">

                  Policy Escalation Probability:

                  {" "}

                  <strong>

                    {

                      item.policyEscalationProbability

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-governance-section">

                  <div className="jd-governance-section-title">

                    Governance Actions

                  </div>

                  <ul>

                    {

                      item.governanceActions?.map(

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
                {/* FORECASTS */}
                {/* =============================== */}

                <div className="jd-governance-section">

                  <div className="jd-governance-section-title">

                    Autonomous Forecasts

                  </div>

                  <ul>

                    {

                      item.autonomousForecasts?.map(

                        (
                          forecast:string,
                          forecastIdx:number
                        )=>(

                          <li key={forecastIdx}>

                            {forecast}

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

                  Open Governance Engine

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
