"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/OmegaNexusPanel.tsx

   Timestamp:
   14 May 2026 04:45 (Sydney)

   PURPOSE:
   Infinite omega nexus visualisation
===================================================== */

import React from "react"

import {

  getOmegaNexus

}
from "../../lib/omega-nexus/omegaExpeditionNexusEngine"

export default function OmegaNexusPanel(){

  const omegaNexus =
    getOmegaNexus()

  return (

    <div className="jd-omn-shell">

      <div className="jd-omn-header">

        INFINITE EXPEDITION OMEGA NEXUS

      </div>

      {

        omegaNexus.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-omn-card ${node.omegaNexusState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-omn-top">

                <div>

                  <div className="jd-omn-domain">

                    {node.omegaNexusDomain}

                  </div>

                  <div className="jd-omn-density">

                    Federation Density:
                    {" "}
                    {node.omegaFederationDensity}%

                  </div>

                </div>

                <div className="jd-omn-state">

                  {node.omegaNexusState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-omn-grid">

                <div>

                  Transcendence:
                  {" "}
                  {node.cognitionTranscendence}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityConvergence}%

                </div>

                <div>

                  Omega Nexus AI:
                  {" "}
                  {node.aiOmegaNexusConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-omn-actions">

                {

                  node.autonomousOmegaActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-omn-action"
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

              <div className="jd-omn-patterns">

                {

                  node.omegaPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-omn-pill"
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

              <div className="jd-omn-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
