"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/sentient-command-core/QuantumSentientIntelligenceCommandCore.tsx

   Timestamp:
   13 May 2026 20:15 (Sydney)

   PURPOSE:
   Quantum sentient intelligence command core
===================================================== */

import React from "react"

const sentient = [

  {

    label:"Sentient Intelligence",

    value:"99%"
  },

  {

    label:"Planetary Dominance",

    value:"98%"
  },

  {

    label:"Strategic Infinity",

    value:"97%"
  },

  {

    label:"Unified Continuity",

    value:"96%"
  }
]

export default function QuantumSentientIntelligenceCommandCore(){

  return (

    <div className="jd-sentient-shell-v30">

      <div className="jd-panel-title">

        Sentient Intelligence Command Core

      </div>

      <div className="jd-sentient-grid-v30">

        {

          sentient.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-sentient-card-v30"
              >

                <div className="jd-sentient-label-v30">

                  {item.label}

                </div>

                <div className="jd-sentient-value-v30">

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
