/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\messaging\stream-consumer.js
===================================================== */

const redis =
require("./redis-stream-client")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS STREAM CONSUMER")
console.log("CONSUMER GROUP ACTIVE")
console.log("====================================")
console.log("")

async function consume(){

  try {

    const events =
    await redis.xReadGroup(

      "soc-consumers",

      "consumer-1",

      [

        {

          key:
          "telemetry-stream",

          id:
          ">"
        }
      ],

      {

        COUNT:10,

        BLOCK:5000
      }
    )

    if(events){

      console.log({

        consumed:
        true,

        events:
        events.length,

        timestamp:
        new Date().toISOString()
      })
    }

  } catch(error){

    console.log({

      consumerFailure:
      error.message
    })
  }
}

setInterval(
  consume,
  10000
)

consume()