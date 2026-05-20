/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\production\chaos\chaos-engine.js
===================================================== */

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS CHAOS ENGINE")
console.log("RESILIENCE TESTING ACTIVE")
console.log("====================================")
console.log("")

function injectFailure(){

  const scenarios = [

    "QUEUE_DELAY",
    "SERVICE_TIMEOUT",
    "MEMORY_PRESSURE",
    "API_LATENCY"
  ]

  const selected =
  scenarios[
    Math.floor(
      Math.random() *
      scenarios.length
    )
  ]

  console.log(
    "Chaos scenario:",
    selected
  )
}

setInterval(
  injectFailure,
  60000
)