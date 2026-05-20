"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/SatelliteTelemetryFederationPanel.tsx

   Timestamp:
   13 May 2026 03:15 (Sydney)

   PURPOSE:
   Satellite telemetry federation visualisation
===================================================== */

import React from "react"

import {

  getSatelliteTelemetryFederation

}
from "../../lib/satellite/satelliteTelemetryFederationEngine"

export default function SatelliteTelemetryFederationPanel(){

  const satellites =
    getSatelliteTelemetryFederation()

  return (

    <div className="jd-satellite-shell">

      <div className="jd-satellite-header">

        SATELLITE TELEMETRY FEDERATION

      </div>

      {

        satellites.map(

          (
            sat:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-satellite-card ${sat.federationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-satellite-top">

                <div>

                  <div className="jd-satellite-provider">

                    {sat.satelliteProvider}

                  </div>

                  <div className="jd-satellite-orbit">

                    {sat.orbitClass} ORBIT

                  </div>

                </div>

                <div className="jd-satellite-state">

                  {sat.federationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-satellite-grid">

                <div>

                  Integrity:
                  {" "}
                  {sat.signalIntegrity}%

                </div>

                <div>

                  Latency:
                  {" "}
                  {sat.orbitalLatencyMs}ms

                </div>

                <div>

                  Visibility:
                  {" "}
                  {sat.terrainVisibility}%

                </div>

                <div>

                  Failover:
                  {" "}
                  {sat.aiFailoverConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-satellite-actions">

                {

                  sat.autonomousActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-satellite-action"
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

              <div className="jd-satellite-forecast">

                {sat.orbitalForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
