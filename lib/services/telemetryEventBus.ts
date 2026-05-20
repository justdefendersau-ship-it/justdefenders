/* =====================================================
   JustDefenders ©
   File:
   /lib/services/telemetryEventBus.ts

   Timestamp:
   14 May 2026 04:15 (Sydney)

   PURPOSE:
   Real telemetry event bus
===================================================== */

import EventEmitter
from "eventemitter3"

export interface TelemetryEvent {

  id:string

  type:string

  severity:string

  timestamp:number

  payload:any
}

class TelemetryBus {

  private emitter =
  new EventEmitter()

  publish(
    event:TelemetryEvent
  ){

    this.emitter.emit(
      "telemetry",
      event
    )
  }

  subscribe(
    callback:
    (
      event:TelemetryEvent
    )=>void
  ){

    this.emitter.on(
      "telemetry",
      callback
    )

    return ()=>{

      this.emitter.off(
        "telemetry",
        callback
      )
    }
  }
}

export const telemetryBus =
new TelemetryBus()
