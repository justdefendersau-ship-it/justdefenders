/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\infrastructure\queue\queue-provider.js
===================================================== */

class QueueProvider {

  constructor(){

    this.provider =
    process.env.QUEUE_PROVIDER ||
    "memory"

    this.queue = []
  }

  publish(event){

    this.queue.push(event)

    console.log(
      "Queued event:",
      event.type
    )
  }

  consume(){

    return this.queue.shift()
  }

  size(){

    return this.queue.length
  }
}

module.exports =
new QueueProvider()