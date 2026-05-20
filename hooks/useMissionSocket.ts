/* =====================================================
   JustDefenders ©
   File:
   /hooks/useMissionSocket.ts

   Timestamp:
   14 May 2026 04:15 (Sydney)

   PURPOSE:
   Live WebSocket mission streaming
===================================================== */

"use client"

import {
  useEffect
}
from "react"

import io
from "socket.io-client"

import {
  useMissionState
}
from "@/lib/state/useMissionState"

export function useMissionSocket(){

  const updateMission =
  useMissionState(
    state=>state.updateMission
  )

  useEffect(()=>{

    const socket =
    io(
      "http://localhost:8081"
    )

    socket.on(
      "mission-update",
      data=>{

        updateMission(data)
      }
    )

    return ()=>{

      socket.disconnect()
    }

  },[])
}
