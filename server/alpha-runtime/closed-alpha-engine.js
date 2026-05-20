/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\alpha-runtime\closed-alpha-engine.js
   Timestamp:
   13 May 2026 21:15 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("CLOSED ALPHA EXECUTION")
console.log("OPERATIONAL VALIDATION ACTIVE")
console.log("====================================")
console.log("")

const telemetryPath =
path.join(

  __dirname,
  "../../data/alpha/workflow-telemetry.json"
)

function alpha(){

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

          workflow:
          item.workflow,

          completion:
          item.completionRate,

          friction:
          item.frictionLevel,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      alphaFailure:
      error.message
    })
  }
}

setInterval(
  alpha,
  45000
)

alpha()