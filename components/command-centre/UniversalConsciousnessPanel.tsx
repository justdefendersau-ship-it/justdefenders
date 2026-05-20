"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UniversalConsciousnessPanel.tsx

   Timestamp:
   14 May 2026 07:00 (Sydney)

   PURPOSE:
   Universal consciousness visualisation
===================================================== */

import React from "react"

import {

  getUniversalConsciousness

}
from "../../lib/universal-consciousness/universalExpeditionConsciousnessEngine"

export default function UniversalConsciousnessPanel(){

  const consciousness =
    getUniversalConsciousness()

  return (

    <div className="jd-uc-shell">

      <div className="jd-uc-header">

        INFINITE UNIVERSAL EXPEDITION CONSCIOUSNESS

      </div>

      {

        consciousness.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-uc-card ${node.consciousnessState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-uc-top">

                <div>

                  <div className="jd-uc-domain">

                    {node.consciousnessDomain}

                  </div>

                  <div className="jd-uc-density">

                    Universal Density:
                    {" "}
                    {node.universalDensity}%

                  </div>

                </div>

                <div className="jd-uc-state">

                  {node.consciousnessState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-uc-grid">

                <div>

                  Federation:
                  {" "}
                  {node.cognitionFederation}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityAwareness}%

                </div>

                <div>

                  Universal AI:
                  {" "}
                  {node.aiUniversalConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-uc-actions">

                {

                  node.autonomousConsciousnessActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-uc-action"
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

              <div className="jd-uc-patterns">

                {

                  node.consciousnessPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-uc-pill"
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

              <div className="jd-uc-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
