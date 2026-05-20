"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/defence-mesh/AutonomousGlobalDefenceMesh.tsx

   Timestamp:
   12 May 2026 16:15 (Sydney)

   PURPOSE:
   Autonomous global defence mesh
===================================================== */

import React from "react"

const defenceNodes = [

  "Pacific Defence Mesh",

  "Atlantic Defence Grid",

  "European Stability Mesh",

  "Quantum Recovery Mesh"
]

export default function AutonomousGlobalDefenceMesh(){

  return (

    <div className="jd-defence-shell-v16">

      <div className="jd-panel-title">

        Global Defence Mesh

      </div>

      {

        defenceNodes.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-defence-card-v16"
            >

              <div className="jd-defence-indicator-v16" />

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
