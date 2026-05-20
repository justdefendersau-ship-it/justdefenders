"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/GlobalExpeditionNeuralIntelligenceDashboard.tsx
//
// Timestamp:
// 12 May 2026 16:00 (Sydney)
//
// PURPOSE:
// Global expedition neural intelligence dashboard
// =====================================================

import React
from "react"

import {

  getGlobalNeuralIntelligence,
  getNeuralIntelligenceIndex

}
from "../../lib/parts-intelligence/globalExpeditionNeuralIntelligenceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function GlobalExpeditionNeuralIntelligenceDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const neural =
    getGlobalNeuralIntelligence()

  const neuralIndex =
    getNeuralIntelligenceIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-neural-shell">

      <div className="jd-neural-header">

        Global Expedition Neural Intelligence Core

      </div>

      <div className="jd-neural-subtitle">

        Autonomous expedition cognition,
        neural orchestration intelligence and
        predictive reasoning fusion

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-neural-index">

        Neural Intelligence Index:

        {" "}

        <strong>

          {neuralIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-neural-grid">

        {

          neural.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-neural-card"
              >

                <div className="jd-neural-top">

                  <div>

                    <div className="jd-neural-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-neural-state">

                      {

                        item.neuralState

                      }

                    </div>

                  </div>

                  <div className="jd-neural-confidence">

                    {

                      item.neuralConfidence

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-neural-metric">

                  Reasoning Correlation:

                  {" "}

                  <strong>

                    {

                      item.reasoningCorrelationIndex

                    }%

                  </strong>

                </div>

                <div className="jd-neural-metric">

                  Operational Learning:

                  {" "}

                  <strong>

                    {

                      item.operationalLearningIndex

                    }%

                  </strong>

                </div>

                <div className="jd-neural-metric">

                  Survivability Learning:

                  {" "}

                  <strong>

                    {

                      item.survivabilityLearningIndex

                    }%

                  </strong>

                </div>

                <div className="jd-neural-metric">

                  Logistics Learning:

                  {" "}

                  <strong>

                    {

                      item.logisticsLearningIndex

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* REASONING */}
                {/* =============================== */}

                <div className="jd-neural-section">

                  <div className="jd-neural-section-title">

                    Autonomous Reasoning

                  </div>

                  <ul>

                    {

                      item.autonomousReasoning?.map(

                        (
                          reasoning:string,
                          reasoningIdx:number
                        )=>(

                          <li key={reasoningIdx}>

                            {reasoning}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* FORECASTS */}
                {/* =============================== */}

                <div className="jd-neural-section">

                  <div className="jd-neural-section-title">

                    Cognition Forecasts

                  </div>

                  <ul>

                    {

                      item.cognitionForecasts?.map(

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

                  Open Neural Intelligence

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
