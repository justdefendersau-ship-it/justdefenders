"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage-core\MaintenanceTimelineCard.tsx
//
// Timestamp:
// 2026-05-10 13:15
//
// Purpose:
// - Maintenance timeline
// =====================================================

export default function MaintenanceTimelineCard({

  timeline

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Maintenance Timeline

      </div>

      {timeline.map(
        (t:any,idx:number)=>(

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

              {t.date}

            </div>

            <div
              style={{
                marginTop:"8px"
              }}
            >

              {t.work}

            </div>

            <div
              style={{
                marginTop:"8px",
                color:"#5e6c84"
              }}
            >

              {t.supplier}

            </div>

          </div>
        )
      )}

    </div>
  )
}
