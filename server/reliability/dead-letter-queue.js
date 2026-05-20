/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\reliability\dead-letter-queue.js
===================================================== */

class DeadLetterQueue {

  constructor(){

    this.items = []
  }

  add(event){

    this.items.push({

      failedAt:
      new Date().toISOString(),

      event
    })
  }

  getAll(){

    return this.items
  }
}

module.exports =
new DeadLetterQueue()