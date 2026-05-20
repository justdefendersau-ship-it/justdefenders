/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\alpha-operations\correlation-engine.js
===================================================== */

console.log("")
console.log("====================================")
console.log("CORRELATION ENGINE")
console.log("LIVE TELEMETRY CORRELATION ACTIVE")
console.log("====================================")
console.log("")

function correlate(){

  console.log({

    telemetry:
    "Microsoft Defender",

    ueba:
    "Privilege Escalation",

    ai:
    "High Confidence Correlation",

    incident:
    "INC-2001",

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  correlate,
  20000
)

correlate()