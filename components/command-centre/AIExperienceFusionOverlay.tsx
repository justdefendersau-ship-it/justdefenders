"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/AIExperienceFusionOverlay.tsx

   Timestamp:
   12 May 2026 22:00 (Sydney)

   PURPOSE:
   AI immersive orchestration overlay
===================================================== */

import React from "react"

import {

  useExperienceFusion

}
from "../../hooks/useExperienceFusion"

export default function AIExperienceFusionOverlay(){

  const fusion =
    useExperienceFusion()

  return (

    <div
      className={`jd-fusion-overlay ${fusion.adaptiveTheme}`}
    >

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="jd-fusion-top">

        <div>

          <div className="jd-fusion-label">

            AI EXPERIENCE ORCHESTRATION

          </div>

          <div className="jd-fusion-mode">

            {fusion.focusMode}

          </div>

        </div>

        <div className="jd-fusion-threat">

          {fusion.activeThreatLevel}

        </div>

      </div>

      {/* ============================================= */}
      {/* NARRATIVE */}
      {/* ============================================= */}

      <div className="jd-fusion-narrative">

        {fusion.aiNarrative}

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-fusion-grid">

        <div className="jd-fusion-card">

          <div className="jd-fusion-card-label">

            Operational Mood

          </div>

          <div className="jd-fusion-card-value">

            {fusion.operationalMood}

          </div>

        </div>

        <div className="jd-fusion-card">

          <div className="jd-fusion-card-label">

            Neural Priority

          </div>

          <div className="jd-fusion-card-value">

            {fusion.neuralPriority}

          </div>

        </div>

      </div>

    </div>
  )
}
