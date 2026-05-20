"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/InfiniteExpeditionFabricPanel.tsx

   Timestamp:
   13 May 2026 22:00 (Sydney)

   PURPOSE:
   Infinite expedition fabric visualisation
===================================================== */

import React from "react"

import {

  getInfiniteFabric

}
from "../../lib/fabric/infiniteExpeditionFabricEngine"

export default function InfiniteExpeditionFabricPanel(){

  const fabric =
    getInfiniteFabric()

  return (

    <div className="jd-fab-shell">

      <div className="jd-fab-header">

        INFINITE AUTONOMOUS EXPEDITION FABRIC

      </div>

      {

        fabric.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-fab-card ${node.fabricState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-fab-top">

                <div>

                  <div className="jd-fab-domain">

                    {node.fabricDomain}

                  </div>

                  <div className="jd-fab-streams">

                    Streams:
                    {" "}
                    {node.persistentStreams}

                  </div>

                </div>

                <div className="jd-fab-state">

                  {node.fabricState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-fab-grid">

                <div>

                  Harmony:
                  {" "}
                  {node.cognitionHarmony}%

                </div>

                <div>

                  Continuity:
                  {" "}
                  {node.survivabilityContinuity}%

                </div>

                <div>

                  Fabric AI:
                  {" "}
                  {node.aiFabricConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-fab-actions">

                {

                  node.autonomousFabricActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-fab-action"
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

              <div className="jd-fab-patterns">

                {

                  node.harmonicPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-fab-pill"
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

              <div className="jd-fab-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
