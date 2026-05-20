/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\production\readiness-report.js
===================================================== */

const runtime =
require("./validation/runtime-validator")

const dependencies =
require("./validation/dependency-validator")

const startup =
require("./validation/startup-validator")

const security =
require("./validation/security-validator")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS READINESS REPORT")
console.log("PRODUCTION VALIDATION ACTIVE")
console.log("====================================")
console.log("")

function report(){

  console.log({

    runtime:
    runtime.validateRuntime(),

    dependencies:
    dependencies.validateDependencies(),

    startup:
    startup.validateStartup(),

    security:
    security.validateSecurity()
  })
}

setInterval(
  report,
  60000
)

report()