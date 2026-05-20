import { NextResponse }
from "next/server"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\supplier-partners\route.ts
//
// Timestamp:
// 2026-05-08 09:00
//
// Purpose:
// - Supplier onboarding API
// =====================================================

export async function POST(
  req:Request
){

  try {

    const body =
      await req.json()

    return NextResponse.json({

      success:true,

      message:
        "Supplier application received.",

      supplier:body
    })

  } catch(err){

    console.error(
      "SUPPLIER PARTNER ERROR:",
      err
    )

    return NextResponse.json({

      success:false

    }, {
      status:500
    })
  }
}
