"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/FleetConvoyOrchestrationPanel.tsx

   Timestamp:
   13 May 2026 01:45 (Sydney)

   PURPOSE:
   Fleet convoy orchestration visualisation
===================================================== */

import React from "react"

import {

  getFleetConvoys

}
from "../../lib/fleet/fleetConvoyOrchestrationEngine"

export default function FleetConvoyOrchestrationPanel(){

  const convoys =
    getFleetConvoys()

  return (

    <div className="jd-convoy-shell">

      <div className="jd-convoy-header">

        AI FLEET ORCHESTRATION

      </div>

      {

        convoys.map(

          (
            convoy:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-convoy-card ${convoy.convoyState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-convoy-top">

                <div>

                  <div className="jd-convoy-name">

                    {convoy.convoyName}

                  </div>

                  <div className="jd-convoy-region">

                    {convoy.operationalRegion}

                  </div>

                </div>

                <div className="jd-convoy-state">

                  {convoy.convoyState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-convoy-grid">

                <div>

                  Vehicles:
                  {" "}
                  {convoy.activeVehicles}

                </div>

                <div>

                  Survivability:
                  {" "}
                  {convoy.survivabilityIndex}%

                </div>

                <div>

                  Telemetry:
                  {" "}
                  {convoy.telemetryIntegrity}%

                </div>

                <div>

                  Recovery:
                  {" "}
                  {convoy.recoveryReadiness}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-convoy-actions">

                {

                  convoy.autonomousActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-convoy-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-convoy-forecast">

                {convoy.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
