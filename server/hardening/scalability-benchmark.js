/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\hardening\scalability-benchmark.js
===================================================== */

console.log("")
console.log("====================================")
console.log("SCALABILITY BENCHMARK")
console.log("RUNTIME PROFILING ACTIVE")
console.log("====================================")
console.log("")

function benchmark(){

  console.log({

    memory:
    process.memoryUsage(),

    cpu:
    process.cpuUsage(),

    uptime:
    process.uptime(),

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  benchmark,
  30000
)

benchmark()