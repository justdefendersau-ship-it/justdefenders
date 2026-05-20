/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\services\framework\engine-service.js
===================================================== */

const BaseService =
require("./base-service")

class EngineService
extends BaseService {

  constructor(
    name,
    interval
  ){

    super(name)

    this.interval =
    interval || 30000
  }

  async execute(){

    throw new Error(
      "execute() not implemented"
    )
  }

  async start(){

    await super.start()

    this.timer =
    setInterval(async() => {

      try {

        await this.execute()

        this.heartbeat()

      } catch(error){

        console.log(
          this.name +
          " engine failure:",
          error.message
        )
      }

    }, this.interval)
  }

  async stop(){

    clearInterval(
      this.timer
    )

    await super.stop()
  }
}

module.exports =
EngineService