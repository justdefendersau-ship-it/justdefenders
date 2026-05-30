// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\logs\route.ts
//
// Timestamp:
// 27 May 2026 21:25 Sydney
//
// PURPOSE:
// Structured runtime logging API.
// ====================================================================

import fs
from "fs"

import path
from "path"

import {
  NextResponse
}
from "next/server"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const logPath =

      path.join(

        process.cwd(),

        "logs",

        "operational-runtime.log"
      )

    if(
      !fs.existsSync(logPath)
    ){

      return NextResponse.json({

        success:true,

        logs:[]
      })
    }

    const raw =
      fs.readFileSync(

        logPath,

        "utf-8"
      )

    const logs =

      raw
        .split("\n")
        .filter(Boolean)
        .map(
          line =>
            JSON.parse(line)
        )

    return NextResponse.json({

      success:true,

      total:
        logs.length,

      logs
    })

  } catch(error:any){

    console.error(
      "LOG API FAILURE:",
      error
    )

    return NextResponse.json({

      success:false,

      error:
        error.message

    },{
      status:500
    })
  }
}