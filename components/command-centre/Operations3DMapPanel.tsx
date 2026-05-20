"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/Operations3DMapPanel.tsx

   Timestamp:
   13 May 2026 01:00 (Sydney)

   PURPOSE:
   Expedition operations 3D mapping panel
===================================================== */

import React from "react"

import {

  expeditionMapNodes

}
from "../../lib/realtime/expeditionOperationsMapEngine"

export default function Operations3DMapPanel(){

  return (

    <div className="jd-operations-map-shell">

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="jd-operations-map-header">

        EXPEDITION OPERATIONS MAP

      </div>

      {/* ============================================= */}
      {/* MAP CANVAS */}
      {/* ============================================= */}

      <div className="jd-operations-map-canvas">

        {/* ========================================= */}
        {/* GRID */}
        {/* ========================================= */}

        <div className="jd-map-grid-overlay" />

        {/* ========================================= */}
        {/* TERRAIN */}
        {/* ========================================= */}

        <div className="jd-map-terrain terrain-1" />
        <div className="jd-map-terrain terrain-2" />
        <div className="jd-map-terrain terrain-3" />

        {/* ========================================= */}
        {/* CONNECTIONS */}
        {/* ========================================= */}

        <svg
          className="jd-map-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >

          <line
            x1="18"
            y1="42"
            x2="68"
            y2="22"
            className="jd-map-line"
          />

          <line
            x1="68"
            y1="22"
            x2="74"
            y2="78"
            className="jd-map-line"
          />

          <line
            x1="18"
            y1="42"
            x2="36"
            y2="72"
            className="jd-map-line"
          />

        </svg>

        {/* ========================================= */}
        {/* NODES */}
        {/* ========================================= */}

        {

          expeditionMapNodes.map(

            (
              node:any,
              idx:number
            )=>(

              <div
                key={idx}
                className={`jd-map-node ${node.terrainRisk.toLowerCase()}`}
                style={{

                  left:`${node.x}%`,
                  top:`${node.y}%`
                }}
              >

                <div className="jd-map-node-pulse" />

                <div className="jd-map-node-card">

                  <div className="jd-map-node-region">

                    {node.region}

                  </div>

                  <div className="jd-map-node-risk">

                    {node.terrainRisk}

                  </div>

                  <div className="jd-map-node-metrics">

                    Survivability:
                    {" "}
                    {node.survivability}%

                  </div>

                  <div className="jd-map-node-metrics">

                    Convoy:
                    {" "}
                    {node.convoyStatus}

                  </div>

                  <div className="jd-map-node-weather">

                    {node.weatherThreat}

                  </div>

                </div>

              </div>
            )
          )
        }

        {/* ========================================= */}
        {/* HUD */}
        {/* ========================================= */}

        <div className="jd-map-hud">

          <div className="jd-map-hud-title">

            LIVE OPERATIONS OVERLAY

          </div>

          <div className="jd-map-hud-grid">

            <div>

              Active Convoys:
              {" "}
              12

            </div>

            <div>

              Terrain Threats:
              {" "}
              4

            </div>

            <div>

              Satellite Sync:
              {" "}
              97%

            </div>

            <div>

              AI Survivability:
              {" "}
              93%

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
