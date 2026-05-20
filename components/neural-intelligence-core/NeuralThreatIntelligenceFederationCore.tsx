"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/neural-intelligence-core/NeuralThreatIntelligenceFederationCore.tsx

   Timestamp:
   13 May 2026 08:15 (Sydney)

   PURPOSE:
   Neural threat intelligence federation core
===================================================== */

import React from "react"

const intelligence = [

  {

    label:"Neural Intelligence",

    value:"99%"
  },

  {

    label:"Threat Cognition",

    value:"98%"
  },

  {

    label:"Strategic Recovery",

    value:"97%"
  },

  {

    label:"Operational Sovereignty",

    value:"96%"
  }
]

export default function NeuralThreatIntelligenceFederationCore(){

  return (

    <div className="jd-neural-shell-v24">

      <div className="jd-panel-title">

        Neural Intelligence Federation

      </div>

      <div className="jd-neural-grid-v24">

        {

          intelligence.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-neural-card-v24"
              >

                <div className="jd-neural-label-v24">

                  {item.label}

                </div>

                <div className="jd-neural-value-v24">

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
