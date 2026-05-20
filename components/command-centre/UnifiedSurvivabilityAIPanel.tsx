"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UnifiedSurvivabilityAIPanel.tsx

   Timestamp:
   13 May 2026 13:45 (Sydney)

   PURPOSE:
   Unified survivability AI visualisation
===================================================== */

import React from "react"

import {

  getUnifiedSurvivabilityAI

}
from "../../lib/survivability/unifiedSurvivabilityAIEngine"

export default function UnifiedSurvivabilityAIPanel(){

  const cognition =
    getUnifiedSurvivabilityAI()

  return (

    <div className="jd-surv-shell">

      <div className="jd-surv-header">

        UNIFIED GLOBAL SURVIVABILITY AI

      </div>

      {

        cognition.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-surv-card ${node.cognitionState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-surv-top">

                <div>

                  <div className="jd-surv-sector">

                    {node.globalSector}

                  </div>

                  <div className="jd-surv-threats">

                    Threat Vectors:
                    {" "}
                    {node.activeThreatVectors}

                  </div>

                </div>

                <div className="jd-surv-state">

                  {node.cognitionState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-surv-grid">

                <div>

                  Survivability:
                  {" "}
                  {node.globalSurvivabilityIndex}%

                </div>

                <div>

                  Predictive:
                  {" "}
                  {node.predictiveAccuracy}%

                </div>

                <div>

                  Consensus:
                  {" "}
                  {node.aiConsensusConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* RESPONSES */}
              {/* ============================= */}

              <div className="jd-surv-responses">

                {

                  node.autonomousResponses?.map(

                    (
                      response:string,
                      responseIdx:number
                    )=>(

                      <div
                        key={responseIdx}
                        className="jd-surv-response"
                      >

                        {response}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* PATTERNS */}
              {/* ============================= */}

              <div className="jd-surv-patterns">

                {

                  node.cognitionPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-surv-pill"
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

              <div className="jd-surv-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
