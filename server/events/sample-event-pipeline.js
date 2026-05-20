/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\events\sample-event-pipeline.js
===================================================== */

const bus =
require("./central-event-bus")

const contracts =
require("./event-contracts")

const correlation =
require("./event-correlation-engine")

const persistence =
require("./event-persistence")

bus.subscribe(

  contracts.TELEMETRY_EVENT,

  async payload => {

    correlation.correlate(payload)

    persistence.persist(payload)

    console.log(

      "Telemetry processed"
    )
  }
)

async function simulate(){

  await bus.publish(

    contracts.TELEMETRY_EVENT,

    {

      source:
      "Windows-Security",

      severity:
      "HIGH"
    }
  )
}

setInterval(
  simulate,
  45000
)

simulate()