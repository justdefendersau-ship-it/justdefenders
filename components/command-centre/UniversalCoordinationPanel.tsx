"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UniversalCoordinationPanel.tsx

   Timestamp:
   13 May 2026 20:30 (Sydney)

   PURPOSE:
   Universal coordination visualisation
===================================================== */

import React from "react"

import {

  getUniversalCoordination

}
from "../../lib/coordination/universalCoordinationCoreEngine"

export default function UniversalCoordinationPanel(){

  const coordination =
    getUniversalCoordination()

  return (

    <div className="jd-core-shell">

      <div className="jd-core-header">

        AUTONOMOUS UNIVERSAL COORDINATION CORE

      </div>

      {

        coordination.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-core-card ${node.coordinationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-core-top">

                <div>

                  <div className="jd-core-domain">

                    {node.coordinationDomain}

                  </div>

                  <div className="jd-core-nodes">

                    Federation Nodes:
                    {" "}
                    {node.federationNodes}

                  </div>

                </div>

                <div className="jd-core-state">

                  {node.coordinationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-core-grid">

                <div>

                  Integrity:
                  {" "}
                  {node.synchronisationIntegrity}%

                </div>

                <div>

                  Balance:
                  {" "}
                  {node.survivabilityBalance}%

                </div>

                <div>

                  Coordination AI:
                  {" "}
                  {node.aiCoordinationConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-core-actions">

                {

                  node.autonomousCoordinationActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-core-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* PATTERNS */}
              {/* ============================= */}

              <div className="jd-core-patterns">

                {

                  node.convergencePatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-core-pill"
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

              <div className="jd-core-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
