/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\metrics-engine.js
===================================================== */

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS METRICS ENGINE")
console.log("DISTRIBUTED OBSERVABILITY ACTIVE")
console.log("====================================")
console.log("")

function collect(){

  console.log({

    cpu:
    process.cpuUsage(),

    memory:
    process.memoryUsage(),

    uptime:
    process.uptime(),

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  collect,
  30000
)

collect()