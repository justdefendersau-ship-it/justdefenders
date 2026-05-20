"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/InfiniteOperationalContinuumPanel.tsx

   Timestamp:
   14 May 2026 02:30 (Sydney)

   PURPOSE:
   Infinite operational continuum visualisation
===================================================== */

import React from "react"

import {

  getOperationalContinuum

}
from "../../lib/continuum/infiniteOperationalContinuumEngine"

export default function InfiniteOperationalContinuumPanel(){

  const continuum =
    getOperationalContinuum()

  return (

    <div className="jd-cont-shell">

      <div className="jd-cont-header">

        INFINITE AUTONOMOUS OPERATIONAL CONTINUUM

      </div>

      {

        continuum.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-cont-card ${node.continuumState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-cont-top">

                <div>

                  <div className="jd-cont-domain">

                    {node.continuumDomain}

                  </div>

                  <div className="jd-cont-density">

                    Operational Density:
                    {" "}
                    {node.operationalDensity}%

                  </div>

                </div>

                <div className="jd-cont-state">

                  {node.continuumState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-cont-grid">

                <div>

                  Continuity:
                  {" "}
                  {node.cognitionContinuity}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityContinuum}%

                </div>

                <div>

                  Continuum AI:
                  {" "}
                  {node.aiContinuumConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-cont-actions">

                {

                  node.autonomousContinuumActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-cont-action"
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

              <div className="jd-cont-patterns">

                {

                  node.continuumPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-cont-pill"
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

              <div className="jd-cont-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
