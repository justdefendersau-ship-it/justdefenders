/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\external-alpha-runtime\external-alpha-runtime.js
   Timestamp:
   14 May 2026 00:15 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("EXTERNAL ALPHA RUNTIME")
console.log("FIELD TESTING ACTIVE")
console.log("====================================")
console.log("")

const telemetryPath =
path.join(

  __dirname,
  "../../data/external-alpha/telemetry/external-alpha-telemetry.json"
)

function externalAlpha(){

  try {

    const telemetry =
    JSON.parse(

      fs.readFileSync(
        telemetryPath,
        "utf8"
      )
    )

    telemetry.forEach(

      item => {

        console.log({

          scenario:
          item.scenario,

          completion:
          item.completionRate,

          trust:
          item.trustScore,

          usability:
          item.mobileUsability,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      externalAlphaFailure:
      error.message
    })
  }
}

setInterval(
  externalAlpha,
  45000
)

externalAlpha()