/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\mobile-push-engine.js
===================================================== */

console.log("")
console.log("====================================")
console.log("MOBILE PUSH ENGINE")
console.log("ESCALATION NOTIFICATIONS ACTIVE")
console.log("====================================")
console.log("")

function simulate(){

  console.log({

    pushNotification:
    true,

    severity:
    "CRITICAL",

    title:
    "Privilege Escalation Alert",

    mobileDelivery:
    "SUCCESS",

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  simulate,
  45000
)

simulate()