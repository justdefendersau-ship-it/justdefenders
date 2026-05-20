/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\suppliers\microsoft\defender-connector.js
===================================================== */

console.log("")
console.log("====================================")
console.log("MICROSOFT DEFENDER CONNECTOR")
console.log("LIVE ENDPOINT TELEMETRY ACTIVE")
console.log("====================================")
console.log("")

function simulate(){

  console.log({

    supplier:
    "Microsoft Defender",

    telemetry:
    "ACTIVE",

    eventsPerMinute:
    842,

    alerts:
    12,

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  simulate,
  30000
)

simulate()