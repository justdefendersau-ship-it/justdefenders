/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\diagnostics\diagnostic-intelligence-engine.js
   Timestamp:
   13 May 2026 15:45 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("DIAGNOSTIC INTELLIGENCE")
console.log("OBD CORRELATION ACTIVE")
console.log("====================================")
console.log("")

const faultPath =
path.join(

  __dirname,
  "../../data/diagnostics/fault-database.json"
)

function diagnostics(){

  try {

    const faults =
    JSON.parse(

      fs.readFileSync(
        faultPath,
        "utf8"
      )
    )

    faults.forEach(

      item => {

        console.log({

          fault:
          item.faultCode,

          severity:
          item.severity,

          expedition:
          item.expeditionSeverity,

          repairable:
          item.fieldRepairable,

          confidence:
          item.repairConfidence,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      diagnosticsFailure:
      error.message
    })
  }
}

setInterval(
  diagnostics,
  45000
)

diagnostics()