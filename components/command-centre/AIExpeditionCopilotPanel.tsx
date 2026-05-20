"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/AIExpeditionCopilotPanel.tsx

   Timestamp:
   13 May 2026 10:45 (Sydney)

   PURPOSE:
   AI expedition copilot visualisation
===================================================== */

import React from "react"

import {

  getExpeditionCopilots

}
from "../../lib/copilot/aiExpeditionCopilotEngine"

export default function AIExpeditionCopilotPanel(){

  const copilots =
    getExpeditionCopilots()

  return (

    <div className="jd-copilot-shell">

      <div className="jd-copilot-header">

        AI EXPEDITION COPILOT SYSTEM

      </div>

      {

        copilots.map(

          (
            copilot:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-copilot-card ${copilot.copilotState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-copilot-top">

                <div>

                  <div className="jd-copilot-name">

                    {copilot.convoyName}

                  </div>

                  <div className="jd-copilot-threads">

                    Threads:
                    {" "}
                    {copilot.activeConversationThreads}

                  </div>

                </div>

                <div className="jd-copilot-state">

                  {copilot.copilotState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-copilot-grid">

                <div>

                  AI:
                  {" "}
                  {copilot.aiConfidence}%

                </div>

                <div>

                  Awareness:
                  {" "}
                  {copilot.survivabilityAwareness}%

                </div>

                <div>

                  Predictive:
                  {" "}
                  {copilot.predictiveAccuracy}%

                </div>

              </div>

              {/* ============================= */}
              {/* ALERTS */}
              {/* ============================= */}

              <div className="jd-copilot-alerts">

                {

                  copilot.copilotAlerts?.map(

                    (
                      alert:string,
                      alertIdx:number
                    )=>(

                      <div
                        key={alertIdx}
                        className="jd-copilot-alert"
                      >

                        {alert}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* VOICE */}
              {/* ============================= */}

              <div className="jd-copilot-voice">

                {

                  copilot.voiceCommands?.map(

                    (
                      command:string,
                      commandIdx:number
                    )=>(

                      <span
                        key={commandIdx}
                        className="jd-copilot-pill"
                      >

                        {command}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-copilot-forecast">

                {copilot.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
