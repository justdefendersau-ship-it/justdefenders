"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/presence/GlobalCommandPresence.tsx

   Timestamp:
   11 May 2026 22:45 (Sydney)

   PURPOSE:
   Global command presence federation
===================================================== */

import React from "react"

const nodes = [

  "Sydney",

  "Singapore",

  "Dubai",

  "London",

  "Berlin",

  "Washington"
]

export default function GlobalCommandPresence(){

  return (

    <div className="jd-presence-shell">

      <div className="jd-panel-title">

        Global Command Presence

      </div>

      <div className="jd-presence-grid">

        {

          nodes.map(
            (
              node,
              index
            )=>(

              <div
                key={index}
                className="jd-presence-node"
              >

                <div className="jd-presence-pulse" />

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
