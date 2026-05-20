"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage-core\ServiceForecastCard.tsx
//
// Timestamp:
// 2026-05-10 13:15
//
// Purpose:
// - Service forecasting intelligence
// =====================================================

export default function ServiceForecastCard({

  services

}:any){

  function getColour(priority:string){

    if(priority === "HIGH"){
      return "#de350b"
    }

    return "#ffab00"
  }

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Upcoming Operational Services

      </div>

      {services.map(
        (s:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              paddingBottom:"16px",
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
                  background:getColour(s.priority),
                  marginRight:"10px"
                }}
              />

              <strong>

                {s.service}

              </strong>

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              Due:
              {" "}
              {s.due}

            </div>

            <div style={{
              marginTop:"12px",
              fontWeight:"bold"
            }}>

              Includes

            </div>

            {s.includes.map(
              (i:any,iidx:number)=>(

                <div
                  key={iidx}

                  style={{
                    marginTop:"6px"
                  }}
                >

                  ✔ {i}

                </div>
              )
            )}

          </div>
        )
      )}

    </div>
  )
}
