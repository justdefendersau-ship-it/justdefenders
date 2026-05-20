"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/HardwareIntegrationPanel.tsx

   Timestamp:
   13 May 2026 00:15 (Sydney)

   PURPOSE:
   Hardware integration federation panel
===================================================== */

import React from "react"

import {

  getHardwareIntegrationStates

}
from "../../lib/hardware/realExpeditionHardwareIntegrationEngine"

export default function HardwareIntegrationPanel(){

  const hardware =
    getHardwareIntegrationStates()

  return (

    <div className="jd-hardware-shell">

      <div className="jd-hardware-header">

        REAL HARDWARE FEDERATION

      </div>

      {

        hardware.map(

          (
            item:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-hardware-card ${item.integrationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-hardware-top">

                <div>

                  <div className="jd-hardware-type">

                    {item.hardwareType}

                  </div>

                  <div className="jd-hardware-vendor">

                    {item.hardwareVendor}

                  </div>

                </div>

                <div className="jd-hardware-state">

                  {item.integrationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-hardware-grid">

                <div>

                  Integrity:
                  {" "}
                  {item.telemetryIntegrity}%

                </div>

                <div>

                  Latency:
                  {" "}
                  {item.signalLatencyMs}ms

                </div>

                <div>

                  Signal:
                  {" "}
                  {item.signalStrength}%

                </div>

                <div>

                  Recovery:
                  {" "}
                  {item.autonomousRecoveryReadiness}%

                </div>

              </div>

              {/* ============================= */}
              {/* CHANNELS */}
              {/* ============================= */}

              <div className="jd-hardware-channels">

                {

                  item.telemetryChannels?.map(

                    (
                      channel:string,
                      channelIdx:number
                    )=>(

                      <span
                        key={channelIdx}
                        className="jd-channel-pill"
                      >

                        {channel}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-hardware-forecast">

                {item.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
