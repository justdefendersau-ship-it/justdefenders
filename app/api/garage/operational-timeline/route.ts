// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\garage\operational-timeline\route.ts
//
// Timestamp:
// 26 May 2026 16:45 Sydney
//
// PURPOSE:
// Operational maintenance timeline normalization API.
//
// FEATURES:
// - CSV ingestion
// - lifecycle normalization
// - operational classification
// - timeline event generation
//
// IMPORTANT:
// - SAFE MODE ONLY
// - NO realtime
// - NO orchestration
// - NO federation runtime
// ====================================================================

import fs from "fs"
import path from "path"

import {
  NextResponse
}
from "next/server"

// ====================================================================
// CSV LOCATION
// ====================================================================

const csvPath = path.join(

  process.cwd(),

  "data",
  "invoices",
  "SALLDHA87XA176069",
  "maintenance-history.csv"
)

// ====================================================================
// CLASSIFICATION
// ====================================================================

function classifyEvent(
  description:string
){

  const text =
    description.toLowerCase()

  // ================================================================
  // REPAIR
  // ================================================================

  if(
    text.includes("repair") ||
    text.includes("replacement") ||
    text.includes("fault") ||
    text.includes("overhaul")
  ){

    return {
      type:"REPAIR",
      severity:"HIGH"
    }
  }

  // ================================================================
  // MODIFICATION
  // ================================================================

  if(
    text.includes("upgrade") ||
    text.includes("modification") ||
    text.includes("touring") ||
    text.includes("fitment")
  ){

    return {
      type:"MODIFICATION",
      severity:"MEDIUM"
    }
  }

  // ================================================================
  // SERVICE
  // ================================================================

  return {
    type:"SERVICE",
    severity:"LOW"
  }
}

// ====================================================================
// TAG EXTRACTION
// ====================================================================

function extractTags(
  description:string
){

  const text =
    description.toLowerCase()

  const tags:string[] = []

  if(text.includes("turbo")){
    tags.push("TURBO")
  }

  if(text.includes("injector")){
    tags.push("FUEL_SYSTEM")
  }

  if(text.includes("clutch")){
    tags.push("DRIVELINE")
  }

  if(text.includes("gearbox")){
    tags.push("TRANSMISSION")
  }

  if(text.includes("cooling")){
    tags.push("COOLING")
  }

  if(text.includes("electrical")){
    tags.push("ELECTRICAL")
  }

  if(text.includes("suspension")){
    tags.push("SUSPENSION")
  }

  if(text.includes("touring")){
    tags.push("EXPEDITION")
  }

  return tags
}

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    // ==============================================================
    // VERIFY FILE EXISTS
    // ==============================================================

    if(
      !fs.existsSync(csvPath)
    ){

      return NextResponse.json({

        success:false,

        error:
          "Maintenance history CSV not found"

      },{
        status:404
      })
    }

    // ==============================================================
    // LOAD CSV
    // ==============================================================

    const raw =
      fs.readFileSync(
        csvPath,
        "utf8"
      )

    const lines =
      raw
        .split("\n")
        .filter(Boolean)

    // ==============================================================
    // REMOVE HEADER
    // ==============================================================

    const dataLines =
      lines.slice(1)

    // ==============================================================
    // NORMALIZE EVENTS
    // ==============================================================

    const events =
      dataLines.map(
        (
          line,
          index
        ) => {

          const columns =
            line.split(",")

          const date =
            columns[0]?.trim() || ""

          const supplier =
            columns[1]?.trim() || ""

          const description =
            columns[2]?.trim() || ""

          const odometer =
            Number(
              columns[3] || 0
            )

          const cost =
            Number(
              columns[4] || 0
            )

          const classification =
            classifyEvent(
              description
            )

          return {

            id:
              index + 1,

            type:
              classification.type,

            severity:
              classification.severity,

            date,

            supplier,

            description,

            odometer,

            cost,

            tags:
              extractTags(
                description
              )
          }
        }
      )

    // ==============================================================
    // RESPONSE
    // ==============================================================

    return NextResponse.json({

      success:true,

      vehicle:
        "SALLDHA87XA176069",

      totalEvents:
        events.length,

      events
    })

  } catch(error:any){

    console.error(
      "Operational timeline failure",
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