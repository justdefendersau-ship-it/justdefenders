"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/InventoryOperationalDashboard.tsx
//
// Timestamp:
// 11 May 2026 17:30 (Sydney)
//
// PURPOSE:
// Real-time inventory operational dashboard
// =====================================================

import React
from "react"

import {

  getAllInventory,
  getInventoryHealthScore

}
from "../../lib/parts-intelligence/inventoryIntelligenceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function InventoryOperationalDashboard(){

  // ===================================================
  // DATA
  // ===================================================

  const inventory =
    getAllInventory()

  const healthScore =
    getInventoryHealthScore()

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-inventory-shell">

      <div className="jd-inventory-header">

        Real-Time Inventory Intelligence

      </div>

      <div className="jd-inventory-subtitle">

        Operational supplier stock visibility
        and expedition procurement readiness

      </div>

      {/* ============================================= */}
      {/* HEALTH */}
      {/* ============================================= */}

      <div className="jd-inventory-health">

        Inventory Health Score:

        {" "}

        <strong>

          {

            Math.round(
              healthScore * 100
            )

          }%

        </strong>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-inventory-grid">

        {

          inventory.map(

            (
              item:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-inventory-card"
              >

                <div className="jd-inventory-top">

                  <div>

                    <div className="jd-inventory-supplier">

                      {item.supplierName}

                    </div>

                    <div className="jd-inventory-part">

                      {item.partNumber}

                    </div>

                  </div>

                  <div className="jd-inventory-status">

                    {item.stockStatus}

                  </div>

                </div>

                {/* =============================== */}
                {/* STOCK */}
                {/* =============================== */}

                <div className="jd-inventory-meta">

                  Stock Level:

                  {" "}

                  <strong>

                    {item.stockLevel}

                  </strong>

                </div>

                <div className="jd-inventory-meta">

                  Dispatch:

                  {" "}

                  <strong>

                    {

                      item.estimatedDispatchDays

                    }

                    {" "}
                    days

                  </strong>

                </div>

                <div className="jd-inventory-meta">

                  Region:

                  {" "}

                  <strong>

                    {item.warehouseRegion}

                  </strong>

                </div>

                <div className="jd-inventory-meta">

                  Confidence:

                  {" "}

                  <strong>

                    {

                      Math.round(

                        item.inventoryConfidence
                        * 100

                      )

                    }%

                  </strong>

                </div>

                {/* =============================== */}
                {/* ACTION */}
                {/* =============================== */}

                <button className="jd-primary-button">

                  View Procurement Options

                </button>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
