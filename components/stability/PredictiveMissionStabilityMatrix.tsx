"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/stability/PredictiveMissionStabilityMatrix.tsx

   Timestamp:
   12 May 2026 02:45 (Sydney)

   PURPOSE:
   Predictive mission stability matrix
===================================================== */

import React from "react"

const metrics = [

  {

    label:"Mission Stability",

    value:"91%"
  },

  {

    label:"Federation Integrity",

    value:"97%"
  },

  {

    label:"AI Confidence",

    value:"95%"
  },

  {

    label:"Threat Containment",

    value:"93%"
  }
]

export default function PredictiveMissionStabilityMatrix(){

  return (

    <div className="jd-stability-shell">

      <div className="jd-panel-title">

        Mission Stability Matrix

      </div>

      <div className="jd-stability-grid">

        {

          metrics.map(
            (
              metric,
              index
            )=>(

              <div
                key={index}
                className="jd-stability-card"
              >

                <div className="jd-stability-label">

                  {metric.label}

                </div>

                <div className="jd-stability-value">

                  {metric.value}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}
