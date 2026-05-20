"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UnifiedExpeditionNexusPanel.tsx

   Timestamp:
   14 May 2026 01:45 (Sydney)

   PURPOSE:
   Unified expedition nexus visualisation
===================================================== */

import React from "react"

import {

  getUnifiedNexus

}
from "../../lib/unified-nexus/unifiedExpeditionNexusEngine"

export default function UnifiedExpeditionNexusPanel(){

  const nexus =
    getUnifiedNexus()

  return (

    <div className="jd-unex-shell">

      <div className="jd-unex-header">

        UNIFIED INFINITE EXPEDITION NEXUS

      </div>

      {

        nexus.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-unex-card ${node.nexusState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-unex-top">

                <div>

                  <div className="jd-unex-domain">

                    {node.nexusDomain}

                  </div>

                  <div className="jd-unex-density">

                    Federation Integrity:
                    {" "}
                    {node.federationIntegrity}%

                  </div>

                </div>

                <div className="jd-unex-state">

                  {node.nexusState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-unex-grid">

                <div>

                  Convergence:
                  {" "}
                  {node.cognitionConvergence}%

                </div>

                <div>

                  Continuity:
                  {" "}
                  {node.survivabilityContinuity}%

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

              <div className="jd-unex-actions">

                {

                  node.autonomousNexusActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-unex-action"
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

              <div className="jd-unex-patterns">

                {

                  node.federationPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-unex-pill"
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

              <div className="jd-unex-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
