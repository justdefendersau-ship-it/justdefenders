"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/AutonomousEconomyPanel.tsx

   Timestamp:
   13 May 2026 15:15 (Sydney)

   PURPOSE:
   Autonomous expedition economy visualisation
===================================================== */

import React from "react"

import {

  getAutonomousEconomyStreams

}
from "../../lib/economy/autonomousExpeditionEconomyEngine"

export default function AutonomousEconomyPanel(){

  const economy =
    getAutonomousEconomyStreams()

  return (

    <div className="jd-economy-shell">

      <div className="jd-economy-header">

        AUTONOMOUS EXPEDITION ECONOMY

      </div>

      {

        economy.map(

          (
            stream:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-economy-card ${stream.economyState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-economy-top">

                <div>

                  <div className="jd-economy-sector">

                    {stream.economySector}

                  </div>

                  <div className="jd-economy-streams">

                    Trade Streams:
                    {" "}
                    {stream.activeTradeStreams}

                  </div>

                </div>

                <div className="jd-economy-state">

                  {stream.economyState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-economy-grid">

                <div>

                  Synchronisation:
                  {" "}
                  {stream.supplierSynchronisation}%

                </div>

                <div>

                  Demand:
                  {" "}
                  {stream.expeditionDemandIndex}%

                </div>

                <div>

                  AI Confidence:
                  {" "}
                  {stream.aiEconomicConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-economy-actions">

                {

                  stream.autonomousMarketActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-economy-action"
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

              <div className="jd-economy-patterns">

                {

                  stream.optimisationPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-economy-pill"
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

              <div className="jd-economy-forecast">

                {stream.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
