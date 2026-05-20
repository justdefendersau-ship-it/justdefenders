"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/WorkshopRecommendationPanel.tsx
//
// Timestamp:
// 11 May 2026 16:00 (Sydney)
//
// PURPOSE:
// Operational workshop recommendation UI
// =====================================================

import React
from "react"

import {

  getRouteSupportedWorkshops

}
from "../../lib/parts-intelligence/workshopOperationalEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function WorkshopRecommendationPanel({

  route = "Simpson Desert"

}:any){

  // ===================================================
  // WORKSHOPS
  // ===================================================

  const workshops =
    getRouteSupportedWorkshops(
      route
    )

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-workshop-shell">

      <div className="jd-workshop-header">

        Expedition Workshop Intelligence

      </div>

      <div className="jd-workshop-subtitle">

        Route-aware Defender specialists
        for operational preparation

      </div>

      <div className="jd-workshop-grid">

        {

          workshops.map(

            (
              workshop:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-workshop-card"
              >

                <div className="jd-workshop-top">

                  <div>

                    <div className="jd-workshop-name">

                      {workshop.workshopName}

                    </div>

                    <div className="jd-workshop-region">

                      {workshop.region}

                    </div>

                  </div>

                  <div className="jd-workshop-confidence">

                    {

                      Math.round(

                        workshop.operationalConfidence
                        * 100

                      )

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* SPECIALTIES */}
                {/* =============================== */}

                <div className="jd-workshop-tags">

                  {

                    workshop.specialties.map(

                      (
                        item:string,
                        tagIdx:number
                      )=>(

                        <div
                          key={tagIdx}
                          className="jd-workshop-tag"
                        >

                          {item}

                        </div>
                      )
                    )
                  }

                </div>

                {/* =============================== */}
                {/* SERVICES */}
                {/* =============================== */}

                <div className="jd-workshop-services">

                  <div className="jd-workshop-services-title">

                    Recommended Services

                  </div>

                  <ul>

                    {

                      workshop.recommendedServices?.map(

                        (
                          service:string,
                          serviceIdx:number
                        )=>(

                          <li key={serviceIdx}>

                            {service}

                          </li>
                        )
                      )
                    }

                  </ul>

                </div>

                {/* =============================== */}
                {/* META */}
                {/* =============================== */}

                <div className="jd-workshop-meta">

                  Lead Time:

                  {" "}

                  <strong>

                    {

                      workshop.leadTimeDays

                    }

                    {" "}
                    days

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTION */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  View Workshop

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
