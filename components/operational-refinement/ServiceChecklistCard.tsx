"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-refinement\ServiceChecklistCard.tsx
//
// Timestamp:
// 2026-05-10 09:55
//
// Purpose:
// - Service workflow intelligence
// =====================================================

export default function ServiceChecklistCard({

  tasks

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Service Workflow Checklist

      </div>

      {tasks.map(
        (t:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              paddingBottom:"14px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div
              style={{
                fontWeight:"bold"
              }}
            >

              {t.task}

            </div>

            {
              t.part && (

                <div
                  style={{
                    marginTop:"8px"
                  }}
                >

                  Part:
                  {" "}
                  {t.part}

                </div>
              )
            }

            {
              t.workshopReference && (

                <div
                  style={{
                    marginTop:"8px"
                  }}
                >

                  Reference:
                  {" "}
                  {t.workshopReference}

                </div>
              )
            }

            <button
              style={{
                marginTop:"12px",
                padding:"10px 14px",
                borderRadius:"8px",
                border:"none",
                cursor:"pointer",
                background:"#36b37e",
                color:"white"
              }}
            >

              View Supplier Options

            </button>

          </div>
        )
      )}

    </div>
  )
}
