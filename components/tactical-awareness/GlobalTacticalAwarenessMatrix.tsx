"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/tactical-awareness/GlobalTacticalAwarenessMatrix.tsx

   Timestamp:
   12 May 2026 10:15 (Sydney)

   PURPOSE:
   Global tactical awareness matrix
===================================================== */

import React from "react"

const awareness = [

  {

    label:"Threat Awareness",

    value:"98%"
  },

  {

    label:"Mission Visibility",

    value:"96%"
  },

  {

    label:"AI Awareness",

    value:"97%"
  },

  {

    label:"Federation Stability",

    value:"95%"
  }
]

export default function GlobalTacticalAwarenessMatrix(){

  return (

    <div className="jd-awareness-shell">

      <div className="jd-panel-title">

        Tactical Awareness Matrix

      </div>

      <div className="jd-awareness-grid">

        {

          awareness.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-awareness-card"
              >

                <div className="jd-awareness-label">

                  {item.label}

                </div>

                <div className="jd-awareness-value">

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
