/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\event-trace-bridge.js
===================================================== */

const correlation =
require("./correlation-engine")

function traceEvent(
  event
){

  const enriched =
  correlation.enrichContext(event)

  console.log({

    tracedEvent:
    enriched
  })

  return enriched
}

module.exports = {

  traceEvent
}