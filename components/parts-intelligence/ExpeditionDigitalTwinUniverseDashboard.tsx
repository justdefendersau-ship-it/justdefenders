"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ExpeditionDigitalTwinUniverseDashboard.tsx
//
// Timestamp:
// 12 May 2026 14:30 (Sydney)
//
// PURPOSE:
// Expedition digital twin universe dashboard
// =====================================================

import React
from "react"

import {

  getExpeditionDigitalTwins,
  getDigitalTwinConfidenceIndex

}
from "../../lib/parts-intelligence/expeditionDigitalTwinUniverseEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ExpeditionDigitalTwinUniverseDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const twins =
    getExpeditionDigitalTwins()

  const twinIndex =
    getDigitalTwinConfidenceIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-twin-shell">

      <div className="jd-twin-header">

        Expedition Digital Twin Universe

      </div>

      <div className="jd-twin-subtitle">

        Real-time operational mirroring,
        predictive simulation intelligence and
        autonomous expedition behavioural modelling

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-twin-index">

        Digital Twin Confidence Index:

        {" "}

        <strong>

          {twinIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-twin-grid">

        {

          twins.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-twin-card"
              >

                <div className="jd-twin-top">

                  <div>

                    <div className="jd-twin-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-twin-state">

                      {

                        item.twinState

                      }

                    </div>

                  </div>

                  <div className="jd-twin-confidence">

                    {

                      item.autonomousSimulationConfidence

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-twin-metric">

                  Mirror Accuracy:

                  {" "}

                  <strong>

                    {

                      item.operationalMirrorAccuracy

                    }%

                  </strong>

                </div>

                <div className="jd-twin-metric">

                  Survivability Simulation:

                  {" "}

                  <strong>

                    {

                      item.survivabilitySimulationAccuracy

                    }%

                  </strong>

                </div>

                <div className="jd-twin-metric">

                  Logistics Simulation:

                  {" "}

                  <strong>

                    {

                      item.logisticsSimulationAccuracy

                    }%

                  </strong>

                </div>

                <div className="jd-twin-metric">

                  Behaviour Prediction:

                  {" "}

                  <strong>

                    {

                      item.behaviouralPredictionAccuracy

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* SCENARIOS */}
                {/* =============================== */}

                <div className="jd-twin-section">

                  <div className="jd-twin-section-title">

                    Predictive Scenarios

                  </div>

                  <ul>

                    {

                      item.predictiveScenarios?.map(

                        (
                          scenario:string,
                          scenarioIdx:number
                        )=>(

                          <li key={scenarioIdx}>

                            {scenario}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* FORECASTS */}
                {/* =============================== */}

                <div className="jd-twin-section">

                  <div className="jd-twin-section-title">

                    Neural Twin Forecasts

                  </div>

                  <ul>

                    {

                      item.neuralTwinForecasts?.map(

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

                  Open Digital Twin

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
