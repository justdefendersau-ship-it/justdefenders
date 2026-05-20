/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\production\performance-profiler.js
===================================================== */

function profile(){

  const memory =
  process.memoryUsage()

  console.log({

    rss:
    memory.rss,

    heapUsed:
    memory.heapUsed,

    uptime:
    process.uptime()
  })
}

setInterval(
  profile,
  30000
)