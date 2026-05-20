"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/AutonomousGovernancePanel.tsx

   Timestamp:
   13 May 2026 18:15 (Sydney)

   PURPOSE:
   Autonomous governance visualisation
===================================================== */

import React from "react"

import {

  getAutonomousGovernance

}
from "../../lib/governance/autonomousMetaGovernanceEngine"

export default function AutonomousGovernancePanel(){

  const governance =
    getAutonomousGovernance()

  return (

    <div className="jd-gov-shell">

      <div className="jd-gov-header">

        AUTONOMOUS META-GOVERNANCE AI

      </div>

      {

        governance.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-gov-card ${node.governanceState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-gov-top">

                <div>

                  <div className="jd-gov-domain">

                    {node.governanceDomain}

                  </div>

                  <div className="jd-gov-integrity">

                    Integrity:
                    {" "}
                    {node.complianceIntegrity}%

                  </div>

                </div>

                <div className="jd-gov-state">

                  {node.governanceState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-gov-grid">

                <div>

                  Ethics:
                  {" "}
                  {node.survivabilityEthicsIndex}%

                </div>

                <div>

                  Consensus:
                  {" "}
                  {node.aiGovernanceConsensus}%

                </div>

                <div>

                  Governance AI:
                  {" "}
                  {node.governanceConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-gov-actions">

                {

                  node.autonomousGovernanceActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-gov-action"
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

              <div className="jd-gov-patterns">

                {

                  node.orchestrationPatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-gov-pill"
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

              <div className="jd-gov-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
