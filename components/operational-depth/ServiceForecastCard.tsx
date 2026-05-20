"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-depth\ServiceForecastCard.tsx
//
// Timestamp:
// 2026-05-10 08:00
//
// Purpose:
// - Upcoming operational service forecasting
// =====================================================

export default function ServiceForecastCard({

  forecasts

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Service Forecasting

      </div>

      {forecasts.map(
        (f:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              paddingBottom:"16px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div
              style={{
                fontWeight:"bold"
              }}
            >

              {f.service}

            </div>

            <div
              style={{
                marginTop:"8px"
              }}
            >

              Due:
              {" "}
              {f.dueIn}

            </div>

            <div
              style={{
                marginTop:"6px"
              }}
            >

              Recommended:
              {" "}
              {f.recommendedDate}

            </div>

          </div>
        )
      )}

    </div>
  )
}
