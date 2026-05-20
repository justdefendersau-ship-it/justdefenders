"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/MetaSurvivabilityOrchestrationPanel.tsx

   Timestamp:
   14 May 2026 01:00 (Sydney)

   PURPOSE:
   Meta survivability orchestration visualisation
===================================================== */

import React from "react"

import {

  getMetaOrchestration

}
from "../../lib/meta/metaSurvivabilityOrchestrationEngine"

export default function MetaSurvivabilityOrchestrationPanel(){

  const orchestration =
    getMetaOrchestration()

  return (

    <div className="jd-meta-shell">

      <div className="jd-meta-header">

        INFINITE META-SURVIVABILITY ORCHESTRATION

      </div>

      {

        orchestration.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-meta-card ${node.orchestrationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-meta-top">

                <div>

                  <div className="jd-meta-domain">

                    {node.orchestrationDomain}

                  </div>

                  <div className="jd-meta-density">

                    Orchestration Density:
                    {" "}
                    {node.orchestrationDensity}%

                  </div>

                </div>

                <div className="jd-meta-state">

                  {node.orchestrationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-meta-grid">

                <div>

                  Harmony:
                  {" "}
                  {node.resilienceHarmony}%

                </div>

                <div>

                  Continuity:
                  {" "}
                  {node.survivabilityContinuity}%

                </div>

                <div>

                  Orchestration AI:
                  {" "}
                  {node.aiOrchestrationConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-meta-actions">

                {

                  node.autonomousOrchestrationActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-meta-action"
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

              <div className="jd-meta-patterns">

                {

                  node.orchestrationPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-meta-pill"
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

              <div className="jd-meta-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
