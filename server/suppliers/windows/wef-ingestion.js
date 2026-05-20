/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\suppliers\windows\wef-ingestion.js
===================================================== */

console.log("")
console.log("====================================")
console.log("WINDOWS EVENT FORWARDING")
console.log("LIVE WINDOWS EVENTS ACTIVE")
console.log("====================================")
console.log("")

function simulate(){

  console.log({

    source:
    "WEF",

    securityEvents:
    441,

    failedLogons:
    7,

    privilegedEvents:
    3,

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  simulate,
  30000
)

simulate()