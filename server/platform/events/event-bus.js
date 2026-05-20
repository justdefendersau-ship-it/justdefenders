/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\events\event-bus.js
===================================================== */

const EventEmitter =
require("events")

class PlatformEventBus
extends EventEmitter {

  publish(
    event,
    payload
  ){

    this.emit(
      event,
      payload
    )
  }

  subscribe(
    event,
    handler
  ){

    this.on(
      event,
      handler
    )
  }
}

module.exports =
new PlatformEventBus()