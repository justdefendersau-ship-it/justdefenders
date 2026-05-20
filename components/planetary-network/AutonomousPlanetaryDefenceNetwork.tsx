"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/planetary-network/AutonomousPlanetaryDefenceNetwork.tsx

   Timestamp:
   12 May 2026 18:15 (Sydney)

   PURPOSE:
   Autonomous planetary defence network
===================================================== */

import React from "react"

const networkNodes = [

  "Pacific Planetary Grid",

  "Atlantic Defence Core",

  "European Stability Nexus",

  "Quantum Federation Shield"
]

export default function AutonomousPlanetaryDefenceNetwork(){

  return (

    <div className="jd-planetary-shell-v17">

      <div className="jd-panel-title">

        Planetary Defence Network

      </div>

      {

        networkNodes.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-planetary-card-v17"
            >

              <div className="jd-planetary-indicator-v17" />

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
