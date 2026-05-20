/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\security\service-identity.js
===================================================== */

const crypto =
require("crypto")

function generateIdentity(service){

  return {

    service,

    identity:
    crypto.randomUUID()
  }
}

module.exports = {

  generateIdentity
}