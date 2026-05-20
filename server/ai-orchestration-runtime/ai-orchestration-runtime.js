/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai-orchestration-runtime\ai-orchestration-runtime.js
   Timestamp:
   14 May 2026 04:15 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("CONVERSATIONAL AI ORCHESTRATION")
console.log("PERSISTENT CONTEXT ACTIVE")
console.log("====================================")
console.log("")

const contextPath =
path.join(

  __dirname,
  "../../data/ai-orchestration/context/operational-context.json"
)

function orchestrationRuntime(){

  try {

    const context =
    JSON.parse(

      fs.readFileSync(
        contextPath,
        "utf8"
      )
    )

    context.forEach(

      item => {

        console.log({

          session:
          item.sessionId,

          vehicle:
          item.vehicle,

          workflow:
          item.conversationState,

          expedition:
          item.expeditionState,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      orchestrationFailure:
      error.message
    })
  }
}

setInterval(
  orchestrationRuntime,
  45000
)

orchestrationRuntime()