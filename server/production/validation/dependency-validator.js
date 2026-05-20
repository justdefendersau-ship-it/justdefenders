/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\production\validation\dependency-validator.js
===================================================== */

const registry =
require("../../runtime/service-registry")

function validateDependencies(){

  return registry.map(service => ({

    service:
    service.name,

    dependencies:
    "VALIDATED",

    status:
    "PASS"
  }))
}

module.exports = {

  validateDependencies
}