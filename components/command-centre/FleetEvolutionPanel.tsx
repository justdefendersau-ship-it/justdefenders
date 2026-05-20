"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/FleetEvolutionPanel.tsx

   Timestamp:
   13 May 2026 12:15 (Sydney)

   PURPOSE:
   Fleet evolution intelligence visualisation
===================================================== */

import React from "react"

import {

  getFleetEvolutionStreams

}
from "../../lib/evolution/autonomousFleetEvolutionEngine"

export default function FleetEvolutionPanel(){

  const evolution =
    getFleetEvolutionStreams()

  return (

    <div className="jd-evo-shell">

      <div className="jd-evo-header">

        AUTONOMOUS FLEET EVOLUTION

      </div>

      {

        evolution.map(

          (
            stream:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-evo-card ${stream.evolutionState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-evo-top">

                <div>

                  <div className="jd-evo-name">

                    {stream.fleetPlatform}

                  </div>

                  <div className="jd-evo-generations">

                    Generations:
                    {" "}
                    {stream.optimisationGenerations}

                  </div>

                </div>

                <div className="jd-evo-state">

                  {stream.evolutionState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-evo-grid">

                <div>

                  Survivability Gain:
                  {" "}
                  {stream.survivabilityGain}%

                </div>

                <div>

                  Adaptation:
                  {" "}
                  {stream.adaptationRate}%

                </div>

                <div>

                  AI Evolution:
                  {" "}
                  {stream.aiEvolutionConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* UPGRADES */}
              {/* ============================= */}

              <div className="jd-evo-upgrades">

                {

                  stream.autonomousUpgrades?.map(

                    (
                      upgrade:string,
                      upgradeIdx:number
                    )=>(

                      <div
                        key={upgradeIdx}
                        className="jd-evo-upgrade"
                      >

                        {upgrade}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* MUTATIONS */}
              {/* ============================= */}

              <div className="jd-evo-mutations">

                {

                  stream.mutationPatterns?.map(

                    (
                      mutation:string,
                      mutationIdx:number
                    )=>(

                      <span
                        key={mutationIdx}
                        className="jd-evo-pill"
                      >

                        {mutation}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-evo-forecast">

                {stream.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
