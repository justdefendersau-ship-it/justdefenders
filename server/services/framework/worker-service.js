/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\services\framework\worker-service.js
===================================================== */

const BaseService =
require("./base-service")

class WorkerService
extends BaseService {

  constructor(name){

    super(name)
  }

  async process(){

    throw new Error(
      "process() not implemented"
    )
  }
}

module.exports =
WorkerService