"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ExpeditionOperationalEconomicsDashboard.tsx
//
// Timestamp:
// 12 May 2026 12:15 (Sydney)
//
// PURPOSE:
// Expedition operational economics dashboard
// =====================================================

import React
from "react"

import {

  getOperationalEconomics,
  getOperationalEconomicsIndex

}
from "../../lib/parts-intelligence/expeditionOperationalEconomicsEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ExpeditionOperationalEconomicsDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const economics =
    getOperationalEconomics()

  const economicsIndex =
    getOperationalEconomicsIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-economics-shell">

      <div className="jd-economics-header">

        Expedition Operational Economics

      </div>

      <div className="jd-economics-subtitle">

        AI operational cost intelligence,
        survivability expenditure modelling and
        expedition economic optimisation

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-economics-index">

        Operational Economics Index:

        {" "}

        <strong>

          {economicsIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-economics-grid">

        {

          economics.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-economics-card"
              >

                <div className="jd-economics-top">

                  <div>

                    <div className="jd-economics-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-economics-state">

                      {

                        item.economicState

                      }

                    </div>

                  </div>

                  <div className="jd-economics-risk">

                    {

                      item.financialRiskProbability

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* COSTS */}
                {/* =============================== */}

                <div className="jd-economics-metric">

                  Fuel Cost:

                  {" "}

                  <strong>

                    ${item.projectedFuelCostAud}

                  </strong>

                </div>

                <div className="jd-economics-metric">

                  Recovery Cost:

                  {" "}

                  <strong>

                    ${item.projectedRecoveryCostAud}

                  </strong>

                </div>

                <div className="jd-economics-metric">

                  Logistics Cost:

                  {" "}

                  <strong>

                    ${item.projectedLogisticsCostAud}

                  </strong>

                </div>

                <div className="jd-economics-metric">

                  Maintenance Cost:

                  {" "}

                  <strong>

                    ${item.projectedMaintenanceCostAud}

                  </strong>

                </div>

                {/* =============================== */}
                {/* THREATS */}
                {/* =============================== */}

                <div className="jd-economics-section">

                  <div className="jd-economics-section-title">

                    Economic Threats

                  </div>

                  <ul>

                    {

                      item.economicThreats?.map(

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
                {/* OPTIMISATION */}
                {/* =============================== */}

                <div className="jd-economics-section">

                  <div className="jd-economics-section-title">

                    Optimisation Strategies

                  </div>

                  <ul>

                    {

                      item.optimisationStrategies?.map(

                        (
                          strategy:string,
                          strategyIdx:number
                        )=>(

                          <li key={strategyIdx}>

                            {strategy}

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

                  Open Economics Intelligence

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
