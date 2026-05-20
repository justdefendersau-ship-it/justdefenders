"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\RecentMaintenanceCard.tsx
//
// Timestamp:
// 2026-05-09 09:45
//
// Purpose:
// - Recent maintenance visibility
// =====================================================

export default function RecentMaintenanceCard({

  items

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Recent Maintenance

      </div>

      {items.map(
        (m:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              paddingBottom:"16px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {m.description}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              {m.date}

            </div>

            <div style={{
              marginTop:"8px",
              color:"#5e6c84"
            }}>

              {m.supplier}

            </div>

          </div>
        )
      )}

    </div>
  )
}
