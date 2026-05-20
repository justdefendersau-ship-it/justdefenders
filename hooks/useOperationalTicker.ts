/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\hooks\useOperationalTicker.ts
 *
 * Timestamp:
 * 17 May 2026 09:20 Sydney
 *
 * PURPOSE:
 * Tactical Operational Real-Time Ticker Hook
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

export default function useOperationalTicker() {

  const [

    secondsAgo,

    setSecondsAgo

  ] = useState(14)

  useEffect(()=>{

    const interval = setInterval(()=>{

      setSecondsAgo((prev)=>{

        if(prev >= 59){
          return 3
        }

        return prev + 1
      })

    }, 1000)

    return ()=> clearInterval(interval)

  }, [])

  return {

    secondsAgo
  }
}