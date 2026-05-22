/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\ProcurementListContext.tsx
 *
 * Timestamp:
 * 21 May 2026 09:48 Sydney
 *
 * PURPOSE:
 * Procurement List State Management
 *
 * STRATEGY:
 * PASS 16A — Saved Procurement Lists Infrastructure
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

// ============================================================
// TYPES
// ============================================================

export interface ProcurementListItem {

  sku: string

  brand: string

  title: string

  supplier: string

  fitment: number

  expeditionReady: boolean
}

interface ProcurementListContextType {

  items:
    ProcurementListItem[]

  addItem: (
    item: ProcurementListItem
  ) => void

  removeItem: (
    sku: string
  ) => void

  clearList: () => void

  itemCount: number

  isSaved: (
    sku: string
  ) => boolean
}

// ============================================================
// CONTEXT
// ============================================================

const ProcurementListContext =
  createContext<
    ProcurementListContextType
    |
    null
  >(null)

// ============================================================
// PROVIDER
// ============================================================

export function ProcurementListProvider({

  children

}: {

  children:
    React.ReactNode

}){

  const [

    items,

    setItems

  ] = useState<
    ProcurementListItem[]
  >([])

  // ==========================================================
  // LOAD
  // ==========================================================

  useEffect(() => {

    const stored =

      localStorage.getItem(
        "jd-procurement-list"
      )

    if (
      stored
    ) {

      setItems(
        JSON.parse(stored)
      )
    }

  }, [])

  // ==========================================================
  // SAVE
  // ==========================================================

  useEffect(() => {

    localStorage.setItem(

      "jd-procurement-list",

      JSON.stringify(items)
    )

  }, [items])

  // ==========================================================
  // ACTIONS
  // ==========================================================

  function addItem(

    item:
      ProcurementListItem

  ){

    setItems(prev => {

      const exists =

        prev.some(

          existing =>

            existing.sku
            ===
            item.sku
        )

      if (
        exists
      ) {

        return prev
      }

      return [

        ...prev,

        item
      ]
    })
  }

  function removeItem(

    sku: string

  ){

    setItems(prev =>

      prev.filter(

        item =>

          item.sku
          !==
          sku
      )
    )
  }

  function clearList(){

    setItems([])
  }

  function isSaved(

    sku: string

  ){

    return items.some(

      item =>

        item.sku
        ===
        sku
    )
  }

  // ==========================================================
  // VALUE
  // ==========================================================

  const value =
    useMemo(() => ({

      items,

      addItem,

      removeItem,

      clearList,

      itemCount:
        items.length,

      isSaved

    }), [items])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <ProcurementListContext.Provider
      value={value}
    >

      {children}

    </ProcurementListContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useProcurementList(){

  const context =
    useContext(
      ProcurementListContext
    )

  if (
    !context
  ) {

    throw new Error(

      "useProcurementList must be used inside ProcurementListProvider"
    )
  }

  return context
}