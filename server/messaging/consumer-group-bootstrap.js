/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\messaging\consumer-group-bootstrap.js
===================================================== */

const redis =
require("./redis-stream-client")

async function bootstrap(){

  try {

    await redis.xGroupCreate(

      "telemetry-stream",

      "soc-consumers",

      "0",

      {

        MKSTREAM:true
      }
    )

    console.log({

      consumerGroup:
      "CREATED"
    })

  } catch(error){

    console.log({

      consumerGroup:
      "EXISTS"
    })
  }
}

bootstrap()