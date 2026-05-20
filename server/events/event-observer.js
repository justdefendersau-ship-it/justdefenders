/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\events\event-observer.js
===================================================== */

const bus =
require("./central-event-bus")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS EVENT OBSERVER")
console.log("ASYNC EVENT ORCHESTRATION ACTIVE")
console.log("====================================")
console.log("")

setInterval(() => {

  console.log({

    replayableEvents:
    bus.replay().length,

    timestamp:
    new Date().toISOString()
  })

}, 30000)