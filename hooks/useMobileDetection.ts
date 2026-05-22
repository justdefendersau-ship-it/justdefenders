/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\hooks\useMobileDetection.ts
 *
 * Timestamp:
 * 21 May 2026 22:36 Sydney
 *
 * PURPOSE:
 * Tactical Mobile Detection Hook
 *
 * STRATEGY:
 * PASS 28 — Tactical Mobile Interface
 *
 * ============================================================
 */

"use client"

import {

  useEffect,
  useState

} from "react"

const MOBILE_BREAKPOINT = 1280

export function useMobileDetection(){

  const [

    isMobile,

    setIsMobile

  ] = useState(false)

  useEffect(() => {

    const checkViewport = () => {

      setIsMobile(

        window.innerWidth <
        MOBILE_BREAKPOINT
      )
    }

    checkViewport()

    window.addEventListener(
      "resize",
      checkViewport
    )

    return () => {

      window.removeEventListener(
        "resize",
        checkViewport
      )
    }

  }, [])

  return {

    isMobile
  }
}