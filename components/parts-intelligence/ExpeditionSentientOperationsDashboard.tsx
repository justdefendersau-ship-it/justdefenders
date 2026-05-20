"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ExpeditionSentientOperationsDashboard.tsx
//
// Timestamp:
// 12 May 2026 17:30 (Sydney)
//
// PURPOSE:
// Expedition sentient operations dashboard
// =====================================================

import React
from "react"

import {

  getSentientOperations,
  getSentientAwarenessIndex

}
from "../../lib/parts-intelligence/expeditionSentientOperationsEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ExpeditionSentientOperationsDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const sentient =
    getSentientOperations()

  const awarenessIndex =
    getSentientAwarenessIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-sentient-shell">

      <div className="jd-sentient-header">

        Expedition Sentient Operations Layer

      </div>

      <div className="jd-sentient-subtitle">

        Autonomous operational awareness,
        expedition behavioural cognition and
        sentient mission orchestration

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-sentient-index">

        Sentient Awareness Index:

        {" "}

        <strong>

          {awarenessIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-sentient-grid">

        {

          sentient.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-sentient-card"
              >

                <div className="jd-sentient-top">

                  <div>

                    <div className="jd-sentient-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-sentient-state">

                      {

                        item.sentientState

                      }

                    </div>

                  </div>

                  <div className="jd-sentient-awareness">

                    {

                      item.operationalAwarenessIndex

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-sentient-metric">

                  Behaviour Adaptation:

                  {" "}

                  <strong>

                    {

                      item.behaviouralAdaptationIndex

                    }%

                  </strong>

                </div>

                <div className="jd-sentient-metric">

                  Survivability Awareness:

                  {" "}

                  <strong>

                    {

                      item.survivabilityAwarenessIndex

                    }%

                  </strong>

                </div>

                <div className="jd-sentient-metric">

                  Logistics Awareness:

                  {" "}

                  <strong>

                    {

                      item.logisticsAwarenessIndex

                    }%

                  </strong>

                </div>

                <div className="jd-sentient-metric">

                  Autonomous Intervention:

                  {" "}

                  <strong>

                    {

                      item.autonomousInterventionProbability

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* BEHAVIOURS */}
                {/* =============================== */}

                <div className="jd-sentient-section">

                  <div className="jd-sentient-section-title">

                    Adaptive Behaviours

                  </div>

                  <ul>

                    {

                      item.adaptiveBehaviours?.map(

                        (
                          behaviour:string,
                          behaviourIdx:number
                        )=>(

                          <li key={behaviourIdx}>

                            {behaviour}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* FORECASTS */}
                {/* =============================== */}

                <div className="jd-sentient-section">

                  <div className="jd-sentient-section-title">

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

                  Open Sentient Operations

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
