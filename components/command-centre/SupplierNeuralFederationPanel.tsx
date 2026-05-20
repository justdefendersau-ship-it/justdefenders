"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/SupplierNeuralFederationPanel.tsx

   Timestamp:
   12 May 2026 23:30 (Sydney)

   PURPOSE:
   Supplier neural federation visualisation
===================================================== */

import React from "react"

import {

  getSupplierNeuralFederation

}
from "../../lib/marketplace/globalSupplierNeuralFederationEngine"

export default function SupplierNeuralFederationPanel(){

  const suppliers =
    getSupplierNeuralFederation()

  return (

    <div className="jd-supplier-neural-shell">

      <div className="jd-supplier-neural-header">

        GLOBAL SUPPLIER NEURAL FEDERATION

      </div>

      {

        suppliers.map(

          (
            item:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-supplier-neural-card ${item.supplierState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-supplier-neural-top">

                <div>

                  <div className="jd-supplier-neural-name">

                    {item.supplierName}

                  </div>

                  <div className="jd-supplier-neural-region">

                    {item.supplierRegion}

                  </div>

                </div>

                <div className="jd-supplier-neural-state">

                  {item.supplierState}

                </div>

              </div>

              {/* ============================= */}
              {/* METRICS */}
              {/* ============================= */}

              <div className="jd-supplier-neural-grid">

                <div>

                  Trust:
                  {" "}
                  {item.aiTrustScore}%

                </div>

                <div>

                  Collapse:
                  {" "}
                  {item.inventoryCollapseProbability}%

                </div>

                <div>

                  Criticality:
                  {" "}
                  {item.expeditionCriticality}%

                </div>

                <div>

                  Fulfilment:
                  {" "}
                  {item.fulfilmentVelocityHours}h

                </div>

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-supplier-neural-forecast">

                {item.neuralForecasts?.[0]}

              </div>

              {/* ============================= */}
              {/* SUBSTITUTIONS */}
              {/* ============================= */}

              <div className="jd-supplier-neural-substitutions">

                {

                  item.substitutionCandidates?.map(

                    (
                      supplier:string,
                      supplierIdx:number
                    )=>(

                      <span
                        key={supplierIdx}
                        className="jd-substitution-pill"
                      >

                        {supplier}

                      </span>
                    )
                  )
                }

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
