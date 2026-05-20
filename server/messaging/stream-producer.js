/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\messaging\stream-producer.js
===================================================== */

const redis =
require("./redis-stream-client")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS STREAM PRODUCER")
console.log("DURABLE STREAMING ACTIVE")
console.log("====================================")
console.log("")

async function publish(){

  try {

    const result =
    await redis.xAdd(

      "telemetry-stream",

      "*",

      {

        source:
        "windows-security",

        severity:
        "HIGH",

        eventType:
        "AUTH_FAILURE",

        timestamp:
        new Date().toISOString()
      }
    )

    console.log({

      streamPublished:
      result
    })

  } catch(error){

    console.log({

      streamFailure:
      error.message
    })
  }
}

setInterval(
  publish,
  15000
)

publish()