"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ProcurementAutomationDashboard.tsx
//
// Timestamp:
// 11 May 2026 19:45 (Sydney)
//
// PURPOSE:
// Procurement automation operational dashboard
// =====================================================

import React
from "react"

import {

  getAllProcurementAutomations,
  getAutomationHealthScore

}
from "../../lib/parts-intelligence/procurementAutomationEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function ProcurementAutomationDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const automations =
    getAllProcurementAutomations()

  const health =
    getAutomationHealthScore()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-automation-shell">

      <div className="jd-automation-header">

        Real-Time Procurement Automation

      </div>

      <div className="jd-automation-subtitle">

        Automated expedition procurement,
        inventory escalation and
        operational supply orchestration

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-automation-health">

        Automation Health Score:

        {" "}

        <strong>

          {

            Math.round(
              health * 100
            )

          }%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-automation-grid">

        {

          automations.map(

            (
              automation:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-automation-card"
              >

                <div className="jd-automation-top">

                  <div>

                    <div className="jd-automation-name">

                      {automation.workflowName}

                    </div>

                    <div className="jd-automation-route">

                      {automation.route}

                    </div>

                  </div>

                  <div className="jd-automation-status">

                    {

                      automation.automationStatus

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* VEHICLE */}
                {/* =============================== */}

                <div className="jd-automation-meta">

                  Vehicle:

                  {" "}

                  <strong>

                    {automation.vehicleModel}

                  </strong>

                </div>

                {/* =============================== */}
                {/* SUPPLIER */}
                {/* =============================== */}

                <div className="jd-automation-meta">

                  Recommended Supplier:

                  {" "}

                  <strong>

                    {

                      automation.recommendedSupplier

                    }

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTION */}
                {/* =============================== */}

                <div className="jd-automation-action">

                  {

                    automation.recommendedAction

                  }

                </div>

                {/* =============================== */}
                {/* CONFIDENCE */}
                {/* =============================== */}

                <div className="jd-automation-confidence">

                  Confidence:

                  {" "}

                  <strong>

                    {

                      Math.round(

                        automation.automationConfidence
                        * 100

                      )

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* BUTTON */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  View Automation

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
