"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/QuantumPredictivePanel.tsx

   Timestamp:
   13 May 2026 14:30 (Sydney)

   PURPOSE:
   Quantum predictive visualisation
===================================================== */

import React from "react"

import {

  getQuantumPredictionMatrices

}
from "../../lib/quantum/quantumPredictiveEngine"

export default function QuantumPredictivePanel(){

  const matrices =
    getQuantumPredictionMatrices()

  return (

    <div className="jd-quantum-shell">

      <div className="jd-quantum-header">

        QUANTUM PREDICTIVE EXPEDITION ENGINE

      </div>

      {

        matrices.map(

          (
            matrix:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-quantum-card ${matrix.quantumState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-quantum-top">

                <div>

                  <div className="jd-quantum-name">

                    {matrix.expeditionScenario}

                  </div>

                  <div className="jd-quantum-matrices">

                    Matrices:
                    {" "}
                    {matrix.activePredictionMatrices}

                  </div>

                </div>

                <div className="jd-quantum-state">

                  {matrix.quantumState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-quantum-grid">

                <div>

                  Survivability:
                  {" "}
                  {matrix.survivabilityProbability}%

                </div>

                <div>

                  Branches:
                  {" "}
                  {matrix.branchComplexity}%

                </div>

                <div>

                  Forecast Depth:
                  {" "}
                  {matrix.dimensionalForecastDepth}

                </div>

                <div>

                  Quantum AI:
                  {" "}
                  {matrix.quantumConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* PREDICTIONS */}
              {/* ============================= */}

              <div className="jd-quantum-predictions">

                {

                  matrix.autonomousPredictions?.map(

                    (
                      prediction:string,
                      predictionIdx:number
                    )=>(

                      <div
                        key={predictionIdx}
                        className="jd-quantum-prediction"
                      >

                        {prediction}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* PATTERNS */}
              {/* ============================= */}

              <div className="jd-quantum-patterns">

                {

                  matrix.dimensionalPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-quantum-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-quantum-forecast">

                {matrix.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
