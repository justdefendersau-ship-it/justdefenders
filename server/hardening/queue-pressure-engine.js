/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\hardening\queue-pressure-engine.js
===================================================== */

console.log("")
console.log("====================================")
console.log("QUEUE PRESSURE ENGINE")
console.log("BACKPRESSURE SIMULATION ACTIVE")
console.log("====================================")
console.log("")

let queueDepth = 0

function simulatePressure(){

  queueDepth += 250

  console.log({

    queueDepth,

    pressure:
    queueDepth > 1000,

    timestamp:
    new Date().toISOString()
  })

  if(queueDepth > 5000){

    queueDepth = 0
  }
}

setInterval(
  simulatePressure,
  30000
)

simulatePressure()