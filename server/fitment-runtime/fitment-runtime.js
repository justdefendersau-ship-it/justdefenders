/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\fitment-runtime\fitment-runtime.js
   Timestamp:
   13 May 2026 23:15 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("FITMENT INTELLIGENCE RUNTIME")
console.log("VIN CORRELATION ACTIVE")
console.log("====================================")
console.log("")

const fitmentPath =
path.join(

  __dirname,
  "../../data/fitment/fitment-validation.json"
)

function fitmentRuntime(){

  try {

    const fitment =
    JSON.parse(

      fs.readFileSync(
        fitmentPath,
        "utf8"
      )
    )

    fitment.forEach(

      item => {

        console.log({

          part:
          item.part,

          confidence:
          item.fitmentConfidence,

          expedition:
          item.expeditionRecommended,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      fitmentFailure:
      error.message
    })
  }
}

setInterval(
  fitmentRuntime,
  45000
)

fitmentRuntime()