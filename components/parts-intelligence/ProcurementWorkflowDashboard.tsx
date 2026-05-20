"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ProcurementWorkflowDashboard.tsx
//
// Timestamp:
// 11 May 2026 16:45 (Sydney)
//
// PURPOSE:
// Procurement workflow persistence dashboard
// =====================================================

import React
from "react"

import {

  getSavedWorkflows

}
from "../../lib/parts-intelligence/procurementPersistenceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ProcurementWorkflowDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const workflows =
    getSavedWorkflows()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-workflow-shell">

      <div className="jd-workflow-header">

        Saved Operational Workflows

      </div>

      <div className="jd-workflow-subtitle">

        Expedition procurement,
        touring builds and
        operational workflow persistence

      </div>

      {

        workflows.length === 0

          ? (

              <div className="jd-positive-state">

                ✔ No saved workflows yet

              </div>
            )

          : (

              <div className="jd-workflow-grid">

                {

                  workflows.map(

                    (
                      workflow:any,
                      idx:number
                    )=>(

                      <div
                        key={idx}
                        className="jd-workflow-card"
                      >

                        <div className="jd-workflow-top">

                          <div>

                            <div className="jd-workflow-name">

                              {workflow.workflowName}

                            </div>

                            <div className="jd-workflow-type">

                              {workflow.workflowType}

                            </div>

                          </div>

                          <div className="jd-workflow-status">

                            {workflow.status}

                          </div>

                        </div>

                        {/* ======================= */}
                        {/* META */}
                        {/* ======================= */}

                        <div className="jd-workflow-meta">

                          Vehicle:

                          {" "}

                          <strong>

                            {

                              workflow.vehicleModel
                              ||
                              "N/A"

                            }

                          </strong>

                        </div>

                        <div className="jd-workflow-meta">

                          Route:

                          {" "}

                          <strong>

                            {

                              workflow.route
                              ||
                              "Global"

                            }

                          </strong>

                        </div>

                        <div className="jd-workflow-meta">

                          Parts:

                          {" "}

                          <strong>

                            {

                              workflow.partNumbers?.length
                            }

                          </strong>

                        </div>

                        <div className="jd-workflow-meta">

                          Estimated Total:

                          {" "}

                          <strong>

                            $

                            {

                              workflow.estimatedTotal
                            }

                          </strong>

                        </div>

                        {/* ======================= */}
                        {/* ACTIONS */}
                        {/* ======================= */}

                        <div className="jd-workflow-actions">

                          <button className="jd-primary-button">

                            Open Workflow

                          </button>

                          <button className="jd-secondary-button">

                            Export

                          </button>

                        </div>

                      </div>
                    )
                  )
                }

              </div>
            )
      }

    </section>
  )
}
