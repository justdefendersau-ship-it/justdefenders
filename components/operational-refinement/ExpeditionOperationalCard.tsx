"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-refinement\ExpeditionOperationalCard.tsx
//
// Timestamp:
// 2026-05-10 09:55
//
// Purpose:
// - Expedition operational intelligence
// =====================================================

export default function ExpeditionOperationalCard({

  expeditions

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Expedition Operational Intelligence

      </div>

      {expeditions.map(
        (e:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"24px",
              paddingBottom:"18px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div
              style={{
                fontWeight:"bold",
                fontSize:"20px"
              }}
            >

              {e.expedition}

            </div>

            <div
              style={{
                marginTop:"10px"
              }}
            >

              {e.profile}

            </div>

            <div
              style={{
                marginTop:"12px",
                fontWeight:"bold"
              }}
            >

              Recommended Operational Preparation

            </div>

            {e.recommendations.map(
              (r:any,ridx:number)=>(

                <div
                  key={ridx}

                  style={{
                    marginTop:"8px"
                  }}
                >

                  ✔ {r}

                </div>
              )
            )}

          </div>
        )
      )}

    </div>
  )
}
