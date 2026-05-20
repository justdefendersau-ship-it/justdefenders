"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/WorkshopOperationsDashboard.tsx
//
// Timestamp:
// 11 May 2026 20:30 (Sydney)
//
// PURPOSE:
// Multi-user workshop operations dashboard
// =====================================================

import React
from "react"

import {

  getWorkshopQueue,
  getWorkshopReadinessImpactAverage

}
from "../../lib/parts-intelligence/workshopOperationsEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function WorkshopOperationsDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const jobs =
    getWorkshopQueue()

  const readiness =
    getWorkshopReadinessImpactAverage()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-workshopops-shell">

      <div className="jd-workshopops-header">

        Multi-User Workshop Operations

      </div>

      <div className="jd-workshopops-subtitle">

        Technician coordination,
        expedition servicing and
        operational workflow management

      </div>

      {/* ============================================= */}
      {/* SCORE */}
      {/* ============================================= */}

      <div className="jd-workshopops-score">

        Workshop Readiness Impact:

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

      <div className="jd-workshopops-grid">

        {

          jobs.map(

            (
              job:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-workshopops-card"
              >

                <div className="jd-workshopops-top">

                  <div>

                    <div className="jd-workshopops-job">

                      {job.serviceType}

                    </div>

                    <div className="jd-workshopops-vehicle">

                      {job.vehicleModel}

                    </div>

                  </div>

                  <div className="jd-workshopops-status">

                    {job.workflowStatus}

                  </div>

                </div>

                {/* =============================== */}
                {/* TECHNICIAN */}
                {/* =============================== */}

                <div className="jd-workshopops-meta">

                  Technician:

                  {" "}

                  <strong>

                    {job.assignedTechnician}

                  </strong>

                </div>

                {/* =============================== */}
                {/* ROUTE */}
                {/* =============================== */}

                <div className="jd-workshopops-meta">

                  Expedition Route:

                  {" "}

                  <strong>

                    {job.routePreparation}

                  </strong>

                </div>

                {/* =============================== */}
                {/* PARTS */}
                {/* =============================== */}

                <div className="jd-workshopops-parts">

                  {

                    job.requiredParts?.map(

                      (
                        part:string,
                        partIdx:number
                      )=>(

                        <div
                          key={partIdx}
                          className="jd-workshopops-tag"
                        >

                          {part}

                        </div>
                      )
                    )
                  }

                </div>

                {/* =============================== */}
                {/* IMPACT */}
                {/* =============================== */}

                <div className="jd-workshopops-impact">

                  Operational Impact:

                  {" "}

                  <strong>

                    {

                      Math.round(

                        job.readinessImpact
                        * 100

                      )

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTION */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  Open Service Job

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
