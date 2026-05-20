"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UnifiedInfiniteIntelligencePanel.tsx

   Timestamp:
   13 May 2026 22:45 (Sydney)

   PURPOSE:
   Unified infinite intelligence visualisation
===================================================== */

import React from "react"

import {

  getUnifiedInfiniteIntelligence

}
from "../../lib/unified/unifiedInfiniteIntelligenceEngine"

export default function UnifiedInfiniteIntelligencePanel(){

  const intelligence =
    getUnifiedInfiniteIntelligence()

  return (

    <div className="jd-uii-shell">

      <div className="jd-uii-header">

        UNIFIED INFINITE EXPEDITION INTELLIGENCE

      </div>

      {

        intelligence.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-uii-card ${node.intelligenceState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-uii-top">

                <div>

                  <div className="jd-uii-domain">

                    {node.intelligenceDomain}

                  </div>

                  <div className="jd-uii-density">

                    Federation Density:
                    {" "}
                    {node.federationDensity}%

                  </div>

                </div>

                <div className="jd-uii-state">

                  {node.intelligenceState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-uii-grid">

                <div>

                  Convergence:
                  {" "}
                  {node.cognitionConvergence}%

                </div>

                <div>

                  Harmony:
                  {" "}
                  {node.survivabilityHarmony}%

                </div>

                <div>

                  Infinite AI:
                  {" "}
                  {node.aiInfinityConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-uii-actions">

                {

                  node.autonomousIntelligenceActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-uii-action"
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

              <div className="jd-uii-patterns">

                {

                  node.federationPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-uii-pill"
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

              <div className="jd-uii-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
