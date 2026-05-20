"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/alerts/AlertCorrelationMesh.tsx

   Timestamp:
   11 May 2026 22:45 (Sydney)

   PURPOSE:
   Enterprise alert correlation mesh
===================================================== */

import React from "react"

const alerts = [

  {

    level:"CRITICAL",

    event:"Federation escalation threshold exceeded"
  },

  {

    level:"HIGH",

    event:"Telemetry volatility increasing"
  },

  {

    level:"MODERATE",

    event:"AI prediction anomaly detected"
  }
]

export default function AlertCorrelationMesh(){

  return (

    <div className="jd-alert-shell">

      <div className="jd-panel-title">

        Alert Correlation Mesh

      </div>

      {

        alerts.map(
          (
            alert,
            index
          )=>(

            <div
              key={index}
              className={`jd-alert-card ${alert.level.toLowerCase()}`}
            >

              <div className="jd-alert-level">

                {alert.level}

              </div>

              <div>

                {alert.event}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
