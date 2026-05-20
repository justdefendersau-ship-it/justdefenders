// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\parts-intelligence\OperationalReadinessPanel.tsx
//
// Timestamp:
// 2026-05-11 00:40 (Sydney)
//
// PURPOSE:
// Operational Readiness Validation
// Typed Contract Refactor Compatible
// =====================================================

"use client";

import React from "react";

import {
  getOperationalReadiness
}
from "../../lib/parts-intelligence/operationalReadinessEngine";

// =====================================================
// COMPONENT
// =====================================================

export default function OperationalReadinessPanel({

  selectedTouring,
  selectedVehicle

}:any){

  // ===================================================
  // ENGINE RESPONSE
  // ===================================================

  const response =
    getOperationalReadiness(

      selectedTouring,
      selectedVehicle

    )

  // ===================================================
  // SAFETY FALLBACK
  // ===================================================

  const readiness =
    response.data?.[0]

  if(!readiness){

    return null
  }

  // ===================================================
  // SCORE COLOUR
  // ===================================================

  const scoreColour =

    readiness.readinessScore >= 90

      ? "#166534"

      : readiness.readinessScore >= 75

        ? "#92400e"

        : "#991b1b"

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-readiness-shell">

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="jd-readiness-header">

        <div>

          <div className="jd-readiness-title">

            Operational Readiness Validation

          </div>

          <div className="jd-readiness-subtitle">

            Expedition operational confidence assessment

          </div>

        </div>

        <div
          className="jd-readiness-score"
          style={{

            background:
              `${scoreColour}22`,

            color:
              scoreColour
          }}
        >

          {readiness.readinessScore}%

        </div>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-readiness-grid">

        {/* ========================================= */}
        {/* WARNINGS */}
        {/* ========================================= */}

        <div className="jd-readiness-card">

          <div
            className="jd-readiness-card-title"
            style={{
              color:"#b91c1c"
            }}
          >

            Critical Warnings

          </div>

          {

            readiness.operationalWarnings
            &&
            readiness.operationalWarnings.length > 0

              ? (

                  <ul>

                    {readiness.operationalWarnings.map(

                      (
                        item:string,
                        idx:number
                      )=>(

                        <li key={idx}>

                          {item}

                        </li>
                      )
                    )}

                  </ul>
                )

              : (

                  <div className="jd-positive-state">

                    ✔ No critical operational warnings

                  </div>
                )
          }

        </div>

        {/* ========================================= */}
        {/* ADVISORIES */}
        {/* ========================================= */}

        <div className="jd-readiness-card">

          <div
            className="jd-readiness-card-title"
            style={{
              color:"#b45309"
            }}
          >

            Advisory Intelligence

          </div>

          {

            readiness.advisoryItems
            &&
            readiness.advisoryItems.length > 0

              ? (

                  <ul>

                    {readiness.advisoryItems.map(

                      (
                        item:string,
                        idx:number
                      )=>(

                        <li key={idx}>

                          {item}

                        </li>
                      )
                    )}

                  </ul>
                )

              : (

                  <div className="jd-positive-state">

                    ✔ No advisory actions required

                  </div>
                )
          }

        </div>

        {/* ========================================= */}
        {/* VERIFIED */}
        {/* ========================================= */}

        <div className="jd-readiness-card">

          <div
            className="jd-readiness-card-title"
            style={{
              color:"#166534"
            }}
          >

            Verified Operational Systems

          </div>

          {

            readiness.verifiedSystems
            &&
            readiness.verifiedSystems.length > 0

              ? (

                  <ul>

                    {readiness.verifiedSystems.map(

                      (
                        item:string,
                        idx:number
                      )=>(

                        <li key={idx}>

                          ✓ {item}

                        </li>
                      )
                    )}

                  </ul>
                )

              : (

                  <div className="jd-positive-state">

                    No verified systems recorded

                  </div>
                )
          }

        </div>

        {/* ========================================= */}
        {/* MISSING */}
        {/* ========================================= */}

        <div className="jd-readiness-card">

          <div
            className="jd-readiness-card-title"
            style={{
              color:"#1d4ed8"
            }}
          >

            Missing Spare Coverage

          </div>

          {

            readiness.missingSystems
            &&
            readiness.missingSystems.length > 0

              ? (

                  <ul>

                    {readiness.missingSystems.map(

                      (
                        item:string,
                        idx:number
                      )=>(

                        <li key={idx}>

                          {item}

                        </li>
                      )
                    )}

                  </ul>
                )

              : (

                  <div className="jd-positive-state">

                    ✔ Operational spare coverage complete

                  </div>
                )
          }

        </div>

      </div>

    </section>
  )
}