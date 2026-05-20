/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\observability-logger.js
===================================================== */

const trace =
require("./trace-manager")

function logEvent(
  level,
  event,
  metadata
){

  const t =
  trace.createTrace()

  console.log(JSON.stringify({

    traceId:
    t.traceId,

    timestamp:
    t.timestamp,

    level,

    event,

    metadata
  }))
}

module.exports = {

  info:(e,m) =>
  logEvent("INFO",e,m),

  warn:(e,m) =>
  logEvent("WARN",e,m),

  error:(e,m) =>
  logEvent("ERROR",e,m)
}