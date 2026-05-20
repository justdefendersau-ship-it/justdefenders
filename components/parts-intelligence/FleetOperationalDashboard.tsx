"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/FleetOperationalDashboard.tsx
//
// Timestamp:
// 11 May 2026 19:00 (Sydney)
//
// PURPOSE:
// Fleet operational intelligence dashboard
// =====================================================

import React
from "react"

import {

  getAllFleets,
  getFleetReadinessAverage

}
from "../../lib/parts-intelligence/fleetOperationalEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function FleetOperationalDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const fleets =
    getAllFleets()

  const readiness =
    getFleetReadinessAverage()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-fleet-shell">

      <div className="jd-fleet-header">

        Fleet Operational Intelligence

      </div>

      <div className="jd-fleet-subtitle">

        Multi-vehicle expedition readiness,
        procurement visibility and
        operational maintenance intelligence

      </div>

      {/* ============================================= */}
      {/* SCORE */}
      {/* ============================================= */}

      <div className="jd-fleet-score">

        Fleet Readiness Average:

        {" "}

        <strong>

          {

            Math.round(
              readiness * 100
            )

          }%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-fleet-grid">

        {

          fleets.map(

            (
              fleet:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-fleet-card"
              >

                <div className="jd-fleet-top">

                  <div>

                    <div className="jd-fleet-name">

                      {fleet.fleetName}

                    </div>

                    <div className="jd-fleet-status">

                      {fleet.operationalStatus}

                    </div>

                  </div>

                  <div className="jd-fleet-readiness">

                    {

                      Math.round(

                        fleet.readinessScore
                        * 100

                      )

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* VEHICLES */}
                {/* =============================== */}

                <div className="jd-fleet-section">

                  <div className="jd-fleet-section-title">

                    Vehicles

                  </div>

                  <ul>

                    {

                      fleet.vehicles.map(

                        (
                          vehicle:string,
                          vehicleIdx:number
                        )=>(

                          <li key={vehicleIdx}>

                            {vehicle}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* CRITICAL PARTS */}
                {/* =============================== */}

                <div className="jd-fleet-section">

                  <div className="jd-fleet-section-title">

                    Critical Parts

                  </div>

                  <div className="jd-fleet-tags">

                    {

                      fleet.criticalParts?.map(

                        (
                          part:string,
                          partIdx:number
                        )=>(

                          <div
                            key={partIdx}
                            className="jd-fleet-tag"
                          >

                            {part}

                          </div>
                        )
                      )
                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* WARNINGS */}
                {/* =============================== */}

                {

                  fleet.operationalWarnings
                  &&
                  (

                    <div className="jd-fleet-section">

                      <div className="jd-fleet-section-title">

                        Operational Warnings

                      </div>

                      <ul>

                        {

                          fleet.operationalWarnings.map(

                            (
                              warning:string,
                              warningIdx:number
                            )=>(

                              <li key={warningIdx}>

                                {warning}

                              </li>
                            )
                          )
                        }

                      </ul>

                    </div>
                  )
                }

                {/* =============================== */}
                {/* ACTION */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  View Fleet

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
