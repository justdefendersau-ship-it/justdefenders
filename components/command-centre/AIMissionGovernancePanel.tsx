"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/AIMissionGovernancePanel.tsx

   Timestamp:
   13 May 2026 08:30 (Sydney)

   PURPOSE:
   AI mission governance visualisation
===================================================== */

import React from "react"

import {

  getMissionGovernance

}
from "../../lib/governance/aiMissionGovernanceEngine"

export default function AIMissionGovernancePanel(){

  const governance =
    getMissionGovernance()

  return (

    <div className="jd-governance-shell">

      <div className="jd-governance-header">

        AI AUTONOMOUS MISSION GOVERNANCE

      </div>

      {

        governance.map(

          (
            mission:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-governance-card ${mission.governanceState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-governance-top">

                <div>

                  <div className="jd-governance-name">

                    {mission.missionName}

                  </div>

                  <div className="jd-governance-level">

                    Escalation:
                    {" "}
                    {mission.strategicEscalationLevel}

                  </div>

                </div>

                <div className="jd-governance-state">

                  {mission.governanceState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-governance-grid">

                <div>

                  Risk:
                  {" "}
                  {mission.convoyRisk}%

                </div>

                <div>

                  Survivability:
                  {" "}
                  {mission.survivabilityProbability}%

                </div>

                <div>

                  AI Authority:
                  {" "}
                  {mission.aiAuthorityConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* DIRECTIVES */}
              {/* ============================= */}

              <div className="jd-governance-directives">

                {

                  mission.autonomousDirectives?.map(

                    (
                      directive:string,
                      directiveIdx:number
                    )=>(

                      <div
                        key={directiveIdx}
                        className="jd-governance-directive"
                      >

                        {directive}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-governance-actions">

                {

                  mission.governanceActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <span
                        key={actionIdx}
                        className="jd-governance-pill"
                      >

                        {action}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-governance-forecast">

                {mission.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
