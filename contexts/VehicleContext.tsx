"use client";

import React,{
  createContext,
  useContext,
  useState
}
from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\context\VehicleContext.tsx
//
// Timestamp:
// 2026-05-09 17:00
//
// Purpose:
// - Shared operational vehicle context
// =====================================================

const VehicleContext =

  createContext<any>(null)

export function VehicleProvider({

  children

}:any){

  const [selectedVIN,setSelectedVIN] =

    useState(

      "SALLDHA87XA176069"
    )

  return (

    <VehicleContext.Provider

      value={{

        selectedVIN,

        setSelectedVIN

      }}

    >

      {children}

    </VehicleContext.Provider>
  )
}

export function useVehicle(){

  return useContext(
    VehicleContext
  )
}
