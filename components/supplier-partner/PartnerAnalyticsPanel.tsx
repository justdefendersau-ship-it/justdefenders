"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\supplier-partner\PartnerAnalyticsPanel.tsx
//
// Timestamp:
// 2026-05-08 09:00
//
// Purpose:
// - Supplier partner analytics
// =====================================================

export default function PartnerAnalyticsPanel({

  analytics

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

        Partner Analytics

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        Active Partners:
        {" "}
        {analytics.activePartners}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        Emergency Fulfilment:
        {" "}
        {analytics.emergencyPartners}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        Inventory Coverage:
        {" "}
        {analytics.inventoryCoverage}%

      </div>

    </div>
  )
}
