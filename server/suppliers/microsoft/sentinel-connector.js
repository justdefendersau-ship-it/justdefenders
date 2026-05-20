/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\suppliers\microsoft\sentinel-connector.js
===================================================== */

console.log("")
console.log("====================================")
console.log("MICROSOFT SENTINEL CONNECTOR")
console.log("SIEM TELEMETRY ACTIVE")
console.log("====================================")
console.log("")

function simulate(){

  console.log({

    supplier:
    "Microsoft Sentinel",

    incidents:
    4,

    analytics:
    84,

    ingestion:
    "ACTIVE",

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  simulate,
  45000
)

simulate()