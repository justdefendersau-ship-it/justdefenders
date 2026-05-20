"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/strategic-grid/GlobalStrategicOperationsGrid.tsx

   Timestamp:
   12 May 2026 04:15 (Sydney)

   PURPOSE:
   Global strategic operations grid
===================================================== */

import React from "react"

const operations = [

  "Pacific Federation",

  "Atlantic Intelligence",

  "European Tactical Grid",

  "Middle East Surveillance"
]

export default function GlobalStrategicOperationsGrid(){

  return (

    <div className="jd-strategic-shell">

      <div className="jd-panel-title">

        Strategic Operations Grid

      </div>

      {

        operations.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-strategic-card"
            >

              {item}

            </div>
          )
        )
      }

    </div>
  )
}
