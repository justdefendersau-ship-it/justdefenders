/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\FederationSearchContext.tsx
 *
 * Timestamp:
 * 24 May 2026 15:07 Sydney
 *
 * PURPOSE:
 * Federation Search Context
 *
 * STRATEGY:
 * PASS 46 / PASS 47 Production Stabilization
 *
 * OBJECTIVES:
 * - production-safe federation state
 * - tactical procurement orchestration
 * - stable provider hierarchy
 * - mobile operational readiness
 * - resilient federation telemetry
 *
 * ============================================================
 */

"use client"

import {

  createContext,
  useCallback,
  useContext,
  useMemo,
  useState

} from "react"

// ============================================================
// TYPES
// ============================================================

export interface FederationSupplierResult {

  supplierId: string

  supplierName: string

  health:
    "HEALTHY"
    |
    "DEGRADED"
    |
    "OFFLINE"

  latencyMs: number
}

export interface FederationSearchContextValue {

  setQuery:
    React.Dispatch<
      React.SetStateAction<string>
    >

  performSearch:
    (
      incomingQuery: string
    ) => Promise<void>

  refresh:
    () => void

  clear:
    () => void

  loading: boolean

  query: string

  results:
    FederationSupplierResult[]

  lastUpdated:
    string
    |
    null

  error:
    string
    |
    null
}

// ============================================================
// CONTEXT
// ============================================================

const FederationSearchContext =
  createContext<
    FederationSearchContextValue
    |
    undefined
  >(undefined)

// ============================================================
// PROVIDER
// ============================================================

export function FederationSearchProvider({

  children

}: {

  children: React.ReactNode

}){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    query,

    setQuery

  ] = useState("")

  const [

    loading,

    setLoading

  ] = useState(false)

  const [

    results,

    setResults

  ] = useState<
    FederationSupplierResult[]
  >([])

  const [

    lastUpdated,

    setLastUpdated

  ] = useState<
    string
    |
    null
  >(null)

  const [

    error,

    setError

  ] = useState<
    string
    |
    null
  >(null)

  // ==========================================================
  // SEARCH
  // ==========================================================

  const performSearch =
    useCallback(

      async (
        incomingQuery: string
      ) => {

        try {

          setLoading(true)

          setError(null)

          setQuery(
            incomingQuery
          )

          // ==================================================
          // MOCK FEDERATION RESULTS
          // ==================================================

          await new Promise(

            resolve => {

              setTimeout(
                resolve,
                300
              )
            }
          )

          setResults([

            {

              supplierId: "repco",

              supplierName: "Repco",

              health: "HEALTHY",

              latencyMs: 241
            },

            {

              supplierId: "burson",

              supplierName:
                "Burson Auto Parts",

              health: "HEALTHY",

              latencyMs: 327
            },

            {

              supplierId: "lrdirect",

              supplierName:
                "LR Direct",

              health: "DEGRADED",

              latencyMs: 611
            }
          ])

          setLastUpdated(
            new Date().toISOString()
          )

        } catch (runtimeError){

          console.error(

            "[FEDERATION_SEARCH_ERROR]",

            runtimeError
          )

          setError(
            "Federation search failed."
          )

        } finally {

          setLoading(false)
        }

      },

      []
    )

  // ==========================================================
  // REFRESH
  // ==========================================================

  const refresh =
    useCallback(() => {

      if(query){

        void performSearch(query)
      }

    }, [

      query,
      performSearch
    ])

  // ==========================================================
  // CLEAR
  // ==========================================================

  const clear =
    useCallback(() => {

      setQuery("")

      setResults([])

      setError(null)

      setLastUpdated(null)

    }, [])

  // ==========================================================
  // VALUE
  // ==========================================================

  const value =
    useMemo<
      FederationSearchContextValue
    >(() => {

      return {

        setQuery,

        performSearch,

        refresh,

        clear,

        loading,

        query,

        results,

        lastUpdated,

        error
      }

    }, [

      performSearch,
      refresh,
      clear,
      loading,
      query,
      results,
      lastUpdated,
      error
    ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <FederationSearchContext.Provider
      value={value}
    >

      {children}

    </FederationSearchContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useFederationSearch(){

  const context =
    useContext(
      FederationSearchContext
    )

  if(!context){

    throw new Error(

      "useFederationSearch must be used within FederationSearchProvider"
    )
  }

  return context
}