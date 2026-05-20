/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\redis\redis-health.js
===================================================== */

const redis =
require("./redis-client")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS REDIS HEALTH")
console.log("DISTRIBUTED CACHE ACTIVE")
console.log("====================================")
console.log("")

async function health(){

  try {

    await redis.ping()

    console.log({

      redis:
      "ONLINE",

      distributedRuntime:
      true,

      timestamp:
      new Date().toISOString()
    })

  } catch(error){

    console.log({

      redis:
      "OFFLINE"
    })
  }
}

setInterval(
  health,
  30000
)

health()