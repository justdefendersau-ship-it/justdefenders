/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\services\framework\base-service.js
===================================================== */

const logger =
require("../../shared/logger")

const health =
require("../../platform/health-manager")

class BaseService {

  constructor(name){

    this.name =
    name

    this.running =
    false
  }

  async start(){

    logger.info(
      this.name +
      " starting"
    )

    health.registerService({

      name:this.name,
      status:"ONLINE"
    })

    this.running =
    true
  }

  async stop(){

    logger.warn(
      this.name +
      " stopping"
    )

    this.running =
    false
  }

  heartbeat(){

    health.heartbeat(
      this.name
    )
  }
}

module.exports =
BaseService