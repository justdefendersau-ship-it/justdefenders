/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\correlation-engine.js
===================================================== */

function generateCorrelationId(){

  return (

    "corr-" +

    Math.random()
    .toString(36)
    .substring(2)
  )
}

function enrichContext(
  payload
){

  return {

    ...payload,

    correlationId:
    generateCorrelationId(),

    timestamp:
    new Date().toISOString()
  }
}

module.exports = {

  enrichContext
}