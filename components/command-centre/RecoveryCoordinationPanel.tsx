"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/RecoveryCoordinationPanel.tsx

   Timestamp:
   13 May 2026 04:00 (Sydney)

   PURPOSE:
   Recovery coordination visualisation
===================================================== */

import React from "react"

import {

  getRecoveryOperations

}
from "../../lib/recovery/autonomousRecoveryCoordinationEngine"

export default function RecoveryCoordinationPanel(){

  const recoveries =
    getRecoveryOperations()

  return (

    <div className="jd-recovery-shell">

      <div className="jd-recovery-header">

        AUTONOMOUS RECOVERY COORDINATION

      </div>

      {

        recoveries.map(

          (
            recovery:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-recovery-card ${recovery.recoveryState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-recovery-top">

                <div>

                  <div className="jd-recovery-incident">

                    {recovery.incidentType}

                  </div>

                  <div className="jd-recovery-region">

                    {recovery.operationalRegion}

                  </div>

                </div>

                <div className="jd-recovery-state">

                  {recovery.recoveryState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-recovery-grid">

                <div>

                  Vehicles:
                  {" "}
                  {recovery.affectedVehicles}

                </div>

                <div>

                  Risk:
                  {" "}
                  {recovery.survivabilityRisk}%

                </div>

                <div>

                  Extraction:
                  {" "}
                  {recovery.extractionProbability}%

                </div>

                <div>

                  ETA:
                  {" "}
                  {recovery.recoveryEtaHours}h

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-recovery-actions">

                {

                  recovery.autonomousActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-recovery-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* ASSETS */}
              {/* ============================= */}

              <div className="jd-recovery-assets">

                {

                  recovery.deployedAssets?.map(

                    (
                      asset:string,
                      assetIdx:number
                    )=>(

                      <span
                        key={assetIdx}
                        className="jd-recovery-asset-pill"
                      >

                        {asset}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-recovery-forecast">

                {recovery.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
