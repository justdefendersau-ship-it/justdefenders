"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/InterplanetaryReadinessPanel.tsx

   Timestamp:
   13 May 2026 16:00 (Sydney)

   PURPOSE:
   Interplanetary readiness visualisation
===================================================== */

import React from "react"

import {

  getInterplanetaryReadiness

}
from "../../lib/interplanetary/interplanetaryReadinessEngine"

export default function InterplanetaryReadinessPanel(){

  const readiness =
    getInterplanetaryReadiness()

  return (

    <div className="jd-inter-shell">

      <div className="jd-inter-header">

        INTERPLANETARY EXPEDITION READINESS

      </div>

      {

        readiness.map(

          (
            zone:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-inter-card ${zone.readinessState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-inter-top">

                <div>

                  <div className="jd-inter-zone">

                    {zone.planetaryZone}

                  </div>

                  <div className="jd-inter-complexity">

                    Complexity:
                    {" "}
                    {zone.environmentalComplexity}%

                  </div>

                </div>

                <div className="jd-inter-state">

                  {zone.readinessState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-inter-grid">

                <div>

                  Survivability:
                  {" "}
                  {zone.survivabilityReadiness}%

                </div>

                <div>

                  Gravity:
                  {" "}
                  {zone.gravityVariance}%

                </div>

                <div>

                  AI Mission:
                  {" "}
                  {zone.aiMissionConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* PREPARATIONS */}
              {/* ============================= */}

              <div className="jd-inter-preparations">

                {

                  zone.autonomousPreparations?.map(

                    (
                      prep:string,
                      prepIdx:number
                    )=>(

                      <div
                        key={prepIdx}
                        className="jd-inter-preparation"
                      >

                        {prep}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* PATTERNS */}
              {/* ============================= */}

              <div className="jd-inter-patterns">

                {

                  zone.planetaryPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-inter-pill"
                      >

                        {pattern}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-inter-forecast">

                {zone.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
