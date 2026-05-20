"use client";

/* =====================================================
   JustDefenders ©
   File:
   /hooks/useLiveMissionState.ts

   Timestamp:
   12 May 2026 19:45 (Sydney)

   PURPOSE:
   Live intelligence mesh hook
===================================================== */

import {

  useEffect,
  useState

}
from "react"

import {

  generateLiveMissionState

}
from "../lib/realtime/liveIntelligenceMesh"

// =====================================================
// HOOK
// =====================================================

export function useLiveMissionState(){

  const [
    state,
    setState
  ] = useState(

    generateLiveMissionState()
  )

  useEffect(()=>{

    const interval =
      setInterval(()=>{

        setState(

          generateLiveMissionState()
        )

      },3000)

    return ()=>clearInterval(interval)

  },[])

  return state
}
