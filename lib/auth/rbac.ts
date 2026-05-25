/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\auth\rbac.ts
 *
 * Timestamp:
 * 23 May 2026 18:14 Sydney
 *
 * PURPOSE:
 * Commercial Platform RBAC Layer
 *
 * STRATEGY:
 * PASS 38 — Commercial Platform Layer
 *
 * OBJECTIVES:
 * - role-based access control
 * - operational intelligence gating
 * - commercial entitlement management
 * - fleet operator support
 * - admin operational controls
 * - premium intelligence enforcement
 *
 * ============================================================
 */

// ============================================================
// ROLES
// ============================================================

export type PlatformRole =

  | "MEMBER"
  | "PREMIUM"
  | "FLEET"
  | "ADMIN"

// ============================================================
// FEATURE FLAGS
// ============================================================

export type PlatformFeature =

  // ==========================================================
  // MEMBER
  // ==========================================================

  | "PROCUREMENT_FEDERATION"
  | "VIN_INTELLIGENCE"
  | "SAVED_VEHICLES"

  // ==========================================================
  // PREMIUM
  // ==========================================================

  | "EXPEDITION_INTELLIGENCE"
  | "PREDICTIVE_MAINTENANCE"
  | "FAILURE_CORRELATION"
  | "OPERATIONAL_READINESS"
  | "TELEMETRY_VISUALIZATION"

  // ==========================================================
  // FLEET
  // ==========================================================

  | "FLEET_DASHBOARD"
  | "MULTI_VEHICLE_MANAGEMENT"
  | "FLEET_ANALYTICS"

  // ==========================================================
  // ADMIN
  // ==========================================================

  | "ADMIN_PANEL"
  | "FEDERATION_CONTROL"
  | "SUPPLIER_TELEMETRY"
  | "SYSTEM_CONFIGURATION"

// ============================================================
// USER
// ============================================================

export interface PlatformUser {

  id: string

  name: string

  email: string

  role: PlatformRole

  active: boolean

  fleetId?: string | null
}

// ============================================================
// ROLE MAP
// ============================================================

export const ROLE_FEATURES:

  Record<
    PlatformRole,
    PlatformFeature[]
  > = {

  // ==========================================================
  // MEMBER
  // ==========================================================

  MEMBER: [

    "PROCUREMENT_FEDERATION",
    "VIN_INTELLIGENCE",
    "SAVED_VEHICLES"
  ],

  // ==========================================================
  // PREMIUM
  // ==========================================================

  PREMIUM: [

    "PROCUREMENT_FEDERATION",
    "VIN_INTELLIGENCE",
    "SAVED_VEHICLES",

    "EXPEDITION_INTELLIGENCE",
    "PREDICTIVE_MAINTENANCE",
    "FAILURE_CORRELATION",
    "OPERATIONAL_READINESS",
    "TELEMETRY_VISUALIZATION"
  ],

  // ==========================================================
  // FLEET
  // ==========================================================

  FLEET: [

    "PROCUREMENT_FEDERATION",
    "VIN_INTELLIGENCE",
    "SAVED_VEHICLES",

    "EXPEDITION_INTELLIGENCE",
    "PREDICTIVE_MAINTENANCE",
    "FAILURE_CORRELATION",
    "OPERATIONAL_READINESS",
    "TELEMETRY_VISUALIZATION",

    "FLEET_DASHBOARD",
    "MULTI_VEHICLE_MANAGEMENT",
    "FLEET_ANALYTICS"
  ],

  // ==========================================================
  // ADMIN
  // ==========================================================

  ADMIN: [

    "PROCUREMENT_FEDERATION",
    "VIN_INTELLIGENCE",
    "SAVED_VEHICLES",

    "EXPEDITION_INTELLIGENCE",
    "PREDICTIVE_MAINTENANCE",
    "FAILURE_CORRELATION",
    "OPERATIONAL_READINESS",
    "TELEMETRY_VISUALIZATION",

    "FLEET_DASHBOARD",
    "MULTI_VEHICLE_MANAGEMENT",
    "FLEET_ANALYTICS",

    "ADMIN_PANEL",
    "FEDERATION_CONTROL",
    "SUPPLIER_TELEMETRY",
    "SYSTEM_CONFIGURATION"
  ]
}

// ============================================================
// FEATURE CHECK
// ============================================================

export function hasFeatureAccess(

  user:

    PlatformUser
    |
    null
    |
    undefined,

  feature:
    PlatformFeature

){

  // ==========================================================
  // NO USER
  // ==========================================================

  if (

    !user

  ){

    return false
  }

  // ==========================================================
  // DISABLED
  // ==========================================================

  if (

    !user.active

  ){

    return false
  }

  // ==========================================================
  // FEATURES
  // ==========================================================

  const features =
    ROLE_FEATURES[
      user.role
    ]

  return features.includes(
    feature
  )
}

// ============================================================
// MULTI FEATURE CHECK
// ============================================================

export function hasAnyFeatureAccess(

  user:

    PlatformUser
    |
    null
    |
    undefined,

  features:
    PlatformFeature[]

){

  return features.some(

    feature =>

      hasFeatureAccess(
        user,
        feature
      )
  )
}

// ============================================================
// ROLE CHECK
// ============================================================

export function isAdmin(

  user:

    PlatformUser
    |
    null
    |
    undefined

){

  return user?.role === "ADMIN"
}

// ============================================================
// FLEET CHECK
// ============================================================

export function isFleetOperator(

  user:

    PlatformUser
    |
    null
    |
    undefined

){

  return (

    user?.role === "FLEET"
    ||
    user?.role === "ADMIN"
  )
}

// ============================================================
// PREMIUM CHECK
// ============================================================

export function isPremium(

  user:

    PlatformUser
    |
    null
    |
    undefined

){

  return (

    user?.role === "PREMIUM"
    ||
    user?.role === "FLEET"
    ||
    user?.role === "ADMIN"
  )
}

// ============================================================
// FEATURE LABELS
// ============================================================

export const FEATURE_LABELS:

  Record<
    PlatformFeature,
    string
  > = {

  PROCUREMENT_FEDERATION:
    "Operational Procurement Federation",

  VIN_INTELLIGENCE:
    "Vehicle Intelligence",

  SAVED_VEHICLES:
    "Saved Vehicles",

  EXPEDITION_INTELLIGENCE:
    "Expedition Intelligence",

  PREDICTIVE_MAINTENANCE:
    "Predictive Maintenance",

  FAILURE_CORRELATION:
    "Failure Correlation Intelligence",

  OPERATIONAL_READINESS:
    "Operational Readiness Intelligence",

  TELEMETRY_VISUALIZATION:
    "Telemetry Visualization",

  FLEET_DASHBOARD:
    "Fleet Dashboard",

  MULTI_VEHICLE_MANAGEMENT:
    "Multi Vehicle Management",

  FLEET_ANALYTICS:
    "Fleet Analytics",

  ADMIN_PANEL:
    "Administrative Platform",

  FEDERATION_CONTROL:
    "Federation Control Systems",

  SUPPLIER_TELEMETRY:
    "Supplier Telemetry Intelligence",

  SYSTEM_CONFIGURATION:
    "Platform Configuration"
}

// ============================================================
// MOCK USER
// ============================================================

export const MOCK_PLATFORM_USER:

  PlatformUser = {

  id:
    "jd-admin-001",

  name:
    "JustDefenders Admin",

  email:
    "admin@justdefenders.com",

  role:
    "ADMIN",

  active:
    true,

  fleetId:
    null
}