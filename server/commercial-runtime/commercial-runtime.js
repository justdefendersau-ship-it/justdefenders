/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\commercial-runtime\commercial-runtime.js
   Timestamp:
   14 May 2026 08:30 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("COMMERCIAL OPERATIONAL ROLLOUT")
console.log("WORKSHOP + EXPEDITION PILOTS ACTIVE")
console.log("====================================")
console.log("")

const analyticsPath =
path.join(

  __dirname,
  "../../data/commercial-rollout/analytics/commercial-analytics.json"
)

function commercialRuntime(){

  try {

    const analytics =
    JSON.parse(

      fs.readFileSync(
        analyticsPath,
        "utf8"
      )
    )

    analytics.forEach(

      item => {

        console.log({

          metric:
          item.metric,

          value:
          item.value,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      commercialFailure:
      error.message
    })
  }
}

setInterval(
  commercialRuntime,
  45000
)

commercialRuntime()