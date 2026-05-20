/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\runtime\shared-polling-engine.js
===================================================== */

const scheduler =
require("./central-scheduler")

function startPolling(
  service,
  interval,
  handler
){

  scheduler.registerTask(

    service,

    interval,

    async () => {

      try {

        await handler()

      } catch(error){

        console.log(

          "Polling failure:",
          service
        )
      }
    }
  )
}

module.exports = {

  startPolling
}