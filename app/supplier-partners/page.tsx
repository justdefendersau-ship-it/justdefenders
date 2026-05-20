"use client";

import {
  useEffect,
  useState
} from "react"

import OnboardingPanel
from "../../components/supplier-partner/OnboardingPanel"

import PartnerStatusPanel
from "../../components/supplier-partner/PartnerStatusPanel"

import PartnerAnalyticsPanel
from "../../components/supplier-partner/PartnerAnalyticsPanel"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\supplier-partners\page.tsx
//
// Timestamp:
// 2026-05-08 09:00
//
// Purpose:
// - Supplier partner portal
// =====================================================

export default function SupplierPartnersPage(){

  const [partners,setPartners] =
    useState<any[]>([])

  const [analytics,setAnalytics] =
    useState<any>(null)

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(()=>{

    setPartners([

      {

        name:"All Four x 4",

        status:"Active",

        health:"0.91"
      },

      {

        name:"MR Automotive",

        status:"Onboarding",

        health:"0.83"
      }
    ])

    setAnalytics({

      activePartners:12,

      emergencyPartners:5,

      inventoryCoverage:74
    })

  }, [])

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div style={{
      maxWidth:"1500px",
      margin:"0 auto",
      padding:"20px",
      background:"#f5f5f5",
      minHeight:"100vh",
      fontFamily:"Arial"
    }}>

      <h1 style={{
        fontSize:"42px"
      }}>

        Supplier Partner Management

      </h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(360px,1fr))",

        gap:"20px",

        marginTop:"30px"
      }}>

        <OnboardingPanel />

        <PartnerStatusPanel
          partners={partners}
        />

        {analytics && (

          <PartnerAnalyticsPanel
            analytics={analytics}
          />
        )}

      </div>

    </div>
  )
}
