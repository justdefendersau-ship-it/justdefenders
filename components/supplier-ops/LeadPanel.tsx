"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\supplier-ops\LeadPanel.tsx
//
// Timestamp:
// 2026-05-08 07:00
//
// Purpose:
// - Supplier lead visibility
// =====================================================

export default function LeadPanel({

  leads

}:any){

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"12px",
      padding:"24px",
      background:"#fff"
    }}>

      <div style={{
        fontSize:"24px",
        fontWeight:"bold"
      }}>

        Supplier Leads

      </div>

      {leads.map(
        (l:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              border:"1px solid #eee",
              borderRadius:"10px",
              padding:"16px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {l.partNumber}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              Urgency:
              {" "}
              {l.urgency}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              Location:
              {" "}
              {l.location}

            </div>

          </div>
        )
      )}

    </div>
  )
}
