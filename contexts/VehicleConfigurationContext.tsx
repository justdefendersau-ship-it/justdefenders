/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\VehicleConfigurationContext.tsx
 *
 * Timestamp:
 * 19 May 2026 14:10 Sydney
 *
 * PURPOSE:
 * Shared Vehicle Intelligence Context
 *
 * STRATEGY:
 * Canonical operational Defender configuration state.
 *
 * IMPORTANT:
 * Supports:
 * - modified Defenders
 * - swapped drivetrains
 * - expedition builds
 * - procurement orchestration
 * - OEM validation
 * ============================================================
 */

"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState
} from "react"

import {
  calculateCompatibility
} from "@/lib/fitment/compatibilityEngine"

import {
  calculateProcurementScore
} from "@/lib/procurement/procurementScoring"

// ============================================================
// TYPES
// ============================================================

export type VehicleConfiguration = {

  platform: string

  originalEngine: string

  currentEngine: string

  gearbox: string

  transferCase: string

  axleType: string

  brakePackage: string

  wheelPattern: string

  market: string

  military: boolean

  expedition: boolean

  modifications: string[]
}

type VehicleConfigurationContextType = {

  configuration: VehicleConfiguration

  setConfiguration:
    React.Dispatch<
      React.SetStateAction<VehicleConfiguration>
    >

  compatibilityScore: number

  procurementScore: number

  drivetrainProfile: string

  expeditionRisk: string
}

// ============================================================
// CONTEXT
// ============================================================

const VehicleConfigurationContext =
  createContext<
    VehicleConfigurationContextType | null
  >(null)

// ============================================================
// PROVIDER
// ============================================================

export function VehicleConfigurationProvider({
  children
}:{
  children: React.ReactNode
}){

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    configuration,
    setConfiguration
  ] = useState<VehicleConfiguration>({

    platform:
      "Defender 110",

    originalEngine:
      "300Tdi",

    currentEngine:
      "300Tdi",

    gearbox:
      "R380",

    transferCase:
      "LT230",

    axleType:
      "Salisbury",

    brakePackage:
      "Heavy Duty",

    wheelPattern:
      "5x165.1",

    market:
      "Australia",

    military:
      false,

    expedition:
      false,

    modifications: []
  })

  // ==========================================================
  // DERIVED
  // ==========================================================

  const compatibilityScore =
    useMemo(()=>{

      return calculateCompatibility(
        configuration
      )

    },[
      configuration
    ])

  const procurementScore =
    useMemo(()=>{

      return calculateProcurementScore(
        configuration
      )

    },[
      configuration
    ])

  const drivetrainProfile =
    useMemo(()=>{

      if(
        configuration.currentEngine.includes(
          "4BD1"
        )
      ){
        return "Heavy Duty Isuzu"
      }

      if(
        configuration.currentEngine.includes(
          "Td5"
        )
      ){
        return "Electronic Diesel"
      }

      if(
        configuration.currentEngine.includes(
          "2.2"
        )
      ){
        return "Modern Puma"
      }

      return "Mechanical Diesel"

    },[
      configuration
    ])

  const expeditionRisk =
    useMemo(()=>{

      if(configuration.expedition){

        if(
          configuration.currentEngine.includes(
            "Td5"
          )
        ){
          return "Medium"
        }

        if(
          configuration.currentEngine.includes(
            "2.2"
          )
        ){
          return "Medium"
        }

        return "Low"
      }

      return "Normal"

    },[
      configuration
    ])

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (

    <VehicleConfigurationContext.Provider

      value={{

        configuration,
        setConfiguration,

        compatibilityScore,
        procurementScore,

        drivetrainProfile,
        expeditionRisk
      }}
    >

      {children}

    </VehicleConfigurationContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useVehicleConfiguration(){

  const context =
    useContext(
      VehicleConfigurationContext
    )

  if(!context){

    throw new Error(

      "useVehicleConfiguration must be used inside VehicleConfigurationProvider"
    )
  }

  return context
}