/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\security\secrets-manager.js
===================================================== */

class SecretsManager {

  get(name){

    return process.env[name]
  }
}

module.exports =
new SecretsManager()