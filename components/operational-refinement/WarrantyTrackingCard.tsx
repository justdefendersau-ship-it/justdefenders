"use client";

import React,{
  useState
}
from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-refinement\WarrantyTrackingCard.tsx
//
// Timestamp:
// 2026-05-10 09:55
//
// Purpose:
// - Warranty expiry intelligence
// =====================================================

export default function WarrantyTrackingCard({

  batteries

}:any){

  const [selected,setSelected] =

    useState(0)

  const active =
    batteries[selected]

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Warranty Intelligence

      </div>

      <select
        value={selected}

        onChange={(e)=>
          setSelected(
            Number(e.target.value)
          )
        }

        style={{
          marginTop:"18px",
          padding:"10px",
          borderRadius:"8px"
        }}
      >

        {batteries.map(
          (b:any,idx:number)=>(

            <option
              key={idx}
              value={idx}
            >

              {b.battery}

            </option>
          )
        )}

      </select>

      <div style={{
        marginTop:"18px"
      }}>

        <strong>Model:</strong>
        {" "}
        {active.model}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        <strong>Supplier:</strong>
        {" "}
        {active.supplier}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        <strong>Warranty Expiry:</strong>
        {" "}
        {active.warrantyExpiry}

      </div>

      <button
        style={{
          marginTop:"16px",
          padding:"10px 14px",
          borderRadius:"8px",
          border:"none",
          cursor:"pointer",
          background:"#0052cc",
          color:"white"
        }}
      >

        View Underlying Details

      </button>

    </div>
  )
}
