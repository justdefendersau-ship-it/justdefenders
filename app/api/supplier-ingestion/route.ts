import { NextResponse }
from "next/server"

import {

  normaliseInventory

}
from "../../../lib/inventoryIngestion"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\supplier-ingestion\route.ts
//
// Timestamp:
// 2026-05-08 07:00
//
// Purpose:
// - Supplier inventory ingestion API
// =====================================================

export async function POST(
  req:Request
){

  try {

    const body =
      await req.json()

    const inventory =

      normaliseInventory(body)

    return NextResponse.json({

      success:true,

      inventory
    })

  } catch(err){

    console.error(
      "SUPPLIER INGESTION ERROR:",
      err
    )

    return NextResponse.json({

      success:false

    }, {
      status:500
    })
  }
}
