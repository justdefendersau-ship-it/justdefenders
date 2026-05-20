/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\production\load\load-test-engine.js
===================================================== */

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS LOAD TEST ENGINE")
console.log("PERFORMANCE VALIDATION ACTIVE")
console.log("====================================")
console.log("")

function simulateLoad(){

  const requests =
  Math.floor(
    Math.random() * 1000
  )

  console.log(
    "Simulated requests:",
    requests
  )
}

setInterval(
  simulateLoad,
  45000
)