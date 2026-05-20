"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/SupplierDrilldownModal.tsx
//
// Timestamp:
// 11 May 2026 12:25 (Sydney)
//
// PURPOSE:
// Operational supplier drilldown workflow
// =====================================================

import React
from "react"

import {

  getSupplierOptions

}
from "../../lib/parts-intelligence/supplierIntelligenceEngine"

// =====================================================
// COMPONENT
// =====================================================

export default function SupplierDrilldownModal({

  partNumber,
  tradeMode = false,
  route = "Global"

}:any){

  // ===================================================
  // SUPPLIERS
  // ===================================================

  const suppliers =
    getSupplierOptions(
      partNumber
    )

  // ===================================================
  // SORT
  // ===================================================

  const sortedSuppliers =
    [...suppliers]

      .sort(

        (a,b)=>

          (b.supplierConfidence || 0)
          -
          (a.supplierConfidence || 0)
      )

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-supplier-shell">

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="jd-supplier-header">

        <div>

          <div className="jd-supplier-title">

            Supplier Intelligence

          </div>

          <div className="jd-supplier-subtitle">

            Operational procurement workflow
            for part:

            {" "}

            <strong>
              {partNumber}
            </strong>

          </div>

        </div>

        <div className="jd-supplier-badge">

          {sortedSuppliers.length}

          {" "}

          suppliers

        </div>

      </div>

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

      <div className="jd-supplier-grid">

        {

          sortedSuppliers.map(

            (
              supplier:any,
              idx:number
            )=>(

              <div
                key={idx}
                className="jd-supplier-card"
              >

                {/* =============================== */}
                {/* TOP */}
                {/* =============================== */}

                <div className="jd-supplier-top">

                  <div>

                    <div className="jd-supplier-name">

                      {supplier.supplierName}

                    </div>

                    <div className="jd-supplier-region">

                      {supplier.supplierRegion}

                    </div>

                  </div>

                  <div
                    className="jd-supplier-confidence"
                  >

                    {

                      Math.round(

                        (supplier.supplierConfidence || 0)
                        * 100

                      )

                    }%

                  </div>

                </div>

                {/* =============================== */}
                {/* BADGES */}
                {/* =============================== */}

                <div className="jd-supplier-badges">

                  {

                    supplier.oemEquivalent
                    &&
                    (

                      <div className="jd-oem-badge">

                        OEM Equivalent

                      </div>
                    )
                  }

                  {

                    supplier.touringGrade
                    &&
                    (

                      <div className="jd-touring-badge">

                        Touring Grade

                      </div>
                    )
                  }

                  {

                    supplier.physicalStore
                    &&
                    (

                      <div className="jd-store-badge">

                        Physical Store

                      </div>
                    )
                  }

                  {

                    supplier.onlineOnly
                    &&
                    (

                      <div className="jd-online-badge">

                        Online Only

                      </div>
                    )
                  }

                </div>

                {/* =============================== */}
                {/* PRICING */}
                {/* =============================== */}

                <div className="jd-supplier-pricing">

                  <div className="jd-price-row">

                    <span>

                      Retail

                    </span>

                    <strong>

                      $

                      {supplier.retailPrice}

                    </strong>

                  </div>

                  {

                    tradeMode
                    &&
                    (

                      <div className="jd-price-row">

                        <span>

                          Trade

                        </span>

                        <strong>

                          $

                          {supplier.tradePrice}

                        </strong>

                      </div>
                    )
                  }

                  <div className="jd-price-row">

                    <span>

                      Delivery

                    </span>

                    <strong>

                      {

                        supplier.estimatedDeliveryDays

                      }

                      {" "}
                      days

                    </strong>

                  </div>

                </div>

                {/* =============================== */}
                {/* ROUTE SUITABILITY */}
                {/* =============================== */}

                <div className="jd-route-shell">

                  <div className="jd-route-title">

                    Route Suitability

                  </div>

                  <div className="jd-route-tags">

                    {

                      supplier.routeSuitability?.map(

                        (
                          routeItem:string,
                          routeIdx:number
                        )=>(

                          <div
                            key={routeIdx}
                            className={

                              routeItem === route

                                ? "jd-route-tag-active"

                                : "jd-route-tag"
                            }
                          >

                            {routeItem}

                          </div>
                        )
                      )
                    }

                  </div>

                </div>

                {/* =============================== */}
                {/* STOCK */}
                {/* =============================== */}

                <div className="jd-stock-row">

                  <strong>

                    Stock Status:

                  </strong>

                  {" "}

                  {supplier.stockStatus}

                </div>

                {/* =============================== */}
                {/* NOTES */}
                {/* =============================== */}

                {

                  supplier.operationalNotes
                  &&
                  supplier.operationalNotes.length > 0
                  &&
                  (

                    <div className="jd-operational-notes">

                      <div className="jd-operational-title">

                        Operational Notes

                      </div>

                      <ul>

                        {

                          supplier.operationalNotes.map(

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
                  )
                }

                {/* =============================== */}
                {/* ACTIONS */}
                {/* =============================== */}

                <div className="jd-supplier-actions">

                  {

                    supplier.mapLink
                    &&
                    supplier.physicalStore
                    &&
                    (

                      <button
                        className="jd-secondary-button"
                      >

                        View Map

                      </button>
                    )
                  }

                  <button className="jd-primary-button">

                    View Supplier

                  </button>

                </div>

              </div>
            )
          )
        }

      </div>

    </section>
  )
}
