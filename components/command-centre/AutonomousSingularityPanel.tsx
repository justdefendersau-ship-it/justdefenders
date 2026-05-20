"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/AutonomousSingularityPanel.tsx

   Timestamp:
   14 May 2026 04:00 (Sydney)

   PURPOSE:
   Autonomous expedition singularity visualisation
===================================================== */

import React from "react"

import {

  getExpeditionSingularity

}
from "../../lib/singularity/expeditionSingularityEngine"

export default function AutonomousSingularityPanel(){

  const singularity =
    getExpeditionSingularity()

  return (

    <div className="jd-sig-shell">

      <div className="jd-sig-header">

        AUTONOMOUS INFINITE EXPEDITION SINGULARITY

      </div>

      {

        singularity.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-sig-card ${node.singularityState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-sig-top">

                <div>

                  <div className="jd-sig-domain">

                    {node.singularityDomain}

                  </div>

                  <div className="jd-sig-density">

                    Singularity Density:
                    {" "}
                    {node.singularityDensity}%

                  </div>

                </div>

                <div className="jd-sig-state">

                  {node.singularityState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-sig-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionSingularity}%

                </div>

                <div>

                  Continuity:
                  {" "}
                  {node.transcendenceContinuity}%

                </div>

                <div>

                  Singularity AI:
                  {" "}
                  {node.aiSingularityConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-sig-actions">

                {

                  node.autonomousSingularityActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-sig-action"
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

              <div className="jd-sig-patterns">

                {

                  node.singularityPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-sig-pill"
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

              <div className="jd-sig-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
