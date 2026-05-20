/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\events\event-replay-engine.js
===================================================== */

const persistence =
require("./event-persistence")

function replay(){

  return persistence
  .getPersisted()
}

module.exports = {

  replay
}