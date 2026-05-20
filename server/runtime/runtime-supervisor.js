/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\runtime\runtime-supervisor.js
===================================================== */

const heartbeat =
require("./heartbeat-registry")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS RUNTIME SUPERVISOR")
console.log("CONSOLIDATED RUNTIME ACTIVE")
console.log("====================================")
console.log("")

const services = [

  "SOC",

  "AI_RUNTIME",

  "UEBA",

  "TIP",

  "WATCHDOG"
]

function supervise(){

  services.forEach(service => {

    heartbeat.beat(service)
  })

  console.log({

    timestamp:
    new Date().toISOString(),

    services:
    heartbeat.getStatus()
  })
}

setInterval(
  supervise,
  30000
)

supervise()