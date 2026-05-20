/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\messaging\stream-replay-engine.js
===================================================== */

const redis =
require("./redis-stream-client")

console.log("")
console.log("====================================")
console.log("STREAM REPLAY ENGINE")
console.log("REPLAY VALIDATION ACTIVE")
console.log("====================================")
console.log("")

async function replay(){

  try {

    const history =
    await redis.xRange(

      "telemetry-stream",

      "-",

      "+",

      {

        COUNT:5
      }
    )

    console.log({

      replayEvents:
      history.length,

      replay:
      true
    })

  } catch(error){

    console.log({

      replayFailure:
      error.message
    })
  }
}

setInterval(
  replay,
  30000
)

replay()