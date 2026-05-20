"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-nexus/GlobalCommandNexusPanel.tsx

   Timestamp:
   12 May 2026 08:15 (Sydney)

   PURPOSE:
   Global command nexus visualisation
===================================================== */

import React from "react"

const commandNodes = [

  "Sydney Command Nexus",

  "Singapore Federation Hub",

  "London Strategic Grid",

  "Washington Operations Core"
]

export default function GlobalCommandNexusPanel(){

  return (

    <div className="jd-nexus-shell">

      <div className="jd-panel-title">

        Global Command Nexus

      </div>

      {

        commandNodes.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-nexus-card"
            >

              <div className="jd-nexus-indicator" />

              <div>

                {item}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
