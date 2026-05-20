"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/AutonomousStrategicCommandDashboard.tsx
//
// Timestamp:
// 12 May 2026 13:00 (Sydney)
//
// PURPOSE:
// Autonomous strategic command dashboard
// =====================================================

import React
from "react"

import {

  getAutonomousStrategicCommands,
  getStrategicCommandIndex

}
from "../../lib/parts-intelligence/autonomousStrategicCommandEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function AutonomousStrategicCommandDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const commands =
    getAutonomousStrategicCommands()

  const commandIndex =
    getStrategicCommandIndex()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-command-shell">

      <div className="jd-command-header">

        Autonomous Strategic Command Layer

      </div>

      <div className="jd-command-subtitle">

        AI command orchestration,
        expedition governance intelligence and
        autonomous strategic coordination

      </div>

      {/* ============================================= */}
      {/* INDEX */}
      {/* ============================================= */}

      <div className="jd-command-index">

        Strategic Command Index:

        {" "}

        <strong>

          {commandIndex}%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-command-grid">

        {

          commands.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-command-card"
              >

                <div className="jd-command-top">

                  <div>

                    <div className="jd-command-region">

                      {item.commandRegion}

                    </div>

                    <div className="jd-command-state">

                      {

                        item.strategicCommandState

                      }

                    </div>

                  </div>

                  <div className="jd-command-confidence">

                    {

                      item.aiCommandConfidence

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* METRICS */}
                {/* =============================== */}

                <div className="jd-command-metric">

                  Mission Synchronisation:

                  {" "}

                  <strong>

                    {

                      item.missionSynchronisationIndex

                    }%

                  </strong>

                </div>

                <div className="jd-command-metric">

                  Governance Index:

                  {" "}

                  <strong>

                    {

                      item.operationalGovernanceIndex

                    }%

                  </strong>

                </div>

                <div className="jd-command-metric">

                  Survivability Alignment:

                  {" "}

                  <strong>

                    {

                      item.survivabilityAlignmentIndex

                    }%

                  </strong>

                </div>

                <div className="jd-command-metric">

                  Logistics Coordination:

                  {" "}

                  <strong>

                    {

                      item.logisticsCoordinationIndex

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-command-section">

                  <div className="jd-command-section-title">

                    Autonomous Command Actions

                  </div>

                  <ul>

                    {

                      item.autonomousCommandActions?.map(

                        (
                          action:string,
                          actionIdx:number
                        )=>(

                          <li key={actionIdx}>

                            {action}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* FORECASTS */}
                {/* =============================== */}

                <div className="jd-command-section">

                  <div className="jd-command-section-title">

                    Neural Forecasts

                  </div>

                  <ul>

                    {

                      item.neuralForecasts?.map(

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
                {/* BUTTON */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  Open Strategic Command

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
