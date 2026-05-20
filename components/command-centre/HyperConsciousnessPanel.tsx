"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/HyperConsciousnessPanel.tsx

   Timestamp:
   14 May 2026 09:15 (Sydney)

   PURPOSE:
   Hyper-consciousness visualisation
===================================================== */

import React from "react"

import {

  getHyperConsciousness

}
from "../../lib/hyper-consciousness/hyperConsciousnessEngine"

export default function HyperConsciousnessPanel(){

  const hyper =
    getHyperConsciousness()

  return (

    <div className="jd-hyper-shell">

      <div className="jd-hyper-header">

        INFINITE EXPEDITION HYPER-CONSCIOUSNESS

      </div>

      {

        hyper.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-hyper-card ${node.hyperState}`}
            >

              <div className="jd-hyper-top">

                <div>

                  <div className="jd-hyper-domain">

                    {node.hyperDomain}

                  </div>

                  <div className="jd-hyper-density">

                    Hyper Density:
                    {" "}
                    {node.hyperDensity}%

                  </div>

                </div>

                <div className="jd-hyper-state">

                  {node.hyperState}

                </div>

              </div>

              <div className="jd-hyper-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionHyper}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityHyper}%

                </div>

                <div>

                  Hyper AI:
                  {" "}
                  {node.aiHyperConfidence}%

                </div>

              </div>

              <div className="jd-hyper-actions">

                {

                  node.autonomousHyperActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-hyper-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              <div className="jd-hyper-patterns">

                {

                  node.hyperPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-hyper-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              <div className="jd-hyper-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
