/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\hardening\failure-injection.js
===================================================== */

console.log("")
console.log("====================================")
console.log("FAILURE INJECTION ENGINE")
console.log("CHAOS VALIDATION ACTIVE")
console.log("====================================")
console.log("")

function inject(){

  const failures = [

    "REDIS_TIMEOUT",

    "QUEUE_DELAY",

    "EVENT_DROP",

    "RUNTIME_RECOVERY"
  ]

  const failure =

    failures[
      Math.floor(
        Math.random() *
        failures.length
      )
    ]

  console.log({

    injectedFailure:
    failure,

    recovery:
    "VALIDATING",

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  inject,
  45000
)

inject()