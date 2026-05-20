/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai-runtime\ai-runtime.js
   Timestamp:
   14 May 2026 02:45 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("AI OPERATIONAL INTELLIGENCE")
console.log("CONVERSATIONAL OPERATIONS ACTIVE")
console.log("====================================")
console.log("")

const aiPath =
path.join(

  __dirname,
  "../../data/ai/diagnostics/diagnostic-intelligence.json"
)

function aiRuntime(){

  try {

    const intelligence =
    JSON.parse(

      fs.readFileSync(
        aiPath,
        "utf8"
      )
    )

    intelligence.forEach(

      item => {

        console.log({

          symptom:
          item.symptom,

          likelyFault:
          item.likelyFault,

          confidence:
          item.confidence,

          expeditionRisk:
          item.expeditionRisk,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      aiFailure:
      error.message
    })
  }
}

setInterval(
  aiRuntime,
  45000
)

aiRuntime()