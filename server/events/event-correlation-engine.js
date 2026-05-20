/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\events\event-correlation-engine.js
===================================================== */

const correlations = []

function correlate(
  event
){

  correlations.push({

    correlationId:
    Math.random()
    .toString(36),

    event,

    timestamp:
    new Date().toISOString()
  })
}

function getCorrelations(){

  return correlations
}

module.exports = {

  correlate,
  getCorrelations
}