"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/strategic-intelligence-reactor/NeuralPredictiveStrategicIntelligenceReactor.tsx

   Timestamp:
   13 May 2026 22:15 (Sydney)

   PURPOSE:
   Neural predictive strategic intelligence reactor
===================================================== */

import React from "react"

const reactor = [

  {

    label:"Predictive Intelligence",

    value:"99%"
  },

  {

    label:"Risk Cognition",

    value:"98%"
  },

  {

    label:"Strategic Sovereignty",

    value:"97%"
  },

  {

    label:"Operations Continuum",

    value:"96%"
  }
]

export default function NeuralPredictiveStrategicIntelligenceReactor(){

  return (

    <div className="jd-reactor-shell-v31">

      <div className="jd-panel-title">

        Strategic Intelligence Reactor

      </div>

      <div className="jd-reactor-grid-v31">

        {

          reactor.map(
            (
              item,
              index
            )=>(

              <div
                key={index}
                className="jd-reactor-card-v31"
              >

                <div className="jd-reactor-label-v31">

                  {item.label}

                </div>

                <div className="jd-reactor-value-v31">

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
