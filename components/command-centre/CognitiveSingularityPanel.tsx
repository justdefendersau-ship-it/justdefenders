"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/CognitiveSingularityPanel.tsx

   Timestamp:
   14 May 2026 12:15 (Sydney)

   PURPOSE:
   Cognitive singularity visualisation
===================================================== */

import React from "react"

import {

  getCognitiveSingularity

}
from "../../lib/cognitive-singularity/cognitiveSingularityEngine"

export default function CognitiveSingularityPanel(){

  const singularity =
    getCognitiveSingularity()

  return (

    <div className="jd-cs-shell">

      <div className="jd-cs-header">

        AUTONOMOUS INFINITE COGNITIVE SINGULARITY

      </div>

      {

        singularity.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-cs-card ${node.singularityState}`}
            >

              <div className="jd-cs-top">

                <div>

                  <div className="jd-cs-domain">

                    {node.singularityDomain}

                  </div>

                  <div className="jd-cs-density">

                    Singularity Density:
                    {" "}
                    {node.singularityDensity}%

                  </div>

                </div>

                <div className="jd-cs-state">

                  {node.singularityState}

                </div>

              </div>

              <div className="jd-cs-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionSingularity}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilitySingularity}%

                </div>

                <div>

                  Singularity AI:
                  {" "}
                  {node.aiSingularityConfidence}%

                </div>

              </div>

              <div className="jd-cs-actions">

                {

                  node.autonomousSingularityActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-cs-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              <div className="jd-cs-patterns">

                {

                  node.singularityPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-cs-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              <div className="jd-cs-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
