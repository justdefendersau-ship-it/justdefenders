/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\trace-observer.js
===================================================== */

require("./trace-provider")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS TRACE OBSERVER")
console.log("DISTRIBUTED TRACING ACTIVE")
console.log("====================================")
console.log("")

setInterval(() => {

  console.log({

    tracing:
    "ACTIVE",

    correlation:
    true,

    distributed:
    true,

    timestamp:
    new Date().toISOString()
  })

}, 45000)