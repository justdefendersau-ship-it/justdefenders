"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/SentientCognitionPanel.tsx

   Timestamp:
   13 May 2026 17:30 (Sydney)

   PURPOSE:
   Sentient cognition visualisation
===================================================== */

import React from "react"

import {

  getSentientCognition

}
from "../../lib/sentient/sentientCognitionEngine"

export default function SentientCognitionPanel(){

  const cognition =
    getSentientCognition()

  return (

    <div className="jd-sent-shell">

      <div className="jd-sent-header">

        SENTIENT EXPEDITION COGNITION

      </div>

      {

        cognition.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-sent-card ${node.cognitionState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-sent-top">

                <div>

                  <div className="jd-sent-domain">

                    {node.cognitionDomain}

                  </div>

                  <div className="jd-sent-awareness">

                    Awareness:
                    {" "}
                    {node.contextualAwareness}%

                  </div>

                </div>

                <div className="jd-sent-state">

                  {node.cognitionState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-sent-grid">

                <div>

                  Emotional Risk:
                  {" "}
                  {node.emotionalRiskIndex}%

                </div>

                <div>

                  Human ↔ AI:
                  {" "}
                  {node.humanAISynchronisation}%

                </div>

                <div>

                  Cognition:
                  {" "}
                  {node.cognitionConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-sent-actions">

                {

                  node.autonomousCognitiveActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-sent-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* MEMORY */}
              {/* ============================= */}

              <div className="jd-sent-memory">

                {

                  node.memoryPatterns?.map(

                    (
                      memory:string,
                      memoryIdx:number
                    )=>(

                      <span
                        key={memoryIdx}
                        className="jd-sent-pill"
                      >

                        {memory}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-sent-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
