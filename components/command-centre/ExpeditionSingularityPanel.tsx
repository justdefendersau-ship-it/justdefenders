"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/ExpeditionSingularityPanel.tsx

   Timestamp:
   13 May 2026 21:15 (Sydney)

   PURPOSE:
   Expedition singularity visualisation
===================================================== */

import React from "react"

import {

  getExpeditionSingularity

}
from "../../lib/singularity/expeditionSingularityEngine"

export default function ExpeditionSingularityPanel(){

  const singularity =
    getExpeditionSingularity()

  return (

    <div className="jd-sig-shell">

      <div className="jd-sig-header">

        EXPEDITION SINGULARITY FRAMEWORK

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

                    Cognition Density:
                    {" "}
                    {node.cognitionDensity}%

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

                  Optimisation:
                  {" "}
                  {node.infiniteOptimisationIndex}%

                </div>

                <div>

                  Convergence:
                  {" "}
                  {node.survivabilityConvergence}%

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

                  node.convergencePatterns?.map(

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
