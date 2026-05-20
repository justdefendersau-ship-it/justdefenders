"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/ExpeditionNexusPanel.tsx

   Timestamp:
   14 May 2026 13:00 (Sydney)

   PURPOSE:
   Expedition nexus visualisation
===================================================== */

import React from "react"

import {

  getExpeditionNexus

}
from "../../lib/expedition-nexus/expeditionNexusEngine"

export default function ExpeditionNexusPanel(){

  const nexus =
    getExpeditionNexus()

  return (

    <div className="jd-enx-shell">

      <div className="jd-enx-header">

        INFINITE AUTONOMOUS EXPEDITION NEXUS

      </div>

      {

        nexus.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-enx-card ${node.nexusState}`}
            >

              <div className="jd-enx-top">

                <div>

                  <div className="jd-enx-domain">

                    {node.nexusDomain}

                  </div>

                  <div className="jd-enx-density">

                    Nexus Density:
                    {" "}
                    {node.nexusDensity}%

                  </div>

                </div>

                <div className="jd-enx-state">

                  {node.nexusState}

                </div>

              </div>

              <div className="jd-enx-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionNexus}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityNexus}%

                </div>

                <div>

                  Nexus AI:
                  {" "}
                  {node.aiNexusConfidence}%

                </div>

              </div>

              <div className="jd-enx-actions">

                {

                  node.autonomousNexusActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-enx-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              <div className="jd-enx-patterns">

                {

                  node.nexusPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-enx-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              <div className="jd-enx-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
