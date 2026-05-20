"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/ExpeditionTranscendencePanel.tsx

   Timestamp:
   14 May 2026 05:30 (Sydney)

   PURPOSE:
   Expedition transcendence visualisation
===================================================== */

import React from "react"

import {

  getExpeditionTranscendence

}
from "../../lib/transcendence/expeditionTranscendenceEngine"

export default function ExpeditionTranscendencePanel(){

  const transcendence =
    getExpeditionTranscendence()

  return (

    <div className="jd-trn-shell">

      <div className="jd-trn-header">

        INFINITE EXPEDITION TRANSCENDENCE FRAMEWORK

      </div>

      {

        transcendence.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-trn-card ${node.transcendenceState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-trn-top">

                <div>

                  <div className="jd-trn-domain">

                    {node.transcendenceDomain}

                  </div>

                  <div className="jd-trn-density">

                    Transcendence Density:
                    {" "}
                    {node.transcendenceDensity}%

                  </div>

                </div>

                <div className="jd-trn-state">

                  {node.transcendenceState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-trn-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionTranscendence}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityTranscendence}%

                </div>

                <div>

                  Transcendence AI:
                  {" "}
                  {node.aiTranscendenceConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-trn-actions">

                {

                  node.autonomousTranscendenceActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-trn-action"
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

              <div className="jd-trn-patterns">

                {

                  node.transcendencePatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-trn-pill"
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

              <div className="jd-trn-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
