/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\messaging\backpressure-monitor.js
===================================================== */

const redis =
require("./redis-stream-client")

console.log("")
console.log("====================================")
console.log("BACKPRESSURE MONITOR")
console.log("STREAM PRESSURE ACTIVE")
console.log("====================================")
console.log("")

async function monitor(){

  try {

    const length =
    await redis.xLen(
      "telemetry-stream"
    )

    console.log({

      streamDepth:
      length,

      pressure:
      length > 1000,

      timestamp:
      new Date().toISOString()
    })

  } catch(error){

    console.log({

      monitorFailure:
      error.message
    })
  }
}

setInterval(
  monitor,
  20000
)

monitor()