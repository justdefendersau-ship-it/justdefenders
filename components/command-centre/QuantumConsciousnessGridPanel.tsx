"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/QuantumConsciousnessGridPanel.tsx

   Timestamp:
   14 May 2026 14:30 (Sydney)

   PURPOSE:
   Quantum consciousness grid visualisation
===================================================== */

import React from "react"

import {

  getQuantumConsciousnessGrid

}
from "../../lib/quantum-grid/quantumConsciousnessGridEngine"

export default function QuantumConsciousnessGridPanel(){

  const grid =
    getQuantumConsciousnessGrid()

  return (

    <div className="jd-qcg-shell">

      <div className="jd-qcg-header">

        INFINITE QUANTUM CONSCIOUSNESS GRID

      </div>

      {

        grid.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-qcg-card ${node.gridState}`}
            >

              <div className="jd-qcg-top">

                <div>

                  <div className="jd-qcg-domain">

                    {node.gridDomain}

                  </div>

                  <div className="jd-qcg-density">

                    Grid Density:
                    {" "}
                    {node.gridDensity}%

                  </div>

                </div>

                <div className="jd-qcg-state">

                  {node.gridState}

                </div>

              </div>

              <div className="jd-qcg-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionGrid}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityGrid}%

                </div>

                <div>

                  Grid AI:
                  {" "}
                  {node.aiGridConfidence}%

                </div>

              </div>

              <div className="jd-qcg-actions">

                {

                  node.autonomousGridActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-qcg-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              <div className="jd-qcg-patterns">

                {

                  node.gridPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-qcg-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              <div className="jd-qcg-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
