"use client";

import React,{
  useEffect,
  useState
}
from "react"

import {

  isOfflineMode

}
from "../../lib/offline/offlineCacheEngine"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\offline\OfflineStatusCard.tsx
//
// Timestamp:
// 2026-05-09 18:00
//
// Purpose:
// - Offline operational visibility
// =====================================================

export default function OfflineStatusCard(){

  const [offline,setOffline] =

    useState(false)

  useEffect(()=>{

    setOffline(
      isOfflineMode()
    )

  },[])

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Connectivity Status

      </div>

      <div
        className="jd-metric"

        style={{
          color:
            offline
            ? "#de350b"
            : "#36b37e"
        }}
      >

        {
          offline
          ? "OFFLINE"
          : "ONLINE"
        }

      </div>

      <div
        style={{
          marginTop:"14px"
        }}
      >

        {
          offline
          ? "Using cached operational intelligence."
          : "Cloud synchronisation active."
        }

      </div>

    </div>
  )
}
