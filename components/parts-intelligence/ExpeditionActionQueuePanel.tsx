"use client";

// =====================================================
// JustDefenders ©
// Expedition Action Queue
// Phase 5B — Explainability Integration
// =====================================================

import React
from "react"

import {

  getExpeditionActionQueue

}
from "../../lib/parts-intelligence/expeditionActionQueueEngine"

import {

  getOperationalReasoning

}
from "../../lib/parts-intelligence/operationalReasoningEngine"

import ExplainableReasoningPanel
from "./ExplainableReasoningPanel"

// =====================================================
// COMPONENT
// =====================================================

export default function ExpeditionActionQueuePanel({

  selectedTouring,
  selectedVehicle

}:any){

  // ===================================================
  // ENGINE RESPONSES
  // ===================================================

  const actionResponse =
    getExpeditionActionQueue(

      selectedTouring,
      selectedVehicle

    )

  const reasoningResponse =
    getOperationalReasoning(

      selectedTouring,
      selectedVehicle

    )

  // ===================================================
  // DATA
  // ===================================================

  const actions =
    actionResponse.data || []

  const reasoning =
    reasoningResponse.data || []

  // ===================================================
  // MATCH REASONING
  // ===================================================

  const getReasoningForAction = (

    action:any

  ) => {

    // ================================================
    // PART MATCH
    // ================================================

    const partMatch =
      reasoning.find(

        (item:any)=>

          item.relatedParts?.some(

            (part:string)=>

              action.linkedParts?.includes(
                part
              )
          )
      )

    if(partMatch){

      return partMatch
    }

    // ================================================
    // ROUTE MATCH
    // ================================================

    const routeMatch =
      reasoning.find(

        (item:any)=>

          item.relatedRoutes?.includes(
            selectedTouring
          )
      )

    return routeMatch
  }

  // ===================================================
  // GROUPS
  // ===================================================

  const immediate =
    actions.filter(

      (item:any)=>

        item.severity === "critical"
    )

  const recommended =
    actions.filter(

      (item:any)=>

        item.severity === "high"
        ||
        item.severity === "medium"
    )

  const optional =
    actions.filter(

      (item:any)=>

        item.severity === "low"
        ||
        item.severity === "info"
    )

  // ===================================================
  // RENDER GROUP
  // ===================================================

  const renderGroup = (

    title:string,
    items:any[],
    badgeClass:string

  ) => (

    <div className="jd-action-column">

      <div className="jd-action-column-header">

        {title}

      </div>

      {

        items.length > 0

          ? (

              items.map(

                (
                  item:any,
                  idx:number
                )=>{

                  const matchedReasoning =
                    getReasoningForAction(
                      item
                    )

                  return (

                    <div
                      key={idx}
                      className="jd-action-item"
                    >

                      {/* =================== */}
                      {/* HEADER */}
                      {/* =================== */}

                      <div className="jd-action-top">

                        <div className={badgeClass}>

                          {item.severity.toUpperCase()}

                        </div>

                        <div className="jd-action-title">

                          {item.title}

                        </div>

                      </div>

                      {/* =================== */}
                      {/* SUMMARY */}
                      {/* =================== */}

                      <div className="jd-action-summary">

                        {item.summary}

                      </div>

                      {/* =================== */}
                      {/* META */}
                      {/* =================== */}

                      <div className="jd-action-meta">

                        <strong>
                          Operational Impact:
                        </strong>

                        {" "}

                        {item.operationalImpact}

                      </div>

                      <div className="jd-action-meta">

                        <strong>
                          Confidence:
                        </strong>

                        {" "}

                        {

                          Math.round(

                            item.confidence * 100

                          )

                        }%

                      </div>

                      <div className="jd-action-meta">

                        <strong>
                          Linked Parts:
                        </strong>

                        {" "}

                        {

                          item.linkedParts?.join(", ")
                          ||
                          "N/A"

                        }

                      </div>

                      {/* =================== */}
                      {/* RECOMMENDATIONS */}
                      {/* =================== */}

                      <div className="jd-action-meta">

                        <strong>
                          Recommended Actions:
                        </strong>

                      </div>

                      <ul className="jd-action-list">

                        {

                          item.recommendations.map(

                            (
                              rec:string,
                              recIdx:number
                            )=>(

                              <li key={recIdx}>

                                {rec}

                              </li>
                            )
                          )
                        }

                      </ul>

                      {/* =================== */}
                      {/* WHY PANEL */}
                      {/* =================== */}

                      {

                        matchedReasoning
                        &&
                        (

                          <ExplainableReasoningPanel

                            reasoning={
                              matchedReasoning
                            }

                          />
                        )
                      }

                      {/* =================== */}
                      {/* ACTION */}
                      {/* =================== */}

                      <button className="jd-primary-button">

                        View Suppliers

                      </button>

                    </div>
                  )
                }
              )
            )

          : (

              <div className="jd-positive-state">

                ✔ No operational actions required

              </div>
            )
      }

    </div>
  )

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-action-shell">

      <div className="jd-action-header">

        Expedition Action Queue

      </div>

      <div className="jd-action-subtitle">

        Prioritised operational preparation
        workflow with explainable expedition
        intelligence

      </div>

      <div className="jd-action-grid">

        {renderGroup(

          "Immediate",

          immediate,

          "jd-action-critical"
        )}

        {renderGroup(

          "Recommended",

          recommended,

          "jd-action-recommended"
        )}

        {renderGroup(

          "Optional",

          optional,

          "jd-action-optional"
        )}

      </div>

    </section>
  )
}
