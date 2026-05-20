"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/GlobalExpeditionIntelligenceGraphDashboard.tsx
//
// Timestamp:
// 12 May 2026 13:45 (Sydney)
//
// PURPOSE:
// Global expedition intelligence graph dashboard
// =====================================================

import React
from "react"

import {

  getGlobalIntelligenceGraphs,
  getGlobalGraphConfidenceIndex

}
from "../../lib/parts-intelligence/globalExpeditionIntelligenceGraphEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function GlobalExpeditionIntelligenceGraphDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const graphs =
    getGlobalIntelligenceGraphs()

  const confidence =
    getGlobalGraphConfidenceIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-graph-shell">

      <div className="jd-graph-header">

        Global Expedition Intelligence Graph

      </div>

      <div className="jd-graph-subtitle">

        Cross-domain dependency intelligence,
        expedition relationship orchestration and
        predictive neural graph modelling

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-graph-index">

        Graph Correlation Confidence Index:

        {" "}

        <strong>

          {confidence}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-graph-grid">

        {

          graphs.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-graph-card"
              >

                <div className="jd-graph-top">

                  <div>

                    <div className="jd-graph-region">

                      {item.expeditionRegion}

                    </div>

                    <div className="jd-graph-state">

                      {

                        item.graphState

                      }

                    </div>

                  </div>

                  <div className="jd-graph-confidence">

                    {

                      item.predictiveCorrelationConfidence

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-graph-metric">

                  Connected Entities:

                  {" "}

                  <strong>

                    {

                      item.connectedEntities

                    }

                  </strong>

                </div>

                <div className="jd-graph-metric">

                  Operational Dependencies:

                  {" "}

                  <strong>

                    {

                      item.operationalDependencies

                    }

                  </strong>

                </div>

                <div className="jd-graph-metric">

                  Survivability Relationships:

                  {" "}

                  <strong>

                    {

                      item.survivabilityRelationships

                    }

                  </strong>

                </div>

                <div className="jd-graph-metric">

                  Logistics Relationships:

                  {" "}

                  <strong>

                    {

                      item.logisticsRelationships

                    }

                  </strong>

                </div>

                {/* =============================== */}
                {/* FORECASTS */}
                {/* =============================== */}

                <div className="jd-graph-section">

                  <div className="jd-graph-section-title">

                    Dependency Forecasts

                  </div>

                  <ul>

                    {

                      item.dependencyForecasts?.map(

                        (
                          forecast:string,
                          forecastIdx:number
                        )=>(

                          <li key={forecastIdx}>

                            {forecast}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* RELATIONSHIPS */}
                {/* =============================== */}

                <div className="jd-graph-section">

                  <div className="jd-graph-section-title">

                    Neural Relationships

                  </div>

                  <ul>

                    {

                      item.neuralRelationships?.map(

                        (
                          relationship:string,
                          relationshipIdx:number
                        )=>(

                          <li key={relationshipIdx}>

                            {relationship}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* BUTTON */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  Open Intelligence Graph

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
