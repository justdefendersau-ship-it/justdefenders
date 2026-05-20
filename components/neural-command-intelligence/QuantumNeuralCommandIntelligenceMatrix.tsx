"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/neural-command-intelligence/QuantumNeuralCommandIntelligenceMatrix.tsx

   Timestamp:
   13 May 2026 18:15 (Sydney)

   PURPOSE:
   Quantum neural command intelligence matrix
===================================================== */

import React from "react"

const neural = [

  {

    label:"Neural Command",

    value:"99%"
  },

  {

    label:"Threat Sovereignty",

    value:"98%"
  },

  {

    label:"Planetary Continuity",

    value:"97%"
  },

  {

    label:"Unified Federation",

    value:"96%"
  }
]

export default function QuantumNeuralCommandIntelligenceMatrix(){

  return (

    <div className="jd-neural-shell-v29">

      <div className="jd-panel-title">

        Neural Command Intelligence Matrix

      </div>

      <div className="jd-neural-grid-v29">

        {

          neural.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-neural-card-v29"
              >

                <div className="jd-neural-label-v29">

                  {item.label}

                </div>

                <div className="jd-neural-value-v29">

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
