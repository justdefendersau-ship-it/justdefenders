/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\redis\runtime-coordination.js
===================================================== */

const cache =
require("./distributed-cache")

async function heartbeat(
  service
){

  await cache.setCache(

    "heartbeat-" + service,

    {

      status:
      "ONLINE",

      timestamp:
      new Date().toISOString()
    }
  )
}

module.exports = {

  heartbeat
}