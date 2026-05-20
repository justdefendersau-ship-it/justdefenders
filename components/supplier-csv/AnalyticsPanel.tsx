"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\supplier-csv\AnalyticsPanel.tsx
//
// Timestamp:
// 2026-05-08 08:00
//
// Purpose:
// - Supplier analytics dashboard
// =====================================================

export default function AnalyticsPanel({

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
        fontSize:"24px",
        fontWeight:"bold"
      }}>

        Supplier Analytics

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        Inventory Items:
        {" "}
        {analytics.inventoryItems}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        Total Stock:
        {" "}
        {analytics.totalInventory}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        Leads:
        {" "}
        {analytics.leadCount}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        Lead Value:
        {" "}
        ${analytics.totalLeadValue}

      </div>

    </div>
  )
}
