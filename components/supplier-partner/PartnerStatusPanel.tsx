"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\supplier-partner\PartnerStatusPanel.tsx
//
// Timestamp:
// 2026-05-08 09:00
//
// Purpose:
// - Partner management visibility
// =====================================================

export default function PartnerStatusPanel({

  partners

}:any){

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"12px",
      padding:"24px",
      background:"#fff"
    }}>

      <div style={{
        fontSize:"26px",
        fontWeight:"bold"
      }}>

        Partner Status

      </div>

      {partners.map(
        (p:any,idx:number)=>(

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
              fontWeight:"bold",
              fontSize:"20px"
            }}>

              {p.name}

            </div>

            <div style={{
              marginTop:"10px"
            }}>

              Status:
              {" "}
              {p.status}

            </div>

            <div style={{
              marginTop:"10px"
            }}>

              Health Score:
              {" "}
              {p.health}

            </div>

          </div>
        )
      )}

    </div>
  )
}
