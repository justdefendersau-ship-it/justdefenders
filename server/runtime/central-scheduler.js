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

  const task = {

    name,
    interval,
    handler,
    timer: null
  }

  tasks.push(task)

  task.timer = setInterval(
    handler,
    interval
  )

  return task
}

function getTasks(){

  return tasks
}

module.exports = {

  registerTask,
  getTasks
}