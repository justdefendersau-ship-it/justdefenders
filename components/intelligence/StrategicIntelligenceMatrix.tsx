"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/intelligence/StrategicIntelligenceMatrix.tsx

   Timestamp:
   12 May 2026 01:30 (Sydney)

   PURPOSE:
   Strategic intelligence federation matrix
===================================================== */

import React from "react"

const intelligence = [

  {

    label:"Global Threat Index",

    value:"92%"
  },

  {

    label:"AI Federation Stability",

    value:"98%"
  },

  {

    label:"Telemetry Synchronisation",

    value:"96%"
  },

  {

    label:"Mission Readiness",

    value:"94%"
  }
]

export default function StrategicIntelligenceMatrix(){

  return (

    <div className="jd-intel-shell">

      <div className="jd-panel-title">

        Strategic Intelligence Matrix

      </div>

      <div className="jd-intel-grid">

        {

          intelligence.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-intel-card"
              >

                <div className="jd-intel-label">

                  {item.label}

                </div>

                <div className="jd-intel-value">

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
