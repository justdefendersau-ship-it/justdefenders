/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\hooks\useFederationSearch.ts
 *
 * Timestamp:
 * 24 May 2026 10:04 Sydney
 *
 * PURPOSE:
 * Tactical Federation Search Hook
 *
 * STRATEGY:
 * PASS 46 / PASS 47 Stabilization Layer
 *
 * OBJECTIVES:
 * - federation search orchestration
 * - procurement federation querying
 * - operational telemetry stabilization
 * - search deduplication
 * - debounce protection
 * - infinite loop prevention
 * - mobile operational stability
 * - expedition-grade federation control
 *
 * ============================================================
 */

"use client"

import {

  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState

} from "react"

import {

  useVehicleContext

} from "@/contexts/VehicleContext"

import {

  useServiceIntelligence

} from "@/contexts/ServiceIntelligenceContext"

// ============================================================
// TYPES
// ============================================================

export interface FederationSupplierResult {

  supplierId: string

  supplierName: string

  success: boolean

  latencyMs: number

  health:
    "HEALTHY"
    |
    "DEGRADED"
    |
    "OFFLINE"

  price?: number

  availability?: string

  expeditionScore?: number
}

export interface FederationSearchResponse {

  query: string

  timestamp: string

  suppliers: FederationSupplierResult[]
}

export interface FederationSearchState {

  loading: boolean

  query: string

  results: FederationSupplierResult[]

  lastUpdated: string | null

  error: string | null
}

// ============================================================
// HOOK
// ============================================================

export function useFederationSearch(){

  // ==========================================================
  // CONTEXTS
  // ==========================================================

  const vehicle =
    useVehicleContext()

  const serviceIntelligence =
    useServiceIntelligence()

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    query,

    setQuery

  ] = useState<string>("")

  const [

    loading,

    setLoading

  ] = useState(false)

  const [

    results,

    setResults

  ] = useState<FederationSupplierResult[]>([])

  const [

    lastUpdated,

    setLastUpdated

  ] = useState<string | null>(null)

  const [

    error,

    setError

  ] = useState<string | null>(null)

  // ==========================================================
  // REFS
  // ==========================================================

  const lastExecutedQueryRef =
    useRef<string>("")

  const activeRequestRef =
    useRef<boolean>(false)

  const debounceRef =
    useRef<NodeJS.Timeout | null>(null)

  const abortControllerRef =
    useRef<AbortController | null>(null)

  // ==========================================================
  // SEARCH
  // ==========================================================

  const performSearch =
    useCallback(

      async (
        incomingQuery: string
      ) => {

        const sanitizedQuery =
          incomingQuery.trim()

        // ====================================================
        // EMPTY QUERY
        // ====================================================

        if(!sanitizedQuery){

          return
        }

        // ====================================================
        // DEDUPLICATION
        // ====================================================

        if(

          lastExecutedQueryRef.current
          ===
          sanitizedQuery

        ){

          return
        }

        // ====================================================
        // PREVENT CONCURRENT REQUESTS
        // ====================================================

        if(activeRequestRef.current){

          return
        }

        activeRequestRef.current = true

        setLoading(true)

        setError(null)

        // ====================================================
        // ABORT PREVIOUS
        // ====================================================

        if(abortControllerRef.current){

          abortControllerRef.current.abort()
        }

        const controller =
          new AbortController()

        abortControllerRef.current =
          controller

        try {

          console.log(

            "[TACTICAL_PROCUREMENT_SEARCH]",

            {

              query:
                sanitizedQuery,

              timestamp:
                new Date().toISOString()
            }
          )

          // ================================================
          // API
          // ================================================

          const response =
            await fetch(

              `/api/procurement/search?q=${encodeURIComponent(
                sanitizedQuery
              )}`,

              {

                method:
                  "GET",

                signal:
                  controller.signal,

                headers: {

                  "Content-Type":
                    "application/json"
                }
              }
            )

          if(!response.ok){

            throw new Error(

              `Federation search failed: ${response.status}`
            )
          }

          const data:
            FederationSearchResponse =
              await response.json()

          // ================================================
          // UPDATE
          // ================================================

          setResults(

            Array.isArray(
              data.suppliers
            )

            ?

            data.suppliers

            :

            []
          )

          setLastUpdated(
            new Date().toISOString()
          )

          lastExecutedQueryRef.current =
            sanitizedQuery

        } catch(searchError: any){

          // ================================================
          // IGNORE ABORTS
          // ================================================

          if(

            searchError?.name
            ===
            "AbortError"

          ){

            return
          }

          console.error(

            "[FEDERATION_SEARCH_ERROR]",

            searchError
          )

          setError(

            searchError?.message
            ||
            "Operational federation search failure."
          )

        } finally {

          activeRequestRef.current = false

          setLoading(false)
        }

      },

      [

        vehicle,
        serviceIntelligence
      ]
    )

  // ==========================================================
  // DEBOUNCED EFFECT
  // ==========================================================

  useEffect(() => {

    const sanitizedQuery =
      query.trim()

    // ========================================================
    // EMPTY QUERY
    // ========================================================

    if(!sanitizedQuery){

      return
    }

    // ========================================================
    // SAME QUERY PROTECTION
    // ========================================================

    if(

      lastExecutedQueryRef.current
      ===
      sanitizedQuery

    ){

      return
    }

    // ========================================================
    // CLEAR EXISTING DEBOUNCE
    // ========================================================

    if(debounceRef.current){

      clearTimeout(
        debounceRef.current
      )
    }

    // ========================================================
    // DEBOUNCE
    // ========================================================

    debounceRef.current =
      setTimeout(() => {

        performSearch(
          sanitizedQuery
        )

      }, 450)

    // ========================================================
    // CLEANUP
    // ========================================================

    return () => {

      if(debounceRef.current){

        clearTimeout(
          debounceRef.current
        )
      }
    }

  }, [

    query,
    performSearch
  ])

  // ==========================================================
  // MANUAL REFRESH
  // ==========================================================

  const refresh =
    useCallback(() => {

      if(query.trim()){

        lastExecutedQueryRef.current = ""

        performSearch(query)
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

      lastExecutedQueryRef.current = ""

    }, [])

  // ==========================================================
  // STATE
  // ==========================================================

  const state:
    FederationSearchState =
      useMemo(() => ({

        loading,
        query,
        results,
        lastUpdated,
        error

      }), [

        loading,
        query,
        results,
        lastUpdated,
        error
      ])

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    ...state,

    setQuery,

    performSearch,

    refresh,

    clear
  }
}