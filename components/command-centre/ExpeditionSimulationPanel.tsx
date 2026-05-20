"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/ExpeditionSimulationPanel.tsx

   Timestamp:
   13 May 2026 11:30 (Sydney)

   PURPOSE:
   Expedition simulation visualisation
===================================================== */

import React from "react"

import {

  getExpeditionSimulations

}
from "../../lib/simulation/expeditionSimulationEngine"

export default function ExpeditionSimulationPanel(){

  const simulations =
    getExpeditionSimulations()

  return (

    <div className="jd-sim-shell">

      <div className="jd-sim-header">

        REAL-TIME EXPEDITION SIMULATION ENGINE

      </div>

      {

        simulations.map(

          (
            sim:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-sim-card ${sim.simulationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-sim-top">

                <div>

                  <div className="jd-sim-name">

                    {sim.missionName}

                  </div>

                  <div className="jd-sim-iterations">

                    Iterations:
                    {" "}
                    {sim.simulationIterations}

                  </div>

                </div>

                <div className="jd-sim-state">

                  {sim.simulationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-sim-grid">

                <div>

                  Survivability:
                  {" "}
                  {sim.survivabilityProbability}%

                </div>

                <div>

                  Terrain:
                  {" "}
                  {sim.terrainRisk}%

                </div>

                <div>

                  Weather:
                  {" "}
                  {sim.weatherComplexity}%

                </div>

                <div>

                  AI:
                  {" "}
                  {sim.aiSimulationConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* EVENTS */}
              {/* ============================= */}

              <div className="jd-sim-events">

                {

                  sim.simulationEvents?.map(

                    (
                      event:string,
                      eventIdx:number
                    )=>(

                      <div
                        key={eventIdx}
                        className="jd-sim-event"
                      >

                        {event}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* OUTCOMES */}
              {/* ============================= */}

              <div className="jd-sim-outcomes">

                {

                  sim.branchOutcomes?.map(

                    (
                      outcome:string,
                      outcomeIdx:number
                    )=>(

                      <span
                        key={outcomeIdx}
                        className="jd-sim-pill"
                      >

                        {outcome}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-sim-forecast">

                {sim.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
