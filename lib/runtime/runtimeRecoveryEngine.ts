// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\runtimeRecoveryEngine.ts
//
// Timestamp:
// 28 May 2026 01:30 Sydney
//
// PURPOSE:
// Runtime recovery and resilience engine.
// ====================================================================

import fs from "fs"

// ====================================================================
// SAFE JSON LOAD
// ====================================================================

export function safeJsonLoad<T>(

  filePath:string,

  fallback:T

):T {

  try {

    // ==============================================================
    // FILE MISSING
    // ==============================================================

    if(
      !fs.existsSync(filePath)
    ){

      console.warn(

        "RECOVERY: Missing file",

        filePath
      )

      return fallback
    }

    // ==============================================================
    // READ
    // ==============================================================

    const raw =
      fs.readFileSync(

        filePath,

        "utf-8"
      )

    // ==============================================================
    // EMPTY
    // ==============================================================

    if(
      !raw.trim()
    ){

      console.warn(

        "RECOVERY: Empty file",

        filePath
      )

      return fallback
    }

    // ==============================================================
    // PARSE
    // ==============================================================

    return JSON.parse(raw)

  } catch(error){

    console.error(

      "RECOVERY FAILURE:",

      filePath,

      error
    )

    return fallback
  }
}

// ====================================================================
// SAFE JSON SAVE
// ====================================================================

export function safeJsonSave(

  filePath:string,

  payload:any

){

  try {

    fs.writeFileSync(

      filePath,

      JSON.stringify(

        payload,

        null,
        2
      )
    )

  } catch(error){

    console.error(

      "SAVE FAILURE:",

      filePath,

      error
    )
  }
}