"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/ExpeditionMarketplacePanel.tsx

   Timestamp:
   13 May 2026 10:00 (Sydney)

   PURPOSE:
   Expedition intelligence marketplace visualisation
===================================================== */

import React from "react"

import {

  getMarketplaceIntelligence

}
from "../../lib/marketplace/expeditionIntelligenceMarketplaceEngine"

export default function ExpeditionMarketplacePanel(){

  const marketplace =
    getMarketplaceIntelligence()

  return (

    <div className="jd-market-shell">

      <div className="jd-market-header">

        GLOBAL EXPEDITION INTELLIGENCE MARKETPLACE

      </div>

      {

        marketplace.map(

          (
            intel:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-market-card ${intel.marketplaceState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-market-top">

                <div>

                  <div className="jd-market-title">

                    {intel.intelligenceTitle}

                  </div>

                  <div className="jd-market-category">

                    {intel.intelligenceCategory}

                  </div>

                </div>

                <div className="jd-market-state">

                  {intel.marketplaceState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-market-grid">

                <div>

                  Subscribers:
                  {" "}
                  {intel.activeSubscribers}

                </div>

                <div>

                  Survivability:
                  {" "}
                  {intel.survivabilityValue}%

                </div>

                <div>

                  AI Relevance:
                  {" "}
                  {intel.aiRelevanceScore}%

                </div>

                <div>

                  Supplier:
                  {" "}
                  {intel.supplierConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* INSIGHTS */}
              {/* ============================= */}

              <div className="jd-market-insights">

                {

                  intel.autonomousInsights?.map(

                    (
                      insight:string,
                      insightIdx:number
                    )=>(

                      <div
                        key={insightIdx}
                        className="jd-market-insight"
                      >

                        {insight}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* CHANNELS */}
              {/* ============================= */}

              <div className="jd-market-channels">

                {

                  intel.monetisationChannels?.map(

                    (
                      channel:string,
                      channelIdx:number
                    )=>(

                      <span
                        key={channelIdx}
                        className="jd-market-pill"
                      >

                        {channel}

                      </span>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-market-forecast">

                {intel.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
