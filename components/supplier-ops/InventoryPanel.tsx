"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\supplier-ops\InventoryPanel.tsx
//
// Timestamp:
// 2026-05-08 07:00
//
// Purpose:
// - Supplier inventory visibility
// =====================================================

export default function InventoryPanel({

  inventory

}:any){

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"12px",
      padding:"24px",
      background:"#fff"
    }}>

      <div style={{
        fontSize:"24px",
        fontWeight:"bold"
      }}>

        Inventory Feed

      </div>

      {inventory.map(
        (i:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              border:"1px solid #eee",
              borderRadius:"10px",
              padding:"16px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {i.partNumber}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              Qty:
              {" "}
              {i.quantity}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              Price:
              {" "}
              ${i.price}

            </div>

          </div>
        )
      )}

    </div>
  )
}
