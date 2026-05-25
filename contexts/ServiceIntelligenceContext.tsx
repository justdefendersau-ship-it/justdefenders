/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\ServiceIntelligenceContext.tsx
 *
 * Timestamp:
 * 22 May 2026 15:46 Sydney
 *
 * PURPOSE:
 * Procurement Intelligence Memory + Service Intelligence
 *
 * STRATEGY:
 * PASS 33 — Procurement Intelligence Memory + Service Intelligence
 *
 * OBJECTIVES:
 * - procurement memory
 * - service intelligence
 * - vehicle maintenance memory
 * - predictive procurement behavior
 * - operational service tracking
 * - tactical fleet intelligence
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

  useVehicleContext

} from "@/contexts/VehicleContext"

// ============================================================
// TYPES
// ============================================================

export interface ProcurementMemoryRecord {

  query: string

  timestamp: string

  supplier?: string
}

export interface ServiceAlert {

  id: string

  title: string

  severity:
    "LOW"
    |
    "MEDIUM"
    |
    "HIGH"
    |
    "CRITICAL"

  recommendation: string
}

interface ServiceIntelligenceState {

  procurementHistory:
    ProcurementMemoryRecord[]

  addProcurementRecord:
    (
      query: string,
      supplier?: string
    ) => void

  serviceAlerts:
    ServiceAlert[]

  recommendedSearches:
    string[]

  clearHistory:
    () => void
}

// ============================================================
// STORAGE
// ============================================================

const STORAGE_PREFIX =
  "justdefenders_procurement_memory"

// ============================================================
// CONTEXT
// ============================================================

const ServiceIntelligenceContext =
  createContext<
    ServiceIntelligenceState
    |
    null
  >(null)

// ============================================================
// PROVIDER
// ============================================================

export function ServiceIntelligenceProvider({

  children

}: {

  children: React.ReactNode

}){

  const {

    vin,
    profile

  } = useVehicleContext()

  const [

    procurementHistory,

    setProcurementHistory

  ] = useState<
    ProcurementMemoryRecord[]
  >([])

  // ==========================================================
  // STORAGE KEY
  // ==========================================================

  const storageKey =
    `${STORAGE_PREFIX}_${vin}`

  // ==========================================================
  // LOAD HISTORY
  // ==========================================================

  useEffect(() => {

    const stored =
      localStorage.getItem(
        storageKey
      )

    if (

      stored

    ){

      try {

        setProcurementHistory(
          JSON.parse(stored)
        )

      } catch {

        setProcurementHistory([])
      }

    } else {

      setProcurementHistory([])
    }

  }, [storageKey])

  // ==========================================================
  // SAVE HISTORY
  // ==========================================================

  useEffect(() => {

    localStorage.setItem(

      storageKey,

      JSON.stringify(
        procurementHistory
      )
    )

  }, [

    procurementHistory,
    storageKey

  ])

  // ==========================================================
  // ADD RECORD
  // ==========================================================

  function addProcurementRecord(

    query: string,
    supplier?: string

  ){

    if (

      !query.trim()

    ){

      return
    }

    const record:
      ProcurementMemoryRecord = {

      query,

      supplier,

      timestamp:
        new Date().toISOString()
    }

    setProcurementHistory(

      previous => [

        record,

        ...previous
      ].slice(0, 50)
    )
  }

  // ==========================================================
  // CLEAR
  // ==========================================================

  function clearHistory(){

    setProcurementHistory([])
  }

  // ==========================================================
  // ALERTS
  // ==========================================================

  const serviceAlerts =
    useMemo(() => {

      if (

        !profile

      ){

        return []
      }

      // ======================================================
      // 300TDI
      // ======================================================

      if (

        profile.engine === "300Tdi"

      ){

        return [

          {

            id: "timing-belt",

            title:
              "Timing Belt Service Monitoring",

            severity: "CRITICAL" as const,

            recommendation:
              "Monitor timing belt interval and coolant system integrity."
          },

          {

            id: "cooling-system",

            title:
              "Cooling System Expedition Risk",

            severity: "HIGH" as const,

            recommendation:
              "Inspect coolant hoses and water pump before remote operation."
          }
        ]
      }

      // ======================================================
      // TD5
      // ======================================================

      if (

        profile.engine === "Td5"

      ){

        return [

          {

            id: "injector-harness",

            title:
              "Injector Harness Monitoring",

            severity: "HIGH" as const,

            recommendation:
              "Monitor injector harness contamination and oil migration."
          },

          {

            id: "oil-pump",

            title:
              "Oil Pump Bolt Inspection",

            severity: "CRITICAL" as const,

            recommendation:
              "Verify oil pump bolt integrity during service interval."
          }
        ]
      }

      // ======================================================
      // PUMA
      // ======================================================

      return [

        {

          id: "intercooler",

          title:
            "Intercooler Hose Monitoring",

          severity: "MEDIUM" as const,

          recommendation:
            "Inspect intercooler and turbo hoses for degradation."
        },

        {

          id: "clutch-system",

          title:
            "Clutch Hydraulic Monitoring",

          severity: "MEDIUM" as const,

          recommendation:
            "Monitor clutch slave cylinder reliability during remote operation."
        }
      ]

    }, [profile])

  // ==========================================================
  // RECOMMENDED SEARCHES
  // ==========================================================

  const recommendedSearches =
    useMemo(() => {

      if (

        !profile

      ){

        return []
      }

      if (

        profile.engine === "300Tdi"

      ){

        return [

          "timing belt kit",
          "water pump",
          "coolant hose",
          "fuel sedimenter",
          "oil filter"
        ]
      }

      if (

        profile.engine === "Td5"

      ){

        return [

          "injector harness",
          "fuel pressure regulator",
          "oil pump bolt",
          "coolant hose",
          "oil filter"
        ]
      }

      return [

        "intercooler hose",
        "turbo hose",
        "clutch slave cylinder",
        "EGR valve",
        "oil filter"
      ]

    }, [profile])

  // ==========================================================
  // VALUE
  // ==========================================================

  const value:
    ServiceIntelligenceState = {

    procurementHistory,

    addProcurementRecord,

    serviceAlerts,

    recommendedSearches,

    clearHistory
  }

  return (

    <ServiceIntelligenceContext.Provider
      value={value}
    >

      {children}

    </ServiceIntelligenceContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useServiceIntelligence(){

  const context =
    useContext(
      ServiceIntelligenceContext
    )

  if (

    !context

  ){

    throw new Error(

      "useServiceIntelligence must be used within ServiceIntelligenceProvider"
    )
  }

  return context
}