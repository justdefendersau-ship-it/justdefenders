/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\reliability\retry-queue.js
===================================================== */

class RetryQueue {

  constructor(){

    this.items = []
  }

  enqueue(task){

    this.items.push({

      task,

      retries:0
    })
  }

  async process(){

    for(const item of this.items){

      try {

        await item.task()

      } catch(error){

        item.retries++

        console.log(
          "Retry failure:",
          item.retries
        )
      }
    }
  }
}

module.exports =
new RetryQueue()