/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\system\ErrorBoundary.tsx
 *
 * Timestamp:
 * 21 May 2026 13:22 Sydney
 *
 * PURPOSE:
 * Global Error Boundary
 *
 * STRATEGY:
 * PASS 20 — QA Hardening + Stability
 *
 * ============================================================
 */

"use client"

import React from "react"

// ============================================================
// TYPES
// ============================================================

interface Props {

  children:
    React.ReactNode
}

interface State {

  hasError: boolean
}

// ============================================================
// COMPONENT
// ============================================================

export default class ErrorBoundary
extends React.Component<Props, State> {

  constructor(
    props: Props
  ){

    super(props)

    this.state = {

      hasError: false
    }
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  static getDerivedStateFromError(){

    return {

      hasError: true
    }
  }

  componentDidCatch(

    error: Error,

    errorInfo:
      React.ErrorInfo

  ){

    console.error(

      "JUSTDEFENDERS RUNTIME FAILURE",

      error,

      errorInfo
    )
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  render(){

    if (
      this.state.hasError
    ) {

      return (

        <div
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#020617]
            px-6
          "
        >

          <div
            className="
              max-w-[620px]
              rounded-3xl
              border
              border-red-900
              bg-[#1A0B0B]
              p-10
              text-center
            "
          >

            <div
              className="
                text-4xl
                font-black
                text-red-300
              "
            >
              Operational Failure
            </div>

            <div
              className="
                mt-4
                text-slate-300
              "
            >
              A runtime exception occurred within the
              procurement platform.
            </div>

            <button

              onClick={() =>

                window.location.reload()

              }

              className="
                mt-8
                rounded-2xl
                bg-[#DC2626]
                px-6
                py-4
                text-sm
                font-black
                text-white
              "
            >
              Reload Platform
            </button>

          </div>

        </div>
      )
    }

    return this.props.children
  }
}