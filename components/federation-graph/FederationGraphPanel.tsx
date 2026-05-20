"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/federation-graph/FederationGraphPanel.tsx

   Timestamp:
   11 May 2026 19:45 (Sydney)

   PURPOSE:
   Live federation graph visualisation
===================================================== */

import React
from "react"

const nodes = [

  "Sydney",

  "Singapore",

  "Dubai",

  "London",

  "New York"
]

export default function FederationGraphPanel(){

  return (

    <div className="jd-graph-shell">

      <div className="jd-panel-title">

        Federation Graph

      </div>

      <div className="jd-graph-grid">

        {

          nodes.map(
            (
              node,
              index
            )=>(

              <div
                key={index}
                className="jd-graph-node"
              >

                <div className="jd-node-pulse" />

                <div>

                  {node}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}
