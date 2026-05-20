"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/SupplierApiOperationsDashboard.tsx
//
// Timestamp:
// 11 May 2026 18:15 (Sydney)
//
// PURPOSE:
// Supplier integration operations dashboard
// =====================================================

import React
from "react"

import {

  getSupplierConnectors,
  getSupplierApiHealthScore

}
from "../../lib/parts-intelligence/supplierApiConnectorEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function SupplierApiOperationsDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const connectors =
    getSupplierConnectors()

  const health =
    getSupplierApiHealthScore()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-api-shell">

      <div className="jd-api-header">

        Supplier API Operations

      </div>

      <div className="jd-api-subtitle">

        External supplier integration,
        inventory synchronisation and
        procurement connectivity

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-api-health">

        API Integration Health:

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

      <div className="jd-api-grid">

        {

          connectors.map(

            (
              connector:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-api-card"
              >

                <div className="jd-api-top">

                  <div>

                    <div className="jd-api-name">

                      {connector.supplierName}

                    </div>

                    <div className="jd-api-auth">

                      {

                        connector.authType
                        ||
                        "manual"
                      }

                    </div>

                  </div>

                  <div className="jd-api-status">

                    {

                      connector.operationalStatus

                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* FEATURES */}
                {/* =============================== */}

                <div className="jd-api-features">

                  <div>

                    Inventory Sync:

                    {" "}

                    <strong>

                      {

                        connector.inventorySyncSupported
                          ? "Yes"
                          : "No"

                      }

                    </strong>

                  </div>

                  <div>

                    Pricing Sync:

                    {" "}

                    <strong>

                      {

                        connector.pricingSyncSupported
                          ? "Yes"
                          : "No"

                      }

                    </strong>

                  </div>

                  <div>

                    Order Submission:

                    {" "}

                    <strong>

                      {

                        connector.orderSubmissionSupported
                          ? "Yes"
                          : "No"

                      }

                    </strong>

                  </div>

                </div>

                {/* =============================== */}
                {/* META */}
                {/* =============================== */}

                {

                  connector.syncFrequencyMinutes
                  &&
                  (

                    <div className="jd-api-meta">

                      Sync Frequency:

                      {" "}

                      <strong>

                        {

                          connector.syncFrequencyMinutes

                        }

                        {" "}
                        mins

                      </strong>

                    </div>
                  )
                }

                {/* =============================== */}
                {/* ACTION */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  View Connector

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
