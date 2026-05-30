// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\structuredOperationalLogger.ts
//
// Timestamp:
// 27 May 2026 21:15 Sydney
//
// PURPOSE:
// Structured operational runtime logging.
// ====================================================================

import fs
from "fs"

import path
from "path"

// ====================================================================
// LOG PATH
// ====================================================================

const LOG_PATH =

  path.join(

    process.cwd(),

    "logs",

    "operational-runtime.log"
  )

// ====================================================================
// ENSURE
// ====================================================================

function ensureLogPath(){

  const dir =
    path.dirname(
      LOG_PATH
    )

  if(
    !fs.existsSync(dir)
  ){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    )
  }

  if(
    !fs.existsSync(LOG_PATH)
  ){

    fs.writeFileSync(
      LOG_PATH,
      ""
    )
  }
}

// ====================================================================
// LOG
// ====================================================================

export function logOperationalEvent(

  category:string,

  message:string,

  metadata:any = {}

){

  try {

    ensureLogPath()

    const entry = {

      timestamp:
        new Date().toISOString(),

      category,

      message,

      metadata
    }

    fs.appendFileSync(

      LOG_PATH,

      JSON.stringify(
        entry
      ) + "\n"
    )

    console.log(

      `[${category}]`,

      message
    )

  } catch(error){

    console.error(

      "LOGGING FAILURE:",

      error
    )
  }
}