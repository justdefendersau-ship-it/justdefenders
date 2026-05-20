"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/QuantumFederationPanel.tsx

   Timestamp:
   14 May 2026 11:30 (Sydney)

   PURPOSE:
   Quantum federation visualisation
===================================================== */

import React from "react"

import {

  getQuantumFederation

}
from "../../lib/quantum-federation/quantumFederationEngine"

export default function QuantumFederationPanel(){

  const quantum =
    getQuantumFederation()

  return (

    <div className="jd-qf-shell">

      <div className="jd-qf-header">

        INFINITE EXPEDITION QUANTUM FEDERATION

      </div>

      {

        quantum.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-qf-card ${node.quantumState}`}
            >

              <div className="jd-qf-top">

                <div>

                  <div className="jd-qf-domain">

                    {node.quantumDomain}

                  </div>

                  <div className="jd-qf-density">

                    Quantum Density:
                    {" "}
                    {node.quantumDensity}%

                  </div>

                </div>

                <div className="jd-qf-state">

                  {node.quantumState}

                </div>

              </div>

              <div className="jd-qf-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionQuantum}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityQuantum}%

                </div>

                <div>

                  Quantum AI:
                  {" "}
                  {node.aiQuantumConfidence}%

                </div>

              </div>

              <div className="jd-qf-actions">

                {

                  node.autonomousQuantumActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-qf-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              <div className="jd-qf-patterns">

                {

                  node.quantumPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-qf-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              <div className="jd-qf-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
