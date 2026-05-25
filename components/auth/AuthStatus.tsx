/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\auth\AuthStatus.tsx
 *
 * Timestamp:
 * 24 May 2026 14:41 Sydney
 *
 * PURPOSE:
 * Tactical Authentication Status Component
 *
 * STRATEGY:
 * PASS 47.5 Production Stabilization
 *
 * OBJECTIVES:
 * - production-safe auth rendering
 * - resilient auth context handling
 * - deployment-safe runtime typing
 * - operational session visibility
 * - expedition-grade auth telemetry
 *
 * ============================================================
 */

"use client"

import {

  Shield,
  ShieldAlert,
  ShieldCheck

} from "lucide-react"

import {

  useMemo

} from "react"

import {

  useAuth

} from "@/contexts/AuthContext"

// ============================================================
// COMPONENT
// ============================================================

export default function AuthStatus(){

  // ==========================================================
  // AUTH
  // ==========================================================

  const auth =
    useAuth()

  // ==========================================================
  // SAFE STATE
  // ==========================================================

  const loading =
    auth?.loading ?? false

  const user =
    auth?.user ?? null

  const authenticated =
    Boolean(user)

  // ==========================================================
  // STATUS
  // ==========================================================

  const status =
    useMemo(() => {

      if(loading){

        return {

          label: "AUTHENTICATING",

          description:
            "Operational identity validation in progress.",

          icon:
            Shield,

          styles:
            `
            border-amber-800
            bg-amber-950/20
            text-amber-300
            `
        }
      }

      if(authenticated){

        return {

          label: "AUTHENTICATED",

          description:
            "Operational identity verified successfully.",

          icon:
            ShieldCheck,

          styles:
            `
            border-emerald-800
            bg-emerald-950/20
            text-emerald-300
            `
        }
      }

      return {

        label: "UNAUTHENTICATED",

        description:
          "No active operational authentication session detected.",

        icon:
          ShieldAlert,

        styles:
          `
          border-red-800
          bg-red-950/20
          text-red-300
          `
      }

    }, [

      loading,
      authenticated
    ])

  // ==========================================================
  // ICON
  // ==========================================================

  const StatusIcon =
    status.icon

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className={`

        rounded-[24px]
        border
        p-5

        ${status.styles}
      `}
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        {/* ================================================== */}
        {/* ICON */}
        {/* ================================================== */}

        <div
          className="
            rounded-full
            bg-black/20
            p-3
          "
        >

          <StatusIcon
            className="
              h-5
              w-5
            "
          />

        </div>

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div
          className="
            flex-1
          "
        >

          <div
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.2em]
            "
          >
            Tactical Authentication
          </div>

          <div
            className="
              mt-2
              text-[20px]
              font-black
              tracking-[-0.06em]
            "
          >
            {status.label}
          </div>

          <div
            className="
              mt-3
              text-[14px]
              leading-relaxed
              opacity-80
            "
          >
            {status.description}
          </div>

          {

            authenticated
            &&
            user

            &&

            <div
              className="
                mt-4
                rounded-[18px]
                border
                border-white/10
                bg-black/10
                px-4
                py-3
              "
            >

              <div
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  opacity-60
                "
              >
                Active Operator
              </div>

              <div
                className="
                  mt-2
                  text-[14px]
                  font-semibold
                "
              >
                {

                  user?.email
                  ||

                  user?.name
                  ||

                  "Operational User"
                }
              </div>

            </div>
          }

        </div>

      </div>

    </div>
  )
}