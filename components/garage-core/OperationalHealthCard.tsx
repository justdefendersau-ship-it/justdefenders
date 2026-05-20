"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage-core\OperationalHealthCard.tsx
//
// Timestamp:
// 2026-05-10 14:00
//
// Purpose:
// - Operational health overview
// - Explainable health status
// =====================================================

export default function OperationalHealthCard(){

  const systems = [

    {
      name:"Engine",
      status:"GREEN",
      colour:"#36b37e",
      reason:"Recent oil service completed"
    },

    {
      name:"Cooling",
      status:"AMBER",
      colour:"#ffab00",
      reason:"Hoses approaching operational age threshold"
    },

    {
      name:"Driveline",
      status:"GREEN",
      colour:"#36b37e",
      reason:"Wheel bearings recently replaced"
    },

    {
      name:"Electrical",
      status:"GREEN",
      colour:"#36b37e",
      reason:"Battery warranty active"
    }
  ]

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Operational Health Status

      </div>

      {systems.map(
        (s,idx)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              paddingBottom:"14px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div
              style={{
                display:"flex",
                alignItems:"center"
              }}
            >

              <div
                style={{
                  width:"14px",
                  height:"14px",
                  borderRadius:"50%",
                  background:s.colour,
                  marginRight:"10px"
                }}
              />

              <strong>

                {s.name}

              </strong>

              <div
                style={{
                  marginLeft:"10px"
                }}
              >

                {s.status}

              </div>

            </div>

            <div
              style={{
                marginTop:"10px",
                color:"#5e6c84",
                lineHeight:"1.5"
              }}
            >

              {s.reason}

            </div>

          </div>
        )
      )}

    </div>
  )
}
