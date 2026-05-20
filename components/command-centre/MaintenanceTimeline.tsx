"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\command-centre\MaintenanceTimeline.tsx
//
// Timestamp:
// 2026-05-08 11:00
//
// Purpose:
// - Maintenance visibility
// =====================================================

export default function MaintenanceTimeline({

  items

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Maintenance Timeline

      </div>

      {items.map(
        (m:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              paddingBottom:"18px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {m.date}

            </div>

            <div style={{
              marginTop:"6px"
            }}>

              {m.description}

            </div>

            <div style={{
              marginTop:"6px",
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
