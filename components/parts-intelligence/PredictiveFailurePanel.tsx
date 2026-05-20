"use client";

// =====================================================
// JustDefenders ©
// Predictive Failure Intelligence
// Phase 5A — Explainability Integration
// =====================================================

import React
from "react"

import {

  getPredictiveFailureIntelligence

}
from "../../lib/parts-intelligence/predictiveFailureEngine"

import {

  getOperationalReasoning

}
from "../../lib/parts-intelligence/operationalReasoningEngine"

import ExplainableReasoningPanel
from "./ExplainableReasoningPanel"

// =====================================================
// COMPONENT
// =====================================================

export default function PredictiveFailurePanel({

  selectedTouring,
  selectedVehicle

}:any){

  // ===================================================
  // ENGINE RESPONSES
  // ===================================================

  const predictiveResponse =
    getPredictiveFailureIntelligence(

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

  const predictive =
    predictiveResponse.data || []

  const reasoning =
    reasoningResponse.data || []

  // ===================================================
  // MATCH REASONING
  // ===================================================

  const getReasoningForPrediction = (

    prediction:any

  ) => {

    return reasoning.find(

      (item:any)=>

        item.relatedParts?.some(

          (part:string)=>

            prediction.linkedParts?.includes(
              part
            )
        )
    )
  }

  // ===================================================
  // GROUPS
  // ===================================================

  const high =
    predictive.filter(

      (item:any)=>

        item.severity === "critical"
        ||
        item.severity === "high"
    )

  const medium =
    predictive.filter(

      (item:any)=>

        item.severity === "medium"
    )

  const low =
    predictive.filter(

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
    colour:string

  ) => (

    <div className="jd-predictive-card">

      <div
        className="jd-predictive-title"
        style={{
          color:colour
        }}
      >

        {title}

      </div>

      {

        items.length > 0

          ? (

              <div className="jd-predictive-list">

                {

                  items.map(

                    (
                      item:any,
                      idx:number
                    )=>{

                      const matchedReasoning =
                        getReasoningForPrediction(
                          item
                        )

                      return (

                        <div
                          key={idx}
                          className="jd-predictive-item"
                        >

                          {/* =================== */}
                          {/* TITLE */}
                          {/* =================== */}

                          <div className="jd-predictive-item-title">

                            {item.title}

                          </div>

                          {/* =================== */}
                          {/* SUMMARY */}
                          {/* =================== */}

                          <div className="jd-predictive-summary">

                            {item.summary}

                          </div>

                          {/* =================== */}
                          {/* META */}
                          {/* =================== */}

                          <div className="jd-predictive-meta">

                            <strong>
                              Operational Impact:
                            </strong>

                            {" "}

                            {item.operationalImpact}

                          </div>

                          <div className="jd-predictive-meta">

                            <strong>
                              Failure Likelihood:
                            </strong>

                            {" "}

                            {

                              Math.round(

                                item.failureLikelihood * 100

                              )

                            }%

                          </div>

                          <div className="jd-predictive-meta">

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

                          {/* =================== */}
                          {/* EXPLAINABILITY */}
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

                        </div>
                      )
                    }
                  )
                }

              </div>
            )

          : (

              <div className="jd-positive-state">

                ✔ No predictive operational risks detected

              </div>
            )
      }

    </div>
  )

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-predictive-shell">

      <div className="jd-predictive-header">

        Predictive Failure Intelligence

      </div>

      <div className="jd-predictive-subtitle">

        Operational risk prediction using
        expedition intelligence,
        historical patterns and
        environmental stress modelling

      </div>

      <div className="jd-predictive-grid">

        {renderGroup(

          "High Risk",

          high,

          "#b91c1c"
        )}

        {renderGroup(

          "Medium Risk",

          medium,

          "#b45309"
        )}

        {renderGroup(

          "Low Risk",

          low,

          "#166534"
        )}

      </div>

    </section>
  )
}
