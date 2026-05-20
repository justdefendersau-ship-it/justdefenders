/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\events\central-event-bus.js
===================================================== */

class EventBus {

  constructor(){

    this.subscribers = {}

    this.eventStore = []
  }

  subscribe(
    event,
    handler
  ){

    if(
      !this.subscribers[event]
    ){

      this.subscribers[event] = []
    }

    this.subscribers[event]
    .push(handler)
  }

  async publish(
    event,
    payload
  ){

    const envelope = {

      event,

      payload,

      timestamp:
      new Date().toISOString()
    }

    this.eventStore
    .push(envelope)

    console.log(

      "EVENT:",
      envelope
    )

    const handlers =
    this.subscribers[event] || []

    for(
      const handler
      of handlers
    ){

      try {

        await handler(payload)

      } catch(error){

        console.log(

          "Event handler failure:",
          event
        )
      }
    }
  }

  replay(){

    return this.eventStore
  }
}

module.exports =
new EventBus()