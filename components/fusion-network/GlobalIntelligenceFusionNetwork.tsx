"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/fusion-network/GlobalIntelligenceFusionNetwork.tsx

   Timestamp:
   12 May 2026 06:15 (Sydney)

   PURPOSE:
   Global intelligence fusion network
===================================================== */

import React from "react"

const nodes = [

  "Pacific Intelligence",

  "European Surveillance",

  "Atlantic Coordination",

  "Middle East Operations"
]

export default function GlobalIntelligenceFusionNetwork(){

  return (

    <div className="jd-fusion-shell">

      <div className="jd-panel-title">

        Intelligence Fusion Network

      </div>

      {

        nodes.map(
          (
            node,
            index
          )=>(

            <div
              key={index}
              className="jd-fusion-card"
            >

              {node}

            </div>
          )
        )
      }

    </div>
  )
}
