"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/SelfReplicatingMeshPanel.tsx

   Timestamp:
   13 May 2026 19:00 (Sydney)

   PURPOSE:
   Self-replicating intelligence visualisation
===================================================== */

import React from "react"

import {

  getReplicationMesh

}
from "../../lib/replication/selfReplicatingMeshEngine"

export default function SelfReplicatingMeshPanel(){

  const replication =
    getReplicationMesh()

  return (

    <div className="jd-rep-shell">

      <div className="jd-rep-header">

        SELF-REPLICATING EXPEDITION INTELLIGENCE

      </div>

      {

        replication.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-rep-card ${node.replicationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-rep-top">

                <div>

                  <div className="jd-rep-domain">

                    {node.meshDomain}

                  </div>

                  <div className="jd-rep-clusters">

                    Clusters:
                    {" "}
                    {node.activeReplicationClusters}

                  </div>

                </div>

                <div className="jd-rep-state">

                  {node.replicationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-rep-grid">

                <div>

                  Learning:
                  {" "}
                  {node.survivabilityLearningRate}%

                </div>

                <div>

                  Expansion:
                  {" "}
                  {node.autonomousExpansionIndex}%

                </div>

                <div>

                  Replication AI:
                  {" "}
                  {node.aiReplicationConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-rep-actions">

                {

                  node.autonomousReplicationActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-rep-action"
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

              <div className="jd-rep-patterns">

                {

                  node.recursivePatterns?.map(

                    (
                      pattern:string,
                      patternIdx:number
                    )=>(

                      <span
                        key={patternIdx}
                        className="jd-rep-pill"
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

              <div className="jd-rep-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
