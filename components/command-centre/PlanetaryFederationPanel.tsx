"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/PlanetaryFederationPanel.tsx

   Timestamp:
   13 May 2026 13:00 (Sydney)

   PURPOSE:
   Planetary federation visualisation
===================================================== */

import React from "react"

import {

  getPlanetaryFederation

}
from "../../lib/federation/planetaryExpeditionFederationEngine"

export default function PlanetaryFederationPanel(){

  const federation =
    getPlanetaryFederation()

  return (

    <div className="jd-fed-shell">

      <div className="jd-fed-header">

        PLANETARY EXPEDITION FEDERATION

      </div>

      {

        federation.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-fed-card ${node.federationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-fed-top">

                <div>

                  <div className="jd-fed-region">

                    {node.federationRegion}

                  </div>

                  <div className="jd-fed-streams">

                    Streams:
                    {" "}
                    {node.globalTelemetryStreams}

                  </div>

                </div>

                <div className="jd-fed-state">

                  {node.federationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-fed-grid">

                <div>

                  Convoys:
                  {" "}
                  {node.activeConvoys}

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityIndex}%

                </div>

                <div>

                  Orbital:
                  {" "}
                  {node.orbitalCoverage}%

                </div>

                <div>

                  AI:
                  {" "}
                  {node.aiFederationConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-fed-actions">

                {

                  node.autonomousActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-fed-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* ORBITAL */}
              {/* ============================= */}

              <div className="jd-fed-orbital">

                {

                  node.orbitalSystems?.map(

                    (
                      orbital:string,
                      orbitalIdx:number
                    )=>(

                      <span
                        key={orbitalIdx}
                        className="jd-fed-pill"
                      >

                        {orbital}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-fed-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
