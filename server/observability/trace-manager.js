/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\trace-manager.js
===================================================== */

const crypto =
require("crypto")

function createTrace(){

  return {

    traceId:
    crypto.randomUUID(),

    timestamp:
    new Date().toISOString()
  }
}

module.exports = {

  createTrace
}