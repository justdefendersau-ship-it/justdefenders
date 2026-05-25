/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\VehicleContext.tsx
 *
 * Timestamp:
 * 23 May 2026 12:28 Sydney
 *
 * PURPOSE:
 * Operational Vehicle Context
 *
 * STRATEGY:
 * PASS 34 — Persistent Vehicle Intelligence
 *
 * OBJECTIVES:
 * - VIN persistence
 * - removable saved vehicles
 * - operational Defender intelligence
 * - synchronized vehicle state
 * - tactical expedition orchestration
 *
 * ============================================================
 */

"use client"

import {

  createContext,
  useContext,
  useEffect,
  useMemo,
  useState

} from "react"

import {

  decodeDefenderVIN,
  DefenderVehicleProfile

} from "@/lib/vin/vinDecoder"

// ============================================================
// TYPES
// ============================================================

interface VehicleContextValue {

  vin: string

  setVin:
    (
      vin: string
    ) => void

  profile:
    DefenderVehicleProfile
    |
    null

  savedVehicles:
    DefenderVehicleProfile[]

  removeSavedVehicle:
    (
      vin: string
    ) => void
}

// ============================================================
// CONTEXT
// ============================================================

const VehicleContext =
  createContext<
    VehicleContextValue
    |
    null
  >(null)

// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY =
  "justdefenders_saved_vehicles"

// ============================================================
// PROVIDER
// ============================================================

export function VehicleProvider({

  children

}: {

  children: React.ReactNode

}){

  const [

    vin,
    setVinState

  ] = useState("")

  const [

    profile,
    setProfile

  ] = useState<
    DefenderVehicleProfile
    |
    null
  >(null)

  const [

    savedVehicles,
    setSavedVehicles

  ] = useState<
    DefenderVehicleProfile[]
  >([])

  // ==========================================================
  // LOAD STORAGE
  // ==========================================================

  useEffect(() => {

    try {

      const raw =
        localStorage.getItem(
          STORAGE_KEY
        )

      if (

        !raw

      ){

        return
      }

      const parsed =
        JSON.parse(raw)

      if (

        Array.isArray(parsed)

      ){

        setSavedVehicles(parsed)
      }

    } catch (

      exception

    ){

      console.error(
        exception
      )
    }

  }, [])

  // ==========================================================
  // SAVE STORAGE
  // ==========================================================

  useEffect(() => {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(
        savedVehicles
      )
    )

  }, [savedVehicles])

  // ==========================================================
  // SET VIN
  // ==========================================================

  function setVin(

    nextVin: string

  ){

    setVinState(nextVin)

    const decoded =
      decodeDefenderVIN(
        nextVin
      )

    setProfile(decoded)

    if (

      !decoded

    ){

      return
    }

    setSavedVehicles(previous => {

      const exists =
        previous.some(

          vehicle =>

            vehicle.vin ===
            decoded.vin
        )

      if (

        exists

      ){

        return previous
      }

      return [

        decoded,
        ...previous
      ]
    })
  }

  // ==========================================================
  // REMOVE VEHICLE
  // ==========================================================

  function removeSavedVehicle(

    vinToRemove: string

  ){

    setSavedVehicles(previous =>

      previous.filter(

        vehicle =>

          vehicle.vin !==
          vinToRemove
      )
    )

    // ========================================================
    // CLEAR ACTIVE
    // ========================================================

    if (

      vin === vinToRemove

    ){

      setVinState("")

      setProfile(null)
    }
  }

  // ==========================================================
  // VALUE
  // ==========================================================

  const value =
    useMemo(() => ({

      vin,

      setVin,

      profile,

      savedVehicles,

      removeSavedVehicle

    }), [

      vin,
      profile,
      savedVehicles
    ])

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (

    <VehicleContext.Provider
      value={value}
    >

      {children}

    </VehicleContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useVehicleContext(){

  const context =
    useContext(
      VehicleContext
    )

  if (

    !context

  ){

    throw new Error(

      "useVehicleContext must be used within VehicleProvider"
    )
  }

  return context
}