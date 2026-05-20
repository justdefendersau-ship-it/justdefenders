"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ProcurementRecommendationAIDashboard.tsx
//
// Timestamp:
// 11 May 2026 22:00 (Sydney)
//
// PURPOSE:
// Procurement recommendation AI dashboard
// =====================================================

import React
from "react"

import {

  getProcurementRecommendations,
  getAverageRecommendationConfidence

}
from "../../lib/parts-intelligence/procurementRecommendationAIEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ProcurementRecommendationAIDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const recommendations =
    getProcurementRecommendations()

  const confidence =
    getAverageRecommendationConfidence()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-ai-shell">

      <div className="jd-ai-header">

        Procurement Recommendation AI

      </div>

      <div className="jd-ai-subtitle">

        Explainable expedition procurement
        intelligence and operational
        recommendation orchestration

      </div>

      {/* ============================================= */}
      {/* CONFIDENCE */}
      {/* ============================================= */}

      <div className="jd-ai-confidence">

        Recommendation Confidence:

        {" "}

        <strong>

          {

            Math.round(
              confidence * 100
            )

          }%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-ai-grid">

        {

          recommendations.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-ai-card"
              >

                <div className="jd-ai-top">

                  <div>

                    <div className="jd-ai-vehicle">

                      {item.vehicleModel}

                    </div>

                    <div className="jd-ai-route">

                      {item.expeditionRoute}

                    </div>

                  </div>

                  <div className="jd-ai-priority">

                    {

                      item.operationalPriority

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* SUPPLIER */}
                {/* =============================== */}

                <div className="jd-ai-meta">

                  Recommended Supplier:

                  {" "}

                  <strong>

                    {

                      item.recommendedSupplier

                    }

                  </strong>

                </div>

                {/* =============================== */}
                {/* BUDGET */}
                {/* =============================== */}

                <div className="jd-ai-meta">

                  Estimated Budget:

                  {" "}

                  <strong>

                    $

                    {

                      item.estimatedBudget

                    }

                  </strong>

                </div>

                {/* =============================== */}
                {/* PARTS */}
                {/* =============================== */}

                <div className="jd-ai-tags">

                  {

                    item.recommendedParts?.map(

                      (
                        part:string,
                        partIdx:number
                      )=>(

                        <div
                          key={partIdx}
                          className="jd-ai-tag"
                        >

                          {part}

                        </div>
                      )
                    )
                  }

                </div>

                {/* =============================== */}
                {/* REASONING */}
                {/* =============================== */}

                <div className="jd-ai-section">

                  <div className="jd-ai-section-title">

                    Explainable Reasoning

                  </div>

                  <ul>

                    {

                      item.recommendationReasoning?.map(

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

                  Open Recommendation

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
