"use client";

import {
  useEffect,
  useState
} from "react"

import CSVUploadPanel
from "../../components/supplier-csv/CSVUploadPanel"

import AnalyticsPanel
from "../../components/supplier-csv/AnalyticsPanel"

import {

  buildSupplierAnalytics

}
from "../../lib/supplierAnalytics"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\supplier-csv\page.tsx
//
// Timestamp:
// 2026-05-08 08:00
//
// Purpose:
// - Supplier CSV ingestion dashboard
// =====================================================

export default function SupplierCSVPage(){

  const [analytics,setAnalytics] =
    useState<any>(null)

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(()=>{

    const data =

      buildSupplierAnalytics({

        inventory:[

          {

            quantity:14
          },

          {

            quantity:7
          }
        ],

        leads:[

          {

            value:120
          },

          {

            value:220
          }
        ]
      })

    setAnalytics(data)

  }, [])

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div style={{
      maxWidth:"1400px",
      margin:"0 auto",
      padding:"20px",
      background:"#f5f5f5",
      minHeight:"100vh",
      fontFamily:"Arial"
    }}>

      <h1 style={{
        fontSize:"42px"
      }}>

        Supplier CSV & Analytics Platform

      </h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(340px,1fr))",

        gap:"20px",

        marginTop:"30px"
      }}>

        <CSVUploadPanel />

        {analytics && (

          <AnalyticsPanel
            analytics={analytics}
          />
        )}

      </div>

    </div>
  )
}
