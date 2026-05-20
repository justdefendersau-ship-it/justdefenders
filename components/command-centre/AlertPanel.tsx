"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\command-centre\AlertPanel.tsx
//
// Timestamp:
// 2026-05-07 20:00
//
// Purpose:
// - Prioritised operational alerts
// =====================================================

export default function AlertPanel({

  alerts

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

        Active Alerts

      </div>

      {alerts.map(
        (a:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              padding:"14px",
              border:"1px solid #eee",
              borderRadius:"10px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {a.title}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              {a.recommendation}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              Severity:
              {" "}
              {a.severity}

            </div>

          </div>
        )
      )}

    </div>
  )
}
