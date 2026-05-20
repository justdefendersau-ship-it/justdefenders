"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\ownership-intelligence\OwnershipTimelineCard.tsx
//
// Timestamp:
// 2026-05-09 09:05
//
// Purpose:
// - Real ownership timeline
// =====================================================

export default function OwnershipTimelineCard({

  records

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Ownership Timeline

      </div>

      {records.map(
        (r:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              paddingBottom:"18px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {r.date}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              {r.description}

            </div>

            <div style={{
              marginTop:"8px",
              color:"#5e6c84"
            }}>

              {r.supplier}

            </div>

          </div>
        )
      )}

    </div>
  )
}
