/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\runtime\central-scheduler.js
===================================================== */

const tasks = []

function registerTask(
  name,
  interval,
  handler
){

  tasks.push({

    name,
    interval,
    handler
  })

  setInterval(
    handler,
    interval
  )
}

function getTasks(){

  return tasks
}

module.exports = {

  registerTask,
  getTasks
}