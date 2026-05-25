/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\FleetOperationsContext.tsx
 *
 * Timestamp:
 * 23 May 2026 19:42 Sydney
 *
 * PURPOSE:
 * Fleet Operations Intelligence Context
 *
 * STRATEGY:
 * PASS 39 — Fleet Operations Layer
 *
 * OBJECTIVES:
 * - multi-vehicle operational intelligence
 * - fleet readiness aggregation
 * - deployment survivability telemetry
 * - fleet procurement analytics
 * - expedition fleet coordination
 * - enterprise operational intelligence
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

import type {

  DefenderVehicleProfile

} from "@/lib/vin/vinDecoder"

// ============================================================
// TYPES
// ============================================================

export interface FleetVehicle {

  id: string

  vin: string

  profile:
    DefenderVehicleProfile

  readinessScore: number

  expeditionScore: number

  survivabilityScore: number

  maintenanceRisk: number

  active: boolean

  lastUpdated: string
}

export interface FleetOperationalAssessment {

  fleetReadiness: number

  fleetSurvivability: number

  deploymentConfidence: number

  operationalAvailability: number

  expeditionRisk: number

  totalVehicles: number

  activeVehicles: number
}

interface FleetOperationsContextValue {

  fleetVehicles:
    FleetVehicle[]

  assessment:
    FleetOperationalAssessment

  addVehicle: (

    vehicle:
      FleetVehicle

  ) => void

  removeVehicle: (

    vehicleId: string

  ) => void

  updateVehicle: (

    vehicle:
      FleetVehicle

  ) => void

  clearFleet: () => void
}

// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY =
  "justdefenders-fleet-operations"

// ============================================================
// CONTEXT
// ============================================================

const FleetOperationsContext =
  createContext<
    FleetOperationsContextValue
    |
    undefined
  >(undefined)

// ============================================================
// HELPERS
// ============================================================

function average(

  values: number[]

){

  if (

    values.length === 0

  ){

    return 0
  }

  return Math.round(

    values.reduce(

      (

        total,
        value

      ) =>

        total + value,

      0
    ) / values.length
  )
}

// ============================================================
// ASSESSMENT
// ============================================================

function buildFleetAssessment(

  vehicles:
    FleetVehicle[]

):

  FleetOperationalAssessment{

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    vehicles.length === 0

  ){

    return {

      fleetReadiness: 0,

      fleetSurvivability: 0,

      deploymentConfidence: 0,

      operationalAvailability: 0,

      expeditionRisk: 0,

      totalVehicles: 0,

      activeVehicles: 0
    }
  }

  // ==========================================================
  // ACTIVE
  // ==========================================================

  const activeVehicles =
    vehicles.filter(

      vehicle =>

        vehicle.active
    )

  // ==========================================================
  // READINESS
  // ==========================================================

  const fleetReadiness =
    average(

      vehicles.map(

        vehicle =>

          vehicle.readinessScore
      )
    )

  // ==========================================================
  // SURVIVABILITY
  // ==========================================================

  const fleetSurvivability =
    average(

      vehicles.map(

        vehicle =>

          vehicle.survivabilityScore
      )
    )

  // ==========================================================
  // DEPLOYMENT
  // ==========================================================

  const deploymentConfidence =
    average(

      vehicles.map(

        vehicle =>

          vehicle.expeditionScore
      )
    )

  // ==========================================================
  // AVAILABILITY
  // ==========================================================

  const operationalAvailability =
    Math.round(

      (
        activeVehicles.length
        /
        vehicles.length
      ) * 100
    )

  // ==========================================================
  // RISK
  // ==========================================================

  const expeditionRisk =
    average(

      vehicles.map(

        vehicle =>

          vehicle.maintenanceRisk
      )
    )

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    fleetReadiness,

    fleetSurvivability,

    deploymentConfidence,

    operationalAvailability,

    expeditionRisk,

    totalVehicles:
      vehicles.length,

    activeVehicles:
      activeVehicles.length
  }
}

// ============================================================
// PROVIDER
// ============================================================

export function FleetOperationsProvider({

  children

}: {

  children: React.ReactNode

}){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    fleetVehicles,
    setFleetVehicles

  ] = useState<
    FleetVehicle[]
  >([])

  // ==========================================================
  // LOAD
  // ==========================================================

  useEffect(() => {

    try {

      const raw =
        localStorage.getItem(
          STORAGE_KEY
        )

      if (

        raw

      ){

        const parsed =
          JSON.parse(raw)

        setFleetVehicles(parsed)
      }

    } catch (

      error

    ){

      console.error(

        "[FLEET_LOAD_ERROR]",

        error
      )

      localStorage.removeItem(
        STORAGE_KEY
      )
    }

  }, [])

  // ==========================================================
  // SAVE
  // ==========================================================

  useEffect(() => {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(
        fleetVehicles
      )
    )

  }, [

    fleetVehicles
  ])

  // ==========================================================
  // ADD
  // ==========================================================

  function addVehicle(

    vehicle:
      FleetVehicle

  ){

    setFleetVehicles(previous => {

      const exists =
        previous.some(

          existing =>

            existing.id === vehicle.id
        )

      if (

        exists

      ){

        return previous
      }

      return [

        vehicle,

        ...previous
      ]
    })
  }

  // ==========================================================
  // REMOVE
  // ==========================================================

  function removeVehicle(

    vehicleId: string

  ){

    setFleetVehicles(previous =>

      previous.filter(

        vehicle =>

          vehicle.id !== vehicleId
      )
    )
  }

  // ==========================================================
  // UPDATE
  // ==========================================================

  function updateVehicle(

    vehicle:
      FleetVehicle

  ){

    setFleetVehicles(previous =>

      previous.map(existing =>

        existing.id === vehicle.id

        ?

        vehicle

        :

        existing
      )
    )
  }

  // ==========================================================
  // CLEAR
  // ==========================================================

  function clearFleet(){

    setFleetVehicles([])
  }

  // ==========================================================
  // ASSESSMENT
  // ==========================================================

  const assessment =
    useMemo(() =>

      buildFleetAssessment(
        fleetVehicles
      ),

      [fleetVehicles]
    )

  // ==========================================================
  // VALUE
  // ==========================================================

  const value =
    useMemo<
      FleetOperationsContextValue
    >(() => ({

      fleetVehicles,

      assessment,

      addVehicle,

      removeVehicle,

      updateVehicle,

      clearFleet

    }), [

      fleetVehicles,
      assessment
    ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <FleetOperationsContext.Provider
      value={value}
    >

      {children}

    </FleetOperationsContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useFleetOperations(){

  const context =
    useContext(
      FleetOperationsContext
    )

  if (

    !context

  ){

    throw new Error(

      "useFleetOperations must be used within FleetOperationsProvider"
    )
  }

  return context
}