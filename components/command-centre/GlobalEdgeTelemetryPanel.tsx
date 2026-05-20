"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/GlobalEdgeTelemetryPanel.tsx

   Timestamp:
   13 May 2026 05:30 (Sydney)

   PURPOSE:
   Global edge telemetry visualisation
===================================================== */

import React from "react"

import {

  getGlobalEdgeTelemetryNodes

}
from "../../lib/edge/globalEdgeTelemetryNetworkEngine"

export default function GlobalEdgeTelemetryPanel(){

  const nodes =
    getGlobalEdgeTelemetryNodes()

  return (

    <div className="jd-edge-shell">

      <div className="jd-edge-header">

        GLOBAL EDGE TELEMETRY NETWORK

      </div>

      {

        nodes.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-edge-card ${node.nodeState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-edge-top">

                <div>

                  <div className="jd-edge-region">

                    {node.regionalZone}

                  </div>

                  <div className="jd-edge-id">

                    {node.edgeNodeId}

                  </div>

                </div>

                <div className="jd-edge-state">

                  {node.nodeState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-edge-grid">

                <div>

                  Convoys:
                  {" "}
                  {node.activeConvoys}

                </div>

                <div>

                  Throughput:
                  {" "}
                  {node.telemetryThroughput}

                </div>

                <div>

                  Latency:
                  {" "}
                  {node.edgeLatencyMs}ms

                </div>

                <div>

                  Survivability:
                  {" "}
                  {node.survivabilityScore}%

                </div>

              </div>

              {/* ============================= */}
              {/* SERVICES */}
              {/* ============================= */}

              <div className="jd-edge-services">

                {

                  node.activeServices?.map(

                    (
                      service:string,
                      serviceIdx:number
                    )=>(

                      <span
                        key={serviceIdx}
                        className="jd-edge-service-pill"
                      >

                        {service}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-edge-actions">

                {

                  node.autonomousActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-edge-action"
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

              <div className="jd-edge-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
