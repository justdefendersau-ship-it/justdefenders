/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\app\api\auth\validate\route.ts

   Timestamp:
   11 May 2026 20:15 (Sydney)

   PURPOSE:
   Enterprise identity validation API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  validateEnterpriseAccess
}
from "@/backend/middleware/enterpriseAuthMiddleware"

export async function GET(

  request:Request

){

  try{

    const user =
    validateEnterpriseAccess(
      request
    )

    return NextResponse.json({

      authenticated:true,

      user
    })

  }catch(

    error

  ){

    return NextResponse.json({

      authenticated:false

    },{
      status:401
    })
  }
}
