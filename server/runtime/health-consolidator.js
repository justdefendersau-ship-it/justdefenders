/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\runtime\health-consolidator.js
===================================================== */

const heartbeat =
require("./heartbeat-registry")

function getHealth(){

  return {

    platform:
    "ONLINE",

    consolidated:
    true,

    services:
    heartbeat.getStatus(),

    timestamp:
    new Date().toISOString()
  }
}

module.exports = {

  getHealth
}