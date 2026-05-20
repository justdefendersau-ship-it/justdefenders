"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/PredictiveFailureSwarmPanel.tsx

   Timestamp:
   13 May 2026 06:15 (Sydney)

   PURPOSE:
   Predictive swarm intelligence visualisation
===================================================== */

import React from "react"

import {

  getPredictiveFailureSwarmEvents

}
from "../../lib/swarm/predictiveFailureSwarmIntelligenceEngine"

export default function PredictiveFailureSwarmPanel(){

  const swarm =
    getPredictiveFailureSwarmEvents()

  return (

    <div className="jd-swarm-shell">

      <div className="jd-swarm-header">

        AI PREDICTIVE FAILURE SWARM

      </div>

      {

        swarm.map(

          (
            item:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-swarm-card ${item.failureState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-swarm-top">

                <div>

                  <div className="jd-swarm-component">

                    {item.componentFamily}

                  </div>

                  <div className="jd-swarm-fleet">

                    Fleet Vehicles:
                    {" "}
                    {item.affectedFleetVehicles}

                  </div>

                </div>

                <div className="jd-swarm-state">

                  {item.failureState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-swarm-grid">

                <div>

                  Confidence:
                  {" "}
                  {item.anomalyConfidence}%

                </div>

                <div>

                  Failure ETA:
                  {" "}
                  {item.predictedFailureHours}h

                </div>

                <div>

                  Impact:
                  {" "}
                  {item.survivabilityImpact}%

                </div>

                <div>

                  Prevention:
                  {" "}
                  {item.preventativeSuccessProbability}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-swarm-actions">

                {

                  item.autonomousActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-swarm-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* RECOMMENDATIONS */}
              {/* ============================= */}

              <div className="jd-swarm-recommendations">

                {

                  item.preventativeRecommendations?.map(

                    (
                      rec:string,
                      recIdx:number
                    )=>(

                      <span
                        key={recIdx}
                        className="jd-swarm-pill"
                      >

                        {rec}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-swarm-forecast">

                {item.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
