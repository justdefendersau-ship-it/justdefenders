/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\maintenanceIngestion.ts

   Timestamp:
   2026-05-09 09:05

   Purpose:
   - Maintenance ingestion
   - Ownership intelligence integration
===================================================== */

import fs from "fs"

import path from "path"

// =====================================================
// LOAD CSV
// =====================================================

export async function loadMaintenanceHistory(

  vin:string

){

  try {

    const filePath = path.join(

      process.cwd(),

      "data",

      "invoices",

      vin,

      "maintenance-history.csv"
    )

    const raw = fs.readFileSync(
      filePath,
      "utf8"
    )

    const rows = raw
      .split("\n")
      .slice(1)

    return rows
      .filter(Boolean)
      .map((line)=>{

        const parts =
          line.split(",")

        return {

          date:
            parts[0] || "",

          supplier:
            parts[1] || "",

          description:
            parts[2] || "",

          partsUsed:
            parts[3] || "",

          labour:
            parts[4] || "",

          odometer:
            parts[5] || "",

          notes:
            parts[6] || ""
        }
      })

  } catch(err){

    console.error(
      "MAINTENANCE INGESTION ERROR:",
      err
    )

    return []
  }
}

// =====================================================
// LOAD VEHICLES
// =====================================================

export async function loadVehicles(){

  try {

    const filePath = path.join(

      process.cwd(),

      "data",

      "vehicles",

      "vehicles.csv"
    )

    const raw = fs.readFileSync(
      filePath,
      "utf8"
    )

    const rows = raw
      .split("\n")
      .slice(1)

    return rows
      .filter(Boolean)
      .map((line)=>{

        const parts =
          line.split(",")

        return {

          vin:
            parts[0] || "",

          model:
            parts[1] || "",

          engine:
            parts[2] || "",

          year:
            parts[3] || "",

          odometer:
            parts[4] || "",

          modifications:
            parts[5] || "",

          notes:
            parts[6] || ""
        }
      })

  } catch(err){

    console.error(
      "VEHICLE INGESTION ERROR:",
      err
    )

    return []
  }
}
