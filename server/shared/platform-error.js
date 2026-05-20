/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\shared\platform-error.js
===================================================== */

class PlatformError
extends Error {

  constructor(
    message,
    code
  ){

    super(message)

    this.code = code

    this.timestamp =
    new Date().toISOString()
  }
}

module.exports =
PlatformError