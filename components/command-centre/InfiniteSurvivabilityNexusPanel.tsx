"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/InfiniteSurvivabilityNexusPanel.tsx

   Timestamp:
   13 May 2026 23:30 (Sydney)

   PURPOSE:
   Infinite survivability nexus visualisation
===================================================== */

import React from "react"

import {

  getInfiniteNexus

}
from "../../lib/nexus/infiniteSurvivabilityNexusEngine"

export default function InfiniteSurvivabilityNexusPanel(){

  const nexus =
    getInfiniteNexus()

  return (

    <div className="jd-nex-shell">

      <div className="jd-nex-header">

        AUTONOMOUS INFINITE SURVIVABILITY NEXUS

      </div>

      {

        nexus.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-nex-card ${node.nexusState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-nex-top">

                <div>

                  <div className="jd-nex-domain">

                    {node.nexusDomain}

                  </div>

                  <div className="jd-nex-density">

                    Resilience Density:
                    {" "}
                    {node.resilienceDensity}%

                  </div>

                </div>

                <div className="jd-nex-state">

                  {node.nexusState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-nex-grid">

                <div>

                  Convergence:
                  {" "}
                  {node.survivabilityConvergence}%

                </div>

                <div>

                  Continuity:
                  {" "}
                  {node.adaptiveContinuity}%

                </div>

                <div>

                  Nexus AI:
                  {" "}
                  {node.aiNexusConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-nex-actions">

                {

                  node.autonomousNexusActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-nex-action"
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

              <div className="jd-nex-patterns">

                {

                  node.resiliencePatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-nex-pill"
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

              <div className="jd-nex-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
