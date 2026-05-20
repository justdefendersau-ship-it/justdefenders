/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\voice-operations\voice-operations-engine.js
   Timestamp:
   13 May 2026 18:15 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("VOICE OPERATIONS")
console.log("HANDS-FREE WORKFLOWS ACTIVE")
console.log("====================================")
console.log("")

const voicePath =
path.join(

  __dirname,
  "../../data/voice/voice-command-index.json"
)

function voice(){

  try {

    const commands =
    JSON.parse(

      fs.readFileSync(
        voicePath,
        "utf8"
      )
    )

    commands.forEach(

      item => {

        console.log({

          command:
          item.command,

          intent:
          item.intent,

          confidence:
          item.confidence,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      voiceFailure:
      error.message
    })
  }
}

setInterval(
  voice,
  45000
)

voice()