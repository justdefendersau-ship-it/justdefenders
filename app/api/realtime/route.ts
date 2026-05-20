import { NextResponse } from "next/server"

import {

  analyseTelemetry

}
from "../../../lib/realTimeVehicleIntelligence"

import {

  addTelemetry,

  getVehicleSession

}
from "../../../lib/vehicleSessionEngine"

import {

  getFieldAdvice

}
from "../../../lib/fieldAssistance"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\realtime\route.ts
//
// Timestamp:
// 2026-05-07 18:00
//
// Purpose:
// - Real-time vehicle intelligence API
// =====================================================

export async function POST(
  req:Request
){

  try {

    const body =
      await req.json()

    const vin =
      body?.vin || ""

    const telemetry =
      body?.telemetry || {}

    // =====================================================
    // STORE
    // =====================================================

    addTelemetry(

      vin,

      telemetry
    )

    // =====================================================
    // ANALYSE
    // =====================================================

    const alerts =

      analyseTelemetry(
        telemetry
      )

    // =====================================================
    // FIELD
    // =====================================================

    const fieldAdvice =

      getFieldAdvice(
        alerts
      )

    // =====================================================
    // SESSION
    // =====================================================

    const session =

      getVehicleSession(vin)

    return NextResponse.json({

      success:true,

      alerts,

      fieldAdvice,

      session
    })

  } catch(err){

    console.error(
      "REALTIME ERROR:",
      err
    )

    return NextResponse.json({

      success:false,

      error:
        "Realtime intelligence failure"

    }, {
      status:500
    })
  }
}
