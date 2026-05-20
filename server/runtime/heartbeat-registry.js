/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\runtime\heartbeat-registry.js
===================================================== */

class HeartbeatRegistry {

  constructor(){

    this.services = {}
  }

  beat(
    service
  ){

    this.services[service] = {

      lastSeen:
      new Date().toISOString(),

      status:
      "ONLINE"
    }
  }

  getStatus(){

    return this.services
  }
}

module.exports =
new HeartbeatRegistry()