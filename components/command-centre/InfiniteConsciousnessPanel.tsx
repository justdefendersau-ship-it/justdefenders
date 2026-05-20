"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/InfiniteConsciousnessPanel.tsx

   Timestamp:
   14 May 2026 00:15 (Sydney)

   PURPOSE:
   Infinite expedition consciousness visualisation
===================================================== */

import React from "react"

import {

  getInfiniteConsciousness

}
from "../../lib/consciousness/infiniteExpeditionConsciousnessEngine"

export default function InfiniteConsciousnessPanel(){

  const consciousness =
    getInfiniteConsciousness()

  return (

    <div className="jd-con-shell">

      <div className="jd-con-header">

        INFINITE AUTONOMOUS EXPEDITION CONSCIOUSNESS

      </div>

      {

        consciousness.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-con-card ${node.consciousnessState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-con-top">

                <div>

                  <div className="jd-con-domain">

                    {node.consciousnessDomain}

                  </div>

                  <div className="jd-con-density">

                    Awareness Density:
                    {" "}
                    {node.awarenessDensity}%

                  </div>

                </div>

                <div className="jd-con-state">

                  {node.consciousnessState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-con-grid">

                <div>

                  Continuity:
                  {" "}
                  {node.cognitionContinuity}%

                </div>

                <div>

                  Harmony:
                  {" "}
                  {node.operationalHarmony}%

                </div>

                <div>

                  Consciousness AI:
                  {" "}
                  {node.aiConsciousnessConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-con-actions">

                {

                  node.autonomousConsciousnessActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-con-action"
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

              <div className="jd-con-patterns">

                {

                  node.awarenessPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-con-pill"
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

              <div className="jd-con-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
