"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/defence-singularity-network/AutonomousUnifiedDefenceSingularityNetwork.tsx

   Timestamp:
   13 May 2026 12:15 (Sydney)

   PURPOSE:
   Autonomous unified defence singularity network
===================================================== */

import React from "react"

const singularity = [

  "Pacific Defence Continuum",

  "Atlantic Sovereign Federation",

  "European Stability Grid",

  "Quantum Strategic Nexus"
]

export default function AutonomousUnifiedDefenceSingularityNetwork(){

  return (

    <div className="jd-singularity-shell-v26">

      <div className="jd-panel-title">

        Defence Singularity Network

      </div>

      {

        singularity.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-singularity-card-v26"
            >

              <div className="jd-singularity-indicator-v26" />

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
