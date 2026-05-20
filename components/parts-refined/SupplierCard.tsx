"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\parts-refined\SupplierCard.tsx
//
// Timestamp:
// 2026-05-08 11:30
//
// Purpose:
// - Refined supplier presentation
// =====================================================

export default function SupplierCard({

  supplier

}:any){

  return (

    <div className="jd-card">

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>

        <div className="jd-subtitle">

          {supplier.name}

        </div>

        <div style={{
          background:
            supplier.emergency
            ? "#de350b"
            : "#36b37e",

          color:"#fff",

          padding:"6px 10px",

          borderRadius:"8px",

          fontSize:"12px",

          fontWeight:"bold"
        }}>

          {
            supplier.emergency
            ? "EMERGENCY"
            : "AVAILABLE"
          }

        </div>

      </div>

      <div style={{
        marginTop:"18px"
      }}>

        <strong>Part:</strong>
        {" "}
        {supplier.partNumber}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        <strong>Type:</strong>
        {" "}
        {supplier.type}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        <strong>Price:</strong>
        {" "}
        ${supplier.price}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        <strong>Location:</strong>
        {" "}
        {supplier.location}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        <strong>Distance:</strong>
        {" "}
        {supplier.distance}

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <button className="jd-button">

          View Supplier

        </button>

      </div>

    </div>
  )
}
