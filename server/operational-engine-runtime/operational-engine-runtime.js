/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\operational-engine-runtime\operational-engine-runtime.js
   Timestamp:
   14 May 2026 06:15 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("UNIFIED OPERATIONAL INTELLIGENCE")
console.log("OPERATIONAL COPILOT ACTIVE")
console.log("====================================")
console.log("")

const reasoningPath =
path.join(

  __dirname,
  "../../data/operational-engine/reasoning/cross-domain-reasoning.json"
)

function engineRuntime(){

  try {

    const reasoning =
    JSON.parse(

      fs.readFileSync(
        reasoningPath,
        "utf8"
      )
    )

    reasoning.forEach(

      item => {

        console.log({

          scenario:
          item.scenario,

          diagnostic:
          item.diagnosticAssessment,

          risk:
          item.expeditionRisk,

          supplierStrategy:
          item.supplierStrategy,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      operationalEngineFailure:
      error.message
    })
  }
}

setInterval(
  engineRuntime,
  45000
)

engineRuntime()