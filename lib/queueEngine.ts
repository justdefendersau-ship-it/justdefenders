/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\queueEngine.ts

   Timestamp:
   2026-05-07 17:00

   Purpose:
   - Queue foundations
   - Background processing
===================================================== */

// =====================================================
// QUEUE
// =====================================================

const queue:any[] = []

// =====================================================
// ADD
// =====================================================

export function enqueue(
  job:any
){

  queue.push(job)
}

// =====================================================
// PROCESS
// =====================================================

export async function processQueue(){

  while(queue.length > 0){

    const job =
      queue.shift()

    try {

      await job.handler()

    } catch(err){

      console.error(
        "QUEUE FAILURE:",
        err
      )
    }
  }
}

// =====================================================
// START
// =====================================================

export function startQueueWorker(){

  setInterval(()=>{

    processQueue()

  }, 5000)
}
