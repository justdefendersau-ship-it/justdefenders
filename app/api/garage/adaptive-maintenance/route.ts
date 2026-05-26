// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\garage\adaptive-maintenance\route.ts
//
// Timestamp:
// 26 May 2026 18:45 Sydney
//
// PURPOSE:
// Adaptive maintenance intelligence API.
//
// FEATURES:
// - interval intelligence
// - overdue detection
// - operational maintenance scoring
// - expedition survivability analysis
//
// IMPORTANT:
// - SAFE MODE ONLY
// - NO realtime runtime
// ====================================================================

import fs from "fs"
import path from "path"

import {
  NextResponse
}
from "next/server"

// ====================================================================
// CSV PATH
// ====================================================================

const csvPath = path.join(

  process.cwd(),

  "data",
  "invoices",
  "SALLDHA87XA176069",
  "maintenance-history.csv"
)

// ====================================================================
// SERVICE INTERVALS
// ====================================================================

const serviceIntervals = [

  {
    category:
      "Engine Oil",

    intervalKm:
      10000,

    keywords:[
      "oil",
      "filter"
    ]
  },

  {
    category:
      "Cooling System",

    intervalKm:
      20000,

    keywords:[
      "cooling",
      "radiator",
      "hose"
    ]
  },

  {
    category:
      "Turbocharger",

    intervalKm:
      15000,

    keywords:[
      "turbo",
      "overboost"
    ]
  },

  {
    category:
      "Driveline",

    intervalKm:
      25000,

    keywords:[
      "clutch",
      "gearbox",
      "driveline"
    ]
  }
]

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    // ==============================================================
    // VERIFY CSV
    // ==============================================================

    if(
      !fs.existsSync(csvPath)
    ){

      return NextResponse.json({

        success:false,

        error:
          "Maintenance CSV not found"

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

    const dataLines =
      lines.slice(1)

    // ==============================================================
    // PARSE EVENTS
    // ==============================================================

    const parsedEvents =
      dataLines.map(line => {

        const columns =
          line.split(",")

        return {

          date:
            columns[0]?.trim() || "",

          supplier:
            columns[1]?.trim() || "",

          description:
            columns[2]?.trim() || "",

          odometer:
            Number(
              columns[5] || 0
            )
        }
      })

    // ==============================================================
    // CURRENT ODOMETER
    // ==============================================================

    const odometerValues =
      parsedEvents
        .map(
          e => e.odometer
        )
        .filter(
          o => o > 0
        )

    const currentOdometer =
      Math.max(
        ...odometerValues
      )

    // ==============================================================
    // ANALYSIS
    // ==============================================================

    const analysis =
      serviceIntervals.map(item => {

        // ==========================================================
        // FIND LAST EVENT
        // ==========================================================

        const matches =
          parsedEvents.filter(
            event => {

              const text =
                event.description.toLowerCase()

              return item.keywords.some(
                keyword =>
                  text.includes(keyword)
              )
            }
          )

        const latest =
          matches
            .sort(
              (
                a,
                b
              ) =>
                b.odometer -
                a.odometer
            )[0]

        const lastKm =
          latest?.odometer || 0

        const distanceSince =
          currentOdometer -
          lastKm

        const remaining =
          item.intervalKm -
          distanceSince

        // ==========================================================
        // STATUS
        // ==========================================================

        let status =
          "CURRENT"

        if(
          remaining <= 0
        ){

          status =
            "OVERDUE"

        } else if(
          remaining < 3000
        ){

          status =
            "ATTENTION"
        }

        return {

          category:
            item.category,

          intervalKm:
            item.intervalKm,

          lastServiceKm:
            lastKm,

          currentOdometer,

          distanceSince,

          remaining,

          status,

          supplier:
            latest?.supplier || "Unknown",

          lastServiceDate:
            latest?.date || "Unknown"
        }
      })

    // ==============================================================
    // RESPONSE
    // ==============================================================

    return NextResponse.json({

      success:true,

      vehicle:
        "SALLDHA87XA176069",

      currentOdometer,

      analysis
    })

  } catch(error:any){

    console.error(
      "Adaptive maintenance failure",
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