"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/sentinel-defence-matrix/AutonomousSentinelPlanetaryDefenceMatrix.tsx

   Timestamp:
   13 May 2026 10:15 (Sydney)

   PURPOSE:
   Autonomous sentinel planetary defence matrix
===================================================== */

import React from "react"

const sentinel = [

  "Pacific Sentinel Grid",

  "Atlantic Strategic Shield",

  "European Sovereign Defence",

  "Quantum Mission Nexus"
]

export default function AutonomousSentinelPlanetaryDefenceMatrix(){

  return (

    <div className="jd-sentinel-shell-v25">

      <div className="jd-panel-title">

        Sentinel Planetary Defence Matrix

      </div>

      {

        sentinel.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-sentinel-card-v25"
            >

              <div className="jd-sentinel-indicator-v25" />

              <div>

                {item}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
