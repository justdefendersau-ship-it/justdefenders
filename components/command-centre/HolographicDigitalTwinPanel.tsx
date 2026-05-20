"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/HolographicDigitalTwinPanel.tsx

   Timestamp:
   13 May 2026 09:15 (Sydney)

   PURPOSE:
   Holographic digital twin visualisation
===================================================== */

import React from "react"

import {

  getHolographicDigitalTwins

}
from "../../lib/holographic/holographicDigitalTwinEngine"

export default function HolographicDigitalTwinPanel(){

  const twins =
    getHolographicDigitalTwins()

  return (

    <div className="jd-holo-shell">

      <div className="jd-holo-header">

        DIGITAL TWIN HOLOGRAPHIC MODE

      </div>

      {

        twins.map(

          (
            twin:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-holo-card ${twin.holographicState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-holo-top">

                <div>

                  <div className="jd-holo-name">

                    {twin.convoyName}

                  </div>

                  <div className="jd-holo-streams">

                    Streams:
                    {" "}
                    {twin.telemetryStreams}

                  </div>

                </div>

                <div className="jd-holo-state">

                  {twin.holographicState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-holo-grid">

                <div>

                  Vehicles:
                  {" "}
                  {twin.activeVehicles}

                </div>

                <div>

                  Terrain:
                  {" "}
                  {twin.terrainComplexity}%

                </div>

                <div>

                  Thermal:
                  {" "}
                  {twin.thermalStress}%

                </div>

                <div>

                  AI Twin:
                  {" "}
                  {twin.aiTwinConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* EVENTS */}
              {/* ============================= */}

              <div className="jd-holo-events">

                {

                  twin.holographicEvents?.map(

                    (
                      event:string,
                      eventIdx:number
                    )=>(

                      <div
                        key={eventIdx}
                        className="jd-holo-event"
                      >

                        {event}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* INSIGHTS */}
              {/* ============================= */}

              <div className="jd-holo-insight">

                {twin.twinInsights?.[0]}

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-holo-forecast">

                {twin.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
