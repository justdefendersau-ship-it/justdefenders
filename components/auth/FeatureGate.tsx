/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\auth\FeatureGate.tsx
 *
 * Timestamp:
 * 23 May 2026 18:42 Sydney
 *
 * PURPOSE:
 * Feature Gate Enforcement Layer
 *
 * STRATEGY:
 * PASS 38A — Feature Gate Enforcement Layer
 *
 * OBJECTIVES:
 * - operational intelligence gating
 * - premium feature enforcement
 * - fleet feature isolation
 * - admin-only protection
 * - commercial entitlement enforcement
 * - upgrade UX presentation
 *
 * ============================================================
 */

"use client"

import {

  Lock,
  Shield,
  Truck,
  Crown,
  ArrowRight

} from "lucide-react"

import {

  PlatformFeature,
  PlatformRole,
  PlatformUser,
  FEATURE_LABELS,
  hasFeatureAccess

} from "@/lib/auth/rbac"

// ============================================================
// TYPES
// ============================================================

interface FeatureGateProps {

  user:

    PlatformUser
    |
    null
    |
    undefined

  feature:
    PlatformFeature

  children:
    React.ReactNode

  fallback?:
    React.ReactNode

  blur?:
    boolean
}

// ============================================================
// COMPONENT
// ============================================================

export default function FeatureGate({

  user,
  feature,
  children,
  fallback,
  blur = true

}: FeatureGateProps){

  // ==========================================================
  // ACCESS
  // ==========================================================

  const hasAccess =
    hasFeatureAccess(

      user,

      feature
    )

  // ==========================================================
  // ALLOWED
  // ==========================================================

  if (

    hasAccess

  ){

    return (
      <>
        {children}
      </>
    )
  }

  // ==========================================================
  // CUSTOM
  // ==========================================================

  if (

    fallback

  ){

    return (
      <>
        {fallback}
      </>
    )
  }

  // ==========================================================
  // REQUIRED ROLE
  // ==========================================================

  const requiredRole =
    getRequiredRole(
      feature
    )

  // ==========================================================
  // LOCKED
  // ==========================================================

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-slate-800
        bg-[#07101F]
      "
    >

      {/* ==================================================== */}
      {/* BLUR */}
      {/* ==================================================== */}

      {

        blur

        &&

        <div
          className="
            pointer-events-none
            opacity-25
            blur-sm
            select-none
          "
        >
          {children}
        </div>
      }

      {/* ==================================================== */}
      {/* OVERLAY */}
      {/* ==================================================== */}

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-[#020817]/88
          backdrop-blur-md
          p-8
        "
      >

        <div
          className="
            max-w-[460px]
            text-center
          "
        >

          {/* =============================================== */}
          {/* ICON */}
          {/* =============================================== */}

          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              border-slate-700
              bg-[#07101F]
              shadow-[0_0_40px_rgba(56,189,248,0.12)]
            "
          >

            {
              requiredRole === "PREMIUM"
              ?
              <Crown className="h-9 w-9 text-[#F59E0B]" />
              :
              requiredRole === "FLEET"
              ?
              <Truck className="h-9 w-9 text-[#38BDF8]" />
              :
              <Shield className="h-9 w-9 text-[#F87171]" />
            }

          </div>

          {/* =============================================== */}
          {/* TITLE */}
          {/* =============================================== */}

          <div
            className="
              mt-6
              text-[28px]
              font-black
              tracking-[-0.05em]
              text-white
            "
          >
            {FEATURE_LABELS[feature]}
          </div>

          {/* =============================================== */}
          {/* SUBTITLE */}
          {/* =============================================== */}

          <div
            className="
              mt-4
              text-[14px]
              leading-relaxed
              text-slate-400
            "
          >
            This operational intelligence capability requires
            <span
              className="
                mx-1
                font-black
                text-white
              "
            >
              {requiredRole}
            </span>
            access.
          </div>

          {/* =============================================== */}
          {/* FEATURES */}
          {/* =============================================== */}

          <div
            className="
              mt-6
              rounded-[28px]
              border
              border-slate-800
              bg-[#020817]
              p-5
              text-left
            "
          >

            <div
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                text-[#38BDF8]
              "
            >
              Included Capabilities
            </div>

            <div
              className="
                mt-5
                space-y-3
              "
            >

              {

                getCapabilityHighlights(
                  requiredRole
                ).map(capability => (

                  <CapabilityRow
                    key={capability}
                    label={capability}
                  />
                ))
              }

            </div>

          </div>

          {/* =============================================== */}
          {/* BUTTON */}
          {/* =============================================== */}

          <button
            className="
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-cyan-800
              bg-cyan-950/40
              px-6
              py-4
              text-[13px]
              font-black
              uppercase
              tracking-[0.18em]
              text-cyan-300
              transition-all
              hover:border-cyan-700
              hover:bg-cyan-900/40
            "
          >

            <Lock className="h-4 w-4" />

            Upgrade Access

            <ArrowRight className="h-4 w-4" />

          </button>

        </div>

      </div>

    </div>
  )
}

// ============================================================
// REQUIRED ROLE
// ============================================================

function getRequiredRole(

  feature:
    PlatformFeature

):

  PlatformRole{

  // ==========================================================
  // PREMIUM
  // ==========================================================

  if (

    [

      "EXPEDITION_INTELLIGENCE",
      "PREDICTIVE_MAINTENANCE",
      "FAILURE_CORRELATION",
      "OPERATIONAL_READINESS",
      "TELEMETRY_VISUALIZATION"

    ].includes(feature)

  ){

    return "PREMIUM"
  }

  // ==========================================================
  // FLEET
  // ==========================================================

  if (

    [

      "FLEET_DASHBOARD",
      "MULTI_VEHICLE_MANAGEMENT",
      "FLEET_ANALYTICS"

    ].includes(feature)

  ){

    return "FLEET"
  }

  // ==========================================================
  // ADMIN
  // ==========================================================

  return "ADMIN"
}

// ============================================================
// CAPABILITIES
// ============================================================

function getCapabilityHighlights(

  role:
    PlatformRole

){

  // ==========================================================
  // PREMIUM
  // ==========================================================

  if (

    role === "PREMIUM"

  ){

    return [

      "Expedition Intelligence",

      "Predictive Maintenance AI",

      "Operational Readiness Scoring",

      "Failure Correlation Intelligence",

      "Telemetry Visualization Layer"
    ]
  }

  // ==========================================================
  // FLEET
  // ==========================================================

  if (

    role === "FLEET"

  ){

    return [

      "Fleet Dashboard",

      "Multi Vehicle Management",

      "Fleet Operational Analytics",

      "Commercial Procurement Aggregation",

      "Deployment Readiness Monitoring"
    ]
  }

  // ==========================================================
  // ADMIN
  // ==========================================================

  return [

    "Federation Administration",

    "Supplier Telemetry Management",

    "Operational Platform Control",

    "Commercial Configuration",

    "Enterprise System Management"
  ]
}

// ============================================================
// ROW
// ============================================================

function CapabilityRow({

  label

}: {

  label: string

}){

  return (

    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      <div
        className="
          h-2.5
          w-2.5
          rounded-full
          bg-[#38BDF8]
        "
      />

      <div
        className="
          text-[13px]
          font-semibold
          text-slate-300
        "
      >
        {label}
      </div>

    </div>
  )
}