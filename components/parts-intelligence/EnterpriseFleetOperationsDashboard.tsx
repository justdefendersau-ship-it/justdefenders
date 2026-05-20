"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/EnterpriseFleetOperationsDashboard.tsx
//
// Timestamp:
// 11 May 2026 22:45 (Sydney)
//
// PURPOSE:
// Enterprise fleet command operations dashboard
// =====================================================

import React
from "react"

import {

  getEnterpriseOperations,
  getEnterpriseReadinessAverage

}
from "../../lib/parts-intelligence/enterpriseFleetOperationsEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function EnterpriseFleetOperationsDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const operations =
    getEnterpriseOperations()

  const readiness =
    getEnterpriseReadinessAverage()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-enterprise-shell">

      <div className="jd-enterprise-header">

        Enterprise Fleet Command

      </div>

      <div className="jd-enterprise-subtitle">

        Multi-region expedition operations,
        enterprise fleet orchestration and
        operational escalation intelligence

      </div>

      {/* ============================================= */}
      {/* READINESS */}
      {/* ============================================= */}

      <div className="jd-enterprise-readiness">

        Enterprise Readiness Score:

        {" "}

        <strong>

          {

            Math.round(
              readiness * 100
            )

          }%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-enterprise-grid">

        {

          operations.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-enterprise-card"
              >

                <div className="jd-enterprise-top">

                  <div>

                    <div className="jd-enterprise-name">

                      {item.organisationName}

                    </div>

                    <div className="jd-enterprise-status">

                      {

                        item.operationalCommandStatus

                      }

                    </div>

                  </div>

                  <div className="jd-enterprise-score">

                    {

                      Math.round(

                        item.readinessScore
                        * 100

                      )

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* REGIONS */}
                {/* =============================== */}

                <div className="jd-enterprise-section">

                  <div className="jd-enterprise-section-title">

                    Operational Regions

                  </div>

                  <div className="jd-enterprise-tags">

                    {

                      item.operationalRegions?.map(

                        (
                          region:string,
                          regionIdx:number
                        )=>(

                          <div
                            key={regionIdx}
                            className="jd-enterprise-tag"
                          >

                            {region}

                          </div>
                        )
                      )
                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* RISKS */}
                {/* =============================== */}

                <div className="jd-enterprise-section">

                  <div className="jd-enterprise-section-title">

                    Operational Risks

                  </div>

                  <ul>

                    {

                      item.operationalRisks?.map(

                        (
                          risk:string,
                          riskIdx:number
                        )=>(

                          <li key={riskIdx}>

                            {risk}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-enterprise-section">

                  <div className="jd-enterprise-section-title">

                    Escalation Actions

                  </div>

                  <ul>

                    {

                      item.escalationActions?.map(

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
                {/* BUTTON */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  Open Command View

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
