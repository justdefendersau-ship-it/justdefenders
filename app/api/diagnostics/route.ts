import { NextResponse } from "next/server"

import {

  diagnoseSymptom

}
from "../../../lib/diagnosticIntelligence"

import {

  interpretDTC

}
from "../../../lib/obdIntelligence"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\diagnostics\route.ts
//
// Timestamp:
// 2026-05-07 14:00
//
// Purpose:
// - Diagnostic intelligence API
// =====================================================

export async function POST(
  req:Request
){

  try {

    const body =
      await req.json()

    const symptom =
      body?.symptom || ""

    const dtc =
      body?.dtc || ""

    // =====================================================
    // SYMPTOMS
    // =====================================================

    const diagnosis =
      diagnoseSymptom(
        symptom
      )

    // =====================================================
    // OBD
    // =====================================================

    const obd =
      dtc
        ? interpretDTC(dtc)
        : null

    return NextResponse.json({

      success:true,

      diagnosis,

      obd
    })

  } catch(err){

    console.error(
      "DIAGNOSTIC ERROR:",
      err
    )

    return NextResponse.json({

      success:false,

      error:"Diagnostic failure"

    }, {
      status:500
    })
  }
}
