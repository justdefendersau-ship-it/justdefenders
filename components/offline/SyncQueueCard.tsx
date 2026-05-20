"use client";

import React from "react"

import {

  getQueuedActions

}
from "../../lib/offline/syncEngine"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\offline\SyncQueueCard.tsx
//
// Timestamp:
// 2026-05-09 18:00
//
// Purpose:
// - Deferred sync visibility
// =====================================================

export default function SyncQueueCard(){

  const queue =
    getQueuedActions()

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Deferred Sync Queue

      </div>

      {
        queue.length === 0
        ? (
          <div
            style={{
              marginTop:"18px"
            }}
          >

            No queued offline actions.

          </div>
        )
        : (

          queue.map(
            (q:any,idx:number)=>(

              <div
                key={idx}

                style={{
                  marginTop:"14px"
                }}
              >

                {q.type}

              </div>
            )
          )
        )
      }

    </div>
  )
}
