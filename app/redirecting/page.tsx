"use client";
import { useEffect } from "react";

// =====================================================
// JustDefenders ©
// File: app/redirecting/page.tsx
// Timestamp: 2026-05-06 18:40
// Purpose: Safe redirect page (fix loop + preserve tracking)
// =====================================================

export default function Redirecting(){

  useEffect(()=>{

    const params = new URLSearchParams(window.location.search)

    const part = params.get("part") || ""
    const supplier = params.get("supplier") || ""
    const targetRaw = params.get("target") || ""
    const trackingId = params.get("tracking_id") || ""

    // decode target safely
    let target = ""
    try {
      target = decodeURIComponent(targetRaw)
    } catch {
      target = targetRaw
    }

    // store tracking id for later conversion
    if(trackingId){
      localStorage.setItem("jd_tracking_id", trackingId)
    }

    console.log("REDIRECT DEBUG:", {
      part,
      supplier,
      target,
      trackingId
    })

    // -----------------------------------------------------
    // REDIRECT LOGIC (FIXES LOOP)
    // -----------------------------------------------------

    setTimeout(()=>{

      if(target && target.startsWith("http")){
        window.location.href = target
      } else {
        console.error("Invalid target, fallback to home")
        window.location.href = "/"
      }

    }, 2000)

  },[])

  return (
    <div style={{
      padding:"40px",
      textAlign:"center",
      maxWidth:"600px",
      margin:"0 auto"
    }}>

      <h2>Redirecting to supplier...</h2>

      <div style={{ marginTop:"10px", color:"#666" }}>
        Please wait a moment
      </div>

    </div>
  )
}