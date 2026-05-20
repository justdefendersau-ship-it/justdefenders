/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\hooks\useViewport.ts
 *
 * Timestamp:
 * 17 May 2026 11:55 Sydney
 *
 * PURPOSE:
 * Tactical Responsive Viewport Intelligence Hook
 * ============================================================
 */

"use client"

import {
  useEffect,
  useState
} from "react"

// ============================================================
// BREAKPOINTS
// ============================================================

const MOBILE = 768

const TABLET = 1280

// ============================================================
// HOOK
// ============================================================

export default function useViewport() {

  const [

    width,

    setWidth

  ] = useState<number>(0)

  useEffect(()=>{

    const handleResize = ()=>{

      setWidth(window.innerWidth)
    }

    handleResize()

    window.addEventListener(
      "resize",
      handleResize
    )

    return ()=>{

      window.removeEventListener(
        "resize",
        handleResize
      )
    }

  }, [])

  return {

    width,

    isMobile:
      width < MOBILE,

    isTablet:
      width >= MOBILE &&
      width < TABLET,

    isDesktop:
      width >= TABLET
  }
}