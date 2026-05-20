"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/ExpeditionOmegaPanel.tsx

   Timestamp:
   14 May 2026 03:15 (Sydney)

   PURPOSE:
   Expedition Omega intelligence visualisation
===================================================== */

import React from "react"

import {

  getOmegaIntelligence

}
from "../../lib/omega/expeditionOmegaIntelligenceEngine"

export default function ExpeditionOmegaPanel(){

  const omega =
    getOmegaIntelligence()

  return (

    <div className="jd-omega-shell">

      <div className="jd-omega-header">

        EXPEDITION OMEGA INTELLIGENCE FRAMEWORK

      </div>

      {

        omega.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-omega-card ${node.omegaState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-omega-top">

                <div>

                  <div className="jd-omega-domain">

                    {node.omegaDomain}

                  </div>

                  <div className="jd-omega-density">

                    Omega Density:
                    {" "}
                    {node.omegaDensity}%

                  </div>

                </div>

                <div className="jd-omega-state">

                  {node.omegaState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-omega-grid">

                <div>

                  Harmony:
                  {" "}
                  {node.cognitionHarmony}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityOmega}%

                </div>

                <div>

                  Omega AI:
                  {" "}
                  {node.aiOmegaConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-omega-actions">

                {

                  node.autonomousOmegaActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-omega-action"
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

              <div className="jd-omega-patterns">

                {

                  node.omegaPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-omega-pill"
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

              <div className="jd-omega-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
