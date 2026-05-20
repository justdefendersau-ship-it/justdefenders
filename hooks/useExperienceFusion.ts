"use client";

/* =====================================================
   JustDefenders ©
   File:
   /hooks/useExperienceFusion.ts

   Timestamp:
   12 May 2026 22:00 (Sydney)

   PURPOSE:
   AI experience fusion hook
===================================================== */

import {

  useEffect,
  useState

}
from "react"

import {

  generateExperienceFusionState

}
from "../lib/realtime/experienceFusionEngine"

export function useExperienceFusion(){

  const [
    fusion,
    setFusion
  ] = useState(

    generateExperienceFusionState()
  )

  useEffect(()=>{

    const interval =
      setInterval(()=>{

        setFusion(

          generateExperienceFusionState()
        )

      },8000)

    return ()=>clearInterval(interval)

  },[])

  return fusion
}
