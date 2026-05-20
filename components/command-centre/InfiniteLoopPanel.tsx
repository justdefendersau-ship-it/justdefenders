"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/InfiniteLoopPanel.tsx

   Timestamp:
   13 May 2026 19:45 (Sydney)

   PURPOSE:
   Infinite survivability visualisation
===================================================== */

import React from "react"

import {

  getInfiniteLoops

}
from "../../lib/infinite/infiniteSurvivabilityLoopEngine"

export default function InfiniteLoopPanel(){

  const loops =
    getInfiniteLoops()

  return (

    <div className="jd-inf-shell">

      <div className="jd-inf-header">

        INFINITE SURVIVABILITY INTELLIGENCE LOOP

      </div>

      {

        loops.map(

          (
            loop:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-inf-card ${loop.loopState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-inf-top">

                <div>

                  <div className="jd-inf-domain">

                    {loop.survivabilityDomain}

                  </div>

                  <div className="jd-inf-cycles">

                    Cycles:
                    {" "}
                    {loop.optimisationCycles}

                  </div>

                </div>

                <div className="jd-inf-state">

                  {loop.loopState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-inf-grid">

                <div>

                  Learning:
                  {" "}
                  {loop.adaptiveLearningRate}%

                </div>

                <div>

                  Continuity:
                  {" "}
                  {loop.survivabilityContinuity}%

                </div>

                <div>

                  Infinite AI:
                  {" "}
                  {loop.aiLoopConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-inf-actions">

                {

                  loop.autonomousLoopActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-inf-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* PATTERNS */}
              {/* ============================= */}

              <div className="jd-inf-patterns">

                {

                  loop.reinforcementPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-inf-pill"
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

              <div className="jd-inf-forecast">

                {loop.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
