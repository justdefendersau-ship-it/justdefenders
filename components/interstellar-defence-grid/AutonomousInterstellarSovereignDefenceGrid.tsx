"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/interstellar-defence-grid/AutonomousInterstellarSovereignDefenceGrid.tsx

   Timestamp:
   14 May 2026 02:15 (Sydney)

   PURPOSE:
   Autonomous interstellar sovereign defence grid
===================================================== */

import React from "react"

const interstellar = [

  "Pacific Interstellar Shield",

  "Atlantic Sovereign Command",

  "European Tactical Dominion",

  "Infinite Strategic Nexus"
]

export default function AutonomousInterstellarSovereignDefenceGrid(){

  return (

    <div className="jd-interstellar-shell-v33">

      <div className="jd-panel-title">

        Interstellar Sovereign Defence Grid

      </div>

      {

        interstellar.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-interstellar-card-v33"
            >

              <div className="jd-interstellar-indicator-v33" />

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
