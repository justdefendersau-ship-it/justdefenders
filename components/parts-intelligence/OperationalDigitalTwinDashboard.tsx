"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/OperationalDigitalTwinDashboard.tsx
//
// Timestamp:
// 12 May 2026 02:30 (Sydney)
//
// PURPOSE:
// Operational digital twin dashboard
// =====================================================

import React
from "react"

import {

  getOperationalDigitalTwins,
  getTwinPlatformHealth

}
from "../../lib/parts-intelligence/operationalDigitalTwinEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function OperationalDigitalTwinDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const twins =
    getOperationalDigitalTwins()

  const health =
    getTwinPlatformHealth()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-twin-shell">

      <div className="jd-twin-header">

        Operational Digital Twin Intelligence

      </div>

      <div className="jd-twin-subtitle">

        Real-time expedition telemetry,
        predictive operational modelling and
        synchronised vehicle intelligence

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-twin-health">

        Fleet Twin Health Index:

        {" "}

        <strong>

          {health}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-twin-grid">

        {

          twins.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-twin-card"
              >

                <div className="jd-twin-top">

                  <div>

                    <div className="jd-twin-vehicle">

                      {item.vehicleModel}

                    </div>

                    <div className="jd-twin-route">

                      {item.expeditionRoute}

                    </div>

                  </div>

                  <div className="jd-twin-state">

                    {

                      item.operationalState

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* HEALTH */}
                {/* =============================== */}

                <div className="jd-twin-metric">

                  Cooling:

                  {" "}

                  <strong>

                    {

                      item.coolingSystemHealth

                    }%

                  </strong>

                </div>

                <div className="jd-twin-metric">

                  Drivetrain:

                  {" "}

                  <strong>

                    {

                      item.drivetrainHealth

                    }%

                  </strong>

                </div>

                <div className="jd-twin-metric">

                  Suspension:

                  {" "}

                  <strong>

                    {

                      item.suspensionHealth

                    }%

                  </strong>

                </div>

                <div className="jd-twin-metric">

                  Predictive Risk:

                  {" "}

                  <strong>

                    {

                      item.predictiveRiskScore

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* SIGNALS */}
                {/* =============================== */}

                <div className="jd-twin-section">

                  <div className="jd-twin-section-title">

                    Telemetry Signals

                  </div>

                  <ul>

                    {

                      item.telemetrySignals?.map(

                        (
                          signal:string,
                          signalIdx:number
                        )=>(

                          <li key={signalIdx}>

                            {signal}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* RECOMMENDATIONS */}
                {/* =============================== */}

                <div className="jd-twin-section">

                  <div className="jd-twin-section-title">

                    Operational Recommendations

                  </div>

                  <ul>

                    {

                      item.operationalRecommendations?.map(

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

                  Open Digital Twin

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
