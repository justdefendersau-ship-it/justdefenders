/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\suppliers\microsoft\m365-connector.js
===================================================== */

console.log("")
console.log("====================================")
console.log("MICROSOFT 365 CONNECTOR")
console.log("IDENTITY TELEMETRY ACTIVE")
console.log("====================================")
console.log("")

function simulate(){

  console.log({

    supplier:
    "Microsoft 365",

    signIns:
    1884,

    riskyUsers:
    3,

    impossibleTravel:
    1,

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  simulate,
  35000
)

simulate()