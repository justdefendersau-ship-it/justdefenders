"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/TranscendenceFederationPanel.tsx

   Timestamp:
   14 May 2026 07:45 (Sydney)

   PURPOSE:
   Transcendence federation visualisation
===================================================== */

import React from "react"

import {

  getTranscendenceFederation

}
from "../../lib/transcendence-federation/transcendenceFederationEngine"

export default function TranscendenceFederationPanel(){

  const federation =
    getTranscendenceFederation()

  return (

    <div className="jd-tf-shell">

      <div className="jd-tf-header">

        UNIFIED INFINITE TRANSCENDENCE FEDERATION

      </div>

      {

        federation.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-tf-card ${node.federationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-tf-top">

                <div>

                  <div className="jd-tf-domain">

                    {node.federationDomain}

                  </div>

                  <div className="jd-tf-density">

                    Federation Density:
                    {" "}
                    {node.federationDensity}%

                  </div>

                </div>

                <div className="jd-tf-state">

                  {node.federationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-tf-grid">

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionFederation}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityFederation}%

                </div>

                <div>

                  Federation AI:
                  {" "}
                  {node.aiFederationConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-tf-actions">

                {

                  node.autonomousFederationActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-tf-action"
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

              <div className="jd-tf-patterns">

                {

                  node.federationPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-tf-pill"
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

              <div className="jd-tf-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
