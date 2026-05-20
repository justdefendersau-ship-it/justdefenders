"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UniversalNexusPanel.tsx

   Timestamp:
   14 May 2026 10:00 (Sydney)

   PURPOSE:
   Universal nexus visualisation
===================================================== */

import React from "react"

import {

  getUniversalNexus

}
from "../../lib/universal-nexus/universalNexusEngine"

export default function UniversalNexusPanel(){

  const nexus =
    getUniversalNexus()

  return (

    <div className="jd-unx-shell">

      <div className="jd-unx-header">

        AUTONOMOUS INFINITE UNIVERSAL NEXUS

      </div>

      {

        nexus.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-unx-card ${node.nexusState}`}
            >

              <div className="jd-unx-top">

                <div>

                  <div className="jd-unx-domain">

                    {node.nexusDomain}

                  </div>

                  <div className="jd-unx-density">

                    Nexus Density:
                    {" "}
                    {node.nexusDensity}%

                  </div>

                </div>

                <div className="jd-unx-state">

                  {node.nexusState}

                </div>

              </div>

              <div className="jd-unx-grid">

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

              <div className="jd-unx-actions">

                {

                  node.autonomousNexusActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-unx-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              <div className="jd-unx-patterns">

                {

                  node.nexusPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-unx-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              <div className="jd-unx-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
