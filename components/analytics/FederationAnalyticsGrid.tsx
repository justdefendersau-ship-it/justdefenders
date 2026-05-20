"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/analytics/FederationAnalyticsGrid.tsx

   Timestamp:
   11 May 2026 21:15 (Sydney)

   PURPOSE:
   Real-time federation analytics
===================================================== */

import React from "react"

const metrics = [

  {

    label:"Threat Throughput",

    value:"98%"
  },

  {

    label:"Federation Stability",

    value:"99.2%"
  },

  {

    label:"AI Correlation",

    value:"96%"
  },

  {

    label:"Mission Synchronisation",

    value:"94%"
  }
]

export default function FederationAnalyticsGrid(){

  return (

    <div className="jd-analytics-shell">

      <div className="jd-panel-title">

        Federation Analytics

      </div>

      <div className="jd-analytics-grid">

        {

          metrics.map(
            (
              metric,
              index
            )=>(

              <div
                key={index}
                className="jd-analytics-card"
              >

                <div className="jd-analytics-label">

                  {metric.label}

                </div>

                <div className="jd-analytics-value">

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
