"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/AutonomousExpeditionEconomicGovernanceDashboard.tsx
//
// Timestamp:
// 12 May 2026 16:45 (Sydney)
//
// PURPOSE:
// Autonomous expedition economic governance dashboard
// =====================================================

import React
from "react"

import {

  getEconomicGovernanceStates,
  getEconomicGovernanceIndex

}
from "../../lib/parts-intelligence/autonomousExpeditionEconomicGovernanceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function AutonomousExpeditionEconomicGovernanceDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const governance =
    getEconomicGovernanceStates()

  const governanceIndex =
    getEconomicGovernanceIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-economic-governance-shell">

      <div className="jd-economic-governance-header">

        Autonomous Expedition Economic Governance

      </div>

      <div className="jd-economic-governance-subtitle">

        AI expedition financial governance,
        autonomous operational optimisation and
        survivability economics orchestration

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-economic-governance-index">

        Economic Governance Index:

        {" "}

        <strong>

          {governanceIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-economic-governance-grid">

        {

          governance.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-economic-governance-card"
              >

                <div className="jd-economic-governance-top">

                  <div>

                    <div className="jd-economic-governance-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-economic-governance-state">

                      {

                        item.economicGovernanceState

                      }

                    </div>

                  </div>

                  <div className="jd-economic-governance-confidence">

                    {

                      item.aiEconomicConfidence

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-economic-governance-metric">

                  Cost Efficiency:

                  {" "}

                  <strong>

                    {

                      item.operationalCostEfficiency

                    }%

                  </strong>

                </div>

                <div className="jd-economic-governance-metric">

                  Logistics Governance:

                  {" "}

                  <strong>

                    {

                      item.logisticsCostGovernance

                    }%

                  </strong>

                </div>

                <div className="jd-economic-governance-metric">

                  Budget Alignment:

                  {" "}

                  <strong>

                    {

                      item.survivabilityBudgetAlignment

                    }%

                  </strong>

                </div>

                <div className="jd-economic-governance-metric">

                  Savings Probability:

                  {" "}

                  <strong>

                    {

                      item.autonomousSavingsProbability

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-economic-governance-section">

                  <div className="jd-economic-governance-section-title">

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

                <div className="jd-economic-governance-section">

                  <div className="jd-economic-governance-section-title">

                    Neural Economic Forecasts

                  </div>

                  <ul>

                    {

                      item.neuralEconomicForecasts?.map(

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

                  Open Economic Governance

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
