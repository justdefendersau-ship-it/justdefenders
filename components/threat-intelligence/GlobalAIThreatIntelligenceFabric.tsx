"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/threat-intelligence/GlobalAIThreatIntelligenceFabric.tsx

   Timestamp:
   12 May 2026 18:15 (Sydney)

   PURPOSE:
   Global AI threat intelligence fabric
===================================================== */

import React from "react"

const intelligence = [

  {

    label:"Threat Intelligence",

    value:"99%"
  },

  {

    label:"Quantum Awareness",

    value:"98%"
  },

  {

    label:"Mission Stability",

    value:"97%"
  },

  {

    label:"Federation Recovery",

    value:"96%"
  }
]

export default function GlobalAIThreatIntelligenceFabric(){

  return (

    <div className="jd-intel-shell-v17">

      <div className="jd-panel-title">

        AI Threat Intelligence

      </div>

      <div className="jd-intel-grid-v17">

        {

          intelligence.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-intel-card-v17"
              >

                <div className="jd-intel-label-v17">

                  {item.label}

                </div>

                <div className="jd-intel-value-v17">

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
