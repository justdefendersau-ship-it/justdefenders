"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/MetaExpeditionCorePanel.tsx

   Timestamp:
   14 May 2026 08:30 (Sydney)

   PURPOSE:
   Meta expedition core visualisation
===================================================== */

import React from "react"

import {

  getMetaCore

}
from "../../lib/meta-core/metaExpeditionCoreEngine"

export default function MetaExpeditionCorePanel(){

  const meta =
    getMetaCore()

  return (

    <div className="jd-meta-core-shell">

      <div className="jd-meta-core-header">

        INFINITE AUTONOMOUS META EXPEDITION CORE

      </div>

      {

        meta.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-meta-core-card ${node.metaState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-meta-core-top">

                <div>

                  <div className="jd-meta-core-domain">

                    {node.metaDomain}

                  </div>

                  <div className="jd-meta-core-density">

                    Meta Density:
                    {" "}
                    {node.metaDensity}%

                  </div>

                </div>

                <div className="jd-meta-core-state">

                  {node.metaState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-meta-core-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionAwareness}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityMeta}%

                </div>

                <div>

                  Meta AI:
                  {" "}
                  {node.aiMetaConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-meta-core-actions">

                {

                  node.autonomousMetaActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-meta-core-action"
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

              <div className="jd-meta-core-patterns">

                {

                  node.metaPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-meta-core-pill"
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

              <div className="jd-meta-core-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
