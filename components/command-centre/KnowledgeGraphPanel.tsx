"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/KnowledgeGraphPanel.tsx

   Timestamp:
   13 May 2026 07:45 (Sydney)

   PURPOSE:
   Expedition knowledge graph visualisation
===================================================== */

import React from "react"

import {

  getExpeditionKnowledgeGraph

}
from "../../lib/knowledge/expeditionKnowledgeGraphEngine"

export default function KnowledgeGraphPanel(){

  const graph =
    getExpeditionKnowledgeGraph()

  return (

    <div className="jd-knowledge-shell">

      <div className="jd-knowledge-header">

        EXPEDITION KNOWLEDGE GRAPH

      </div>

      {

        graph.map(

          (
            node:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-knowledge-card ${node.federationState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-knowledge-top">

                <div>

                  <div className="jd-knowledge-name">

                    {node.entityName}

                  </div>

                  <div className="jd-knowledge-type">

                    {node.entityType}

                  </div>

                </div>

                <div className="jd-knowledge-state">

                  {node.federationState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-knowledge-grid">

                <div>

                  Connections:
                  {" "}
                  {node.connectedEntities}

                </div>

                <div>

                  Correlation:
                  {" "}
                  {node.survivabilityCorrelation}%

                </div>

                <div>

                  AI Confidence:
                  {" "}
                  {node.aiKnowledgeConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* INSIGHTS */}
              {/* ============================= */}

              <div className="jd-knowledge-insights">

                {

                  node.autonomousInsights?.map(

                    (
                      insight:string,
                      insightIdx:number
                    )=>(

                      <div
                        key={insightIdx}
                        className="jd-knowledge-insight"
                      >

                        {insight}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* ASSOCIATIONS */}
              {/* ============================= */}

              <div className="jd-knowledge-associations">

                {

                  node.componentAssociations?.map(

                    (
                      assoc:string,
                      assocIdx:number
                    )=>(

                      <span
                        key={assocIdx}
                        className="jd-knowledge-pill"
                      >

                        {assoc}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-knowledge-forecast">

                {node.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
