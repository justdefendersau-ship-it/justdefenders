/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\suppliers\windows\sysmon-ingestion.js
===================================================== */

console.log("")
console.log("====================================")
console.log("SYSMON INGESTION")
console.log("WINDOWS TELEMETRY ACTIVE")
console.log("====================================")
console.log("")

function simulate(){

  console.log({

    source:
    "Sysmon",

    processCreations:
    582,

    networkConnections:
    214,

    suspiciousProcesses:
    2,

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  simulate,
  25000
)

simulate()