"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/operations-matrix/GlobalOperationalIntelligenceMatrix.tsx

   Timestamp:
   12 May 2026 12:15 (Sydney)

   PURPOSE:
   Global operational intelligence matrix
===================================================== */

import React from "react"

const operations = [

  {

    label:"Mission Intelligence",

    value:"99%"
  },

  {

    label:"Threat Stability",

    value:"97%"
  },

  {

    label:"AI Coordination",

    value:"98%"
  },

  {

    label:"Federation Continuity",

    value:"96%"
  }
]

export default function GlobalOperationalIntelligenceMatrix(){

  return (

    <div className="jd-ops-shell">

      <div className="jd-panel-title">

        Operational Intelligence Matrix

      </div>

      <div className="jd-ops-grid">

        {

          operations.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-ops-card"
              >

                <div className="jd-ops-label">

                  {item.label}

                </div>

                <div className="jd-ops-value">

                  {item.value}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}
