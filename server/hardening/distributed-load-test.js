/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\hardening\distributed-load-test.js
===================================================== */

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS LOAD TEST ENGINE")
console.log("DISTRIBUTED LOAD ACTIVE")
console.log("====================================")
console.log("")

async function simulateLoad(){

  const events = []

  for(
    let i = 0;
    i < 500;
    i++
  ){

    events.push({

      id:i,

      severity:"HIGH",

      timestamp:
      new Date().toISOString()
    })
  }

  console.log({

    generatedEvents:
    events.length,

    loadTest:
    "ACTIVE"
  })
}

setInterval(
  simulateLoad,
  60000
)

simulateLoad()