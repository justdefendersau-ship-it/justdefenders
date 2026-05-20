"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-refinement\OperationalHealthCard.tsx
//
// Timestamp:
// 2026-05-10 09:55
//
// Purpose:
// - Traffic-light operational status
// =====================================================

export default function OperationalHealthCard({

  status

}:any){

  function getColour(state:string){

    if(state === "GREEN"){
      return "#36b37e"
    }

    if(state === "AMBER"){
      return "#ffab00"
    }

    return "#de350b"
  }

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Operational Health Status

      </div>

      {Object.entries(status).map(
        ([key,value]:any,idx:number)=>(

          <div
            key={idx}

            style={{
              display:"flex",
              alignItems:"center",
              marginTop:"16px"
            }}
          >

            <div
              style={{
                width:"16px",
                height:"16px",
                borderRadius:"50%",
                background:getColour(value),
                marginRight:"12px"
              }}
            />

            <strong
              style={{
                textTransform:"capitalize"
              }}
            >

              {key}

            </strong>

            <div
              style={{
                marginLeft:"10px"
              }}
            >

              {value}

            </div>

          </div>
        )
      )}

    </div>
  )
}
