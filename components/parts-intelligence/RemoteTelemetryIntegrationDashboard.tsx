"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/RemoteTelemetryIntegrationDashboard.tsx
//
// Timestamp:
// 12 May 2026 07:00 (Sydney)
//
// PURPOSE:
// Remote telemetry integration dashboard
// =====================================================

import React
from "react"

import {

  getRemoteTelemetryStreams,
  getTelemetryHealthIndex

}
from "../../lib/parts-intelligence/remoteTelemetryIntegrationEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function RemoteTelemetryIntegrationDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const telemetry =
    getRemoteTelemetryStreams()

  const health =
    getTelemetryHealthIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-telemetry-shell">

      <div className="jd-telemetry-header">

        Real-Time Remote Telemetry

      </div>

      <div className="jd-telemetry-subtitle">

        Satellite telemetry coordination,
        live expedition synchronisation and
        real-time operational signal intelligence

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-telemetry-health">

        Telemetry Health Index:

        {" "}

        <strong>

          {health}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-telemetry-grid">

        {

          telemetry.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-telemetry-card"
              >

                <div className="jd-telemetry-top">

                  <div>

                    <div className="jd-telemetry-vehicle">

                      {item.vehicleModel}

                    </div>

                    <div className="jd-telemetry-route">

                      {item.expeditionRoute}

                    </div>

                  </div>

                  <div className="jd-telemetry-state">

                    {

                      item.telemetryState

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-telemetry-metric">

                  GPS Signal:

                  {" "}

                  <strong>

                    {

                      item.gpsSignalStrength

                    }%

                  </strong>

                </div>

                <div className="jd-telemetry-metric">

                  Satellite Link:

                  {" "}

                  <strong>

                    {

                      item.satelliteLinkQuality

                    }%

                  </strong>

                </div>

                <div className="jd-telemetry-metric">

                  Drivetrain Telemetry:

                  {" "}

                  <strong>

                    {

                      item.drivetrainTelemetryIntegrity

                    }%

                  </strong>

                </div>

                <div className="jd-telemetry-metric">

                  Sync Latency:

                  {" "}

                  <strong>

                    {

                      item.synchronisationLatencyMs

                    }

                    ms

                  </strong>

                </div>

                {/* =============================== */}
                {/* ALERTS */}
                {/* =============================== */}

                <div className="jd-telemetry-section">

                  <div className="jd-telemetry-section-title">

                    Active Telemetry Alerts

                  </div>

                  <ul>

                    {

                      item.activeTelemetryAlerts?.map(

                        (
                          alert:string,
                          alertIdx:number
                        )=>(

                          <li key={alertIdx}>

                            {alert}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* RECOMMENDATIONS */}
                {/* =============================== */}

                <div className="jd-telemetry-section">

                  <div className="jd-telemetry-section-title">

                    Telemetry Recommendations

                  </div>

                  <ul>

                    {

                      item.telemetryRecommendations?.map(

                        (
                          recommendation:string,
                          recommendationIdx:number
                        )=>(

                          <li key={recommendationIdx}>

                            {recommendation}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* BUTTON */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  Open Telemetry Stream

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
