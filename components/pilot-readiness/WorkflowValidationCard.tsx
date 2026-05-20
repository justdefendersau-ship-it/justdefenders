"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\pilot-readiness\WorkflowValidationCard.tsx
//
// Timestamp:
// 2026-05-09 13:00
//
// Purpose:
// - Workflow operational validation
// =====================================================

export default function WorkflowValidationCard({

  workflows

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Workflow Validation

      </div>

      {workflows.map(
        (w:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              paddingBottom:"16px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {w.workflow}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              Status:
              {" "}

              <strong>

                {w.status}

              </strong>

            </div>

            <div style={{
              marginTop:"8px",
              color:"#5e6c84"
            }}>

              Priority:
              {" "}
              {w.priority}

            </div>

          </div>
        )
      )}

    </div>
  )
}
