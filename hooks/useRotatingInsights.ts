/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\hooks\useRotatingInsights.ts
 *
 * Timestamp:
 * 17 May 2026 10:50 Sydney
 *
 * PURPOSE:
 * Tactical Rotating Operational Intelligence Hook
 * ============================================================
 */

"use client"

import {
  useEffect,
  useState
} from "react"

// ============================================================
// HOOK
// ============================================================

export default function useRotatingInsights<T>(

  insights: T[],

  intervalMs = 5000

) {

  const [

    activeIndex,

    setActiveIndex

  ] = useState(0)

  useEffect(()=>{

    if(!insights.length){
      return
    }

    const interval = setInterval(()=>{

      setActiveIndex((prev)=>
        (prev + 1) % insights.length
      )

    }, intervalMs)

    return ()=> clearInterval(interval)

  }, [

    insights,
    intervalMs
  ])

  return {

    activeInsight:
      insights[activeIndex],

    activeIndex
  }
}