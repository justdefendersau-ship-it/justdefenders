/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\ProcurementContext.tsx
 *
 * Timestamp:
 * 18 May 2026 19:00 Sydney
 *
 * PURPOSE:
 * Global Procurement Intelligence Context
 *
 * STRATEGY:
 * Shared operational procurement state.
 *
 * IMPORTANT:
 * Single authoritative source for:
 * - vehicle configuration
 * - VIN
 * - expedition state
 * - procurement preferences
 * - supplier orchestration
 * ============================================================
 */

"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState
} from "react"

// ============================================================
// TYPES
// ============================================================

export interface VehicleConfiguration {

  model: string

  engine: string

  years: string
}

interface ProcurementContextType {

  // ==========================================================
  // MODES
  // ==========================================================

  mode:
    "vehicle"
    |
    "vin"

  setMode:
    (
      mode:
        "vehicle"
        |
        "vin"
    )=>void

  // ==========================================================
  // VEHICLE
  // ==========================================================

  vehicle:
    VehicleConfiguration

  setVehicle:
    (
      vehicle:
        VehicleConfiguration
    )=>void

  // ==========================================================
  // VIN
  // ==========================================================

  vin: string

  setVin:
    (
      vin: string
    )=>void

  // ==========================================================
  // PROCUREMENT
  // ==========================================================

  expeditionMode: boolean

  setExpeditionMode:
    (
      enabled: boolean
    )=>void

  oemPriority: boolean

  setOemPriority:
    (
      enabled: boolean
    )=>void

  nearbySearch: boolean

  setNearbySearch:
    (
      enabled: boolean
    )=>void

  recoverySearch: boolean

  setRecoverySearch:
    (
      enabled: boolean
    )=>void
}

// ============================================================
// CONTEXT
// ============================================================

const ProcurementContext =
  createContext<
    ProcurementContextType
    |
    null
  >(null)

// ============================================================
// PROVIDER
// ============================================================

export function ProcurementProvider({
  children
}:{
  children: React.ReactNode
}){

  // ==========================================================
  // MODE
  // ==========================================================

  const [
    mode,
    setMode
  ] = useState<
    "vehicle"
    |
    "vin"
  >("vehicle")

  // ==========================================================
  // VEHICLE
  // ==========================================================

  const [
    vehicle,
    setVehicle
  ] = useState<
    VehicleConfiguration
  >({

    model:
      "Defender 110",

    engine:
      "300Tdi",

    years:
      "1994-1998"
  })

  // ==========================================================
  // VIN
  // ==========================================================

  const [
    vin,
    setVin
  ] = useState("")

  // ==========================================================
  // PROCUREMENT
  // ==========================================================

  const [
    expeditionMode,
    setExpeditionMode
  ] = useState(true)

  const [
    oemPriority,
    setOemPriority
  ] = useState(true)

  const [
    nearbySearch,
    setNearbySearch
  ] = useState(true)

  const [
    recoverySearch,
    setRecoverySearch
  ] = useState(false)

  // ==========================================================
  // VALUE
  // ==========================================================

  const value =
    useMemo(()=>{

      return {

        mode,
        setMode,

        vehicle,
        setVehicle,

        vin,
        setVin,

        expeditionMode,
        setExpeditionMode,

        oemPriority,
        setOemPriority,

        nearbySearch,
        setNearbySearch,

        recoverySearch,
        setRecoverySearch
      }

    },[

      mode,
      vehicle,
      vin,

      expeditionMode,
      oemPriority,
      nearbySearch,
      recoverySearch
    ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <ProcurementContext.Provider
      value={value}
    >

      {children}

    </ProcurementContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useProcurement(){

  const context =
    useContext(
      ProcurementContext
    )

  if(!context){

    throw new Error(
      "useProcurement must be used inside ProcurementProvider"
    )
  }

  return context
}