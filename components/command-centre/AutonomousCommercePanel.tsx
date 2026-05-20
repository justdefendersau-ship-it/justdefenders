"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/AutonomousCommercePanel.tsx

   Timestamp:
   13 May 2026 07:00 (Sydney)

   PURPOSE:
   Autonomous commerce routing visualisation
===================================================== */

import React from "react"

import {

  getAutonomousCommerceRoutes

}
from "../../lib/commerce/autonomousExpeditionCommerceEngine"

export default function AutonomousCommercePanel(){

  const routes =
    getAutonomousCommerceRoutes()

  return (

    <div className="jd-commerce-shell">

      <div className="jd-commerce-header">

        AUTONOMOUS EXPEDITION COMMERCE

      </div>

      {

        routes.map(

          (
            route:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-commerce-card ${route.commerceState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-commerce-top">

                <div>

                  <div className="jd-commerce-component">

                    {route.requestedComponent}

                  </div>

                  <div className="jd-commerce-region">

                    {route.expeditionRegion}

                  </div>

                </div>

                <div className="jd-commerce-state">

                  {route.commerceState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-commerce-grid">

                <div>

                  Urgency:
                  {" "}
                  {route.urgencyLevel}%

                </div>

                <div>

                  Fulfilment:
                  {" "}
                  {route.fulfilmentProbability}%

                </div>

                <div>

                  Supplier:
                  {" "}
                  {route.supplierConfidence}%

                </div>

                <div>

                  ETA:
                  {" "}
                  {route.estimatedDeliveryHours}h

                </div>

              </div>

              {/* ============================= */}
              {/* ACTIONS */}
              {/* ============================= */}

              <div className="jd-commerce-actions">

                {

                  route.autonomousActions?.map(

                    (
                      action:string,
                      actionIdx:number
                    )=>(

                      <div
                        key={actionIdx}
                        className="jd-commerce-action"
                      >

                        {action}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* SUBSTITUTIONS */}
              {/* ============================= */}

              <div className="jd-commerce-substitutions">

                {

                  route.substitutionOptions?.map(

                    (
                      sub:string,
                      subIdx:number
                    )=>(

                      <span
                        key={subIdx}
                        className="jd-commerce-pill"
                      >

                        {sub}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-commerce-forecast">

                {route.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
