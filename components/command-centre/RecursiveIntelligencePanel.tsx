"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/RecursiveIntelligencePanel.tsx

   Timestamp:
   14 May 2026 10:45 (Sydney)

   PURPOSE:
   Recursive intelligence visualisation
===================================================== */

import React from "react"

import {

  getRecursiveIntelligence

}
from "../../lib/recursive-intelligence/recursiveExpeditionIntelligenceEngine"

export default function RecursiveIntelligencePanel(){

  const recursive =
    getRecursiveIntelligence()

  return (

    <div className="jd-rec-shell">

      <div className="jd-rec-header">

        INFINITE RECURSIVE EXPEDITION INTELLIGENCE

      </div>

      {

        recursive.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-rec-card ${node.recursiveState}`}
            >

              <div className="jd-rec-top">

                <div>

                  <div className="jd-rec-domain">

                    {node.recursiveDomain}

                  </div>

                  <div className="jd-rec-density">

                    Recursive Density:
                    {" "}
                    {node.recursiveDensity}%

                  </div>

                </div>

                <div className="jd-rec-state">

                  {node.recursiveState}

                </div>

              </div>

              <div className="jd-rec-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionRecursive}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityRecursive}%

                </div>

                <div>

                  Recursive AI:
                  {" "}
                  {node.aiRecursiveConfidence}%

                </div>

              </div>

              <div className="jd-rec-actions">

                {

                  node.autonomousRecursiveActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-rec-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              <div className="jd-rec-patterns">

                {

                  node.recursivePatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-rec-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              <div className="jd-rec-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
