"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\command-centre\OperationalAlerts.tsx
//
// Timestamp:
// 2026-05-08 11:00
//
// Purpose:
// - Prioritised operational alerts
// =====================================================

export default function OperationalAlerts({

  alerts

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Operational Priorities

      </div>

      {alerts.map(
        (a:any,idx:number)=>(

          <div
            key={idx}

            className={
              a.severity === "critical"
              ? "jd-alert-critical"
              : a.severity === "warning"
              ? "jd-alert-warning"
              : "jd-alert-success"
            }

            style={{
              marginTop:"18px",
              padding:"16px",
              borderRadius:"10px",
              background:"#fff"
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

              {a.message}

            </div>

          </div>
        )
      )}

    </div>
  )
}
