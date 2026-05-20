"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/MarketplaceFederationPanel.tsx

   Timestamp:
   12 May 2026 22:45 (Sydney)

   PURPOSE:
   Marketplace federation visual panel
===================================================== */

import React from "react"

import {

  getMarketplaceFederation

}
from "../../lib/marketplace/autonomousMarketplaceFederationEngine"

export default function MarketplaceFederationPanel(){

  const federation =
    getMarketplaceFederation()

  return (

    <div className="jd-marketplace-shell">

      <div className="jd-marketplace-header">

        MARKETPLACE FEDERATION

      </div>

      {

        federation.map(

          (
            item:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-marketplace-card ${item.federationState}`}
            >

              <div className="jd-marketplace-top">

                <div>

                  <div className="jd-marketplace-name">

                    {item.supplierName}

                  </div>

                  <div className="jd-marketplace-region">

                    {item.supplierRegion}

                  </div>

                </div>

                <div className="jd-marketplace-state">

                  {item.federationState}

                </div>

              </div>

              <div className="jd-marketplace-metrics">

                <div>

                  Health:
                  {" "}
                  {item.supplierHealthIndex}%

                </div>

                <div>

                  Inventory:
                  {" "}
                  {item.inventoryConfidence}%

                </div>

                <div>

                  Routing:
                  {" "}
                  {item.aiRoutingConfidence}%

                </div>

                <div>

                  Latency:
                  {" "}
                  {item.logisticsLatencyHours}h

                </div>

              </div>

              <div className="jd-marketplace-ai">

                {item.aiRecommendations?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
