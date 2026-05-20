"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/PredictiveLogisticsOptimisationDashboard.tsx
//
// Timestamp:
// 12 May 2026 04:45 (Sydney)
//
// PURPOSE:
// Predictive logistics optimisation dashboard
// =====================================================

import React
from "react"

import {

  getPredictiveLogistics,
  getAverageLogisticsHealth

}
from "../../lib/parts-intelligence/predictiveLogisticsOptimisationEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function PredictiveLogisticsOptimisationDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const logistics =
    getPredictiveLogistics()

  const health =
    getAverageLogisticsHealth()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-logistics-shell">

      <div className="jd-logistics-header">

        Predictive Logistics Optimisation

      </div>

      <div className="jd-logistics-subtitle">

        Expedition logistics forecasting,
        remote resupply intelligence and
        predictive operational optimisation

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-logistics-health">

        Logistics Readiness Index:

        {" "}

        <strong>

          {health}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-logistics-grid">

        {

          logistics.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-logistics-card"
              >

                <div className="jd-logistics-top">

                  <div>

                    <div className="jd-logistics-route">

                      {item.expeditionRoute}

                    </div>

                    <div className="jd-logistics-state">

                      {

                        item.logisticsState

                      }

                    </div>

                  </div>

                  <div className="jd-logistics-difficulty">

                    {

                      item.environmentalDifficulty

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* RESERVES */}
                {/* =============================== */}

                <div className="jd-logistics-metric">

                  Fuel Reserve:

                  {" "}

                  <strong>

                    {

                      item.fuelReservePercentage

                    }%

                  </strong>

                </div>

                <div className="jd-logistics-metric">

                  Water Reserve:

                  {" "}

                  <strong>

                    {

                      item.waterReservePercentage

                    }%

                  </strong>

                </div>

                <div className="jd-logistics-metric">

                  Spare Coverage:

                  {" "}

                  <strong>

                    {

                      item.sparePartsCoverage

                    }%

                  </strong>

                </div>

                <div className="jd-logistics-metric">

                  Resupply Window:

                  {" "}

                  <strong>

                    {

                      item.projectedResupplyWindowKm

                    }

                    km

                  </strong>

                </div>

                {/* =============================== */}
                {/* RECOMMENDATIONS */}
                {/* =============================== */}

                <div className="jd-logistics-section">

                  <div className="jd-logistics-section-title">

                    Optimisation Recommendations

                  </div>

                  <ul>

                    {

                      item.optimisationRecommendations?.map(

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
                {/* ESCALATIONS */}
                {/* =============================== */}

                <div className="jd-logistics-section">

                  <div className="jd-logistics-section-title">

                    Escalation Triggers

                  </div>

                  <ul>

                    {

                      item.escalationTriggers?.map(

                        (
                          trigger:string,
                          triggerIdx:number
                        )=>(

                          <li key={triggerIdx}>

                            {trigger}

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

                  Open Logistics Intelligence

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
