"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/CommercialPartnerDashboard.tsx
//
// Timestamp:
// 11 May 2026 23:30 (Sydney)
//
// PURPOSE:
// Commercial partner operations dashboard
// =====================================================

import React
from "react"

import {

  getCommercialPartners,
  getCommercialOperationsHealth

}
from "../../lib/parts-intelligence/commercialPartnerIntegrationEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function CommercialPartnerDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const partners =
    getCommercialPartners()

  const health =
    getCommercialOperationsHealth()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-commercial-shell">

      <div className="jd-commercial-header">

        Commercial Partner Operations

      </div>

      <div className="jd-commercial-subtitle">

        Expedition partnerships,
        supplier integrations and
        commercial operational intelligence

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-commercial-health">

        Commercial Operations Health:

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

      <div className="jd-commercial-grid">

        {

          partners.map(

            (
              partner:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-commercial-card"
              >

                <div className="jd-commercial-top">

                  <div>

                    <div className="jd-commercial-name">

                      {partner.partnerName}

                    </div>

                    <div className="jd-commercial-type">

                      {partner.partnerType}

                    </div>

                  </div>

                  <div className="jd-commercial-status">

                    {

                      partner.integrationStatus

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* REGIONS */}
                {/* =============================== */}

                <div className="jd-commercial-section">

                  <div className="jd-commercial-section-title">

                    Regions

                  </div>

                  <div className="jd-commercial-tags">

                    {

                      partner.operationalRegions?.map(

                        (
                          region:string,
                          regionIdx:number
                        )=>(

                          <div
                            key={regionIdx}
                            className="jd-commercial-tag"
                          >

                            {region}

                          </div>
                        )
                      )
                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* FEATURES */}
                {/* =============================== */}

                <div className="jd-commercial-meta">

                  Affiliate Enabled:

                  {" "}

                  <strong>

                    {

                      partner.affiliateEnabled
                        ? "Yes"
                        : "No"

                    }

                  </strong>

                </div>

                <div className="jd-commercial-meta">

                  API Integration:

                  {" "}

                  <strong>

                    {

                      partner.apiIntegrationEnabled
                        ? "Yes"
                        : "No"

                    }

                  </strong>

                </div>

                <div className="jd-commercial-meta">

                  Revenue Share:

                  {" "}

                  <strong>

                    {

                      partner.revenueSharePercentage

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* NOTES */}
                {/* =============================== */}

                <div className="jd-commercial-section">

                  <div className="jd-commercial-section-title">

                    Commercial Notes

                  </div>

                  <ul>

                    {

                      partner.commercialNotes?.map(

                        (
                          note:string,
                          noteIdx:number
                        )=>(

                          <li key={noteIdx}>

                            {note}

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

                  Open Partner View

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
