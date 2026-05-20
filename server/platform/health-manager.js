/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\health-manager.js
===================================================== */

const logger =
require("../shared/logger")

const services = []

function registerService(service){

  services.push(service)

  logger.info(
    "Registered service: " +
    service.name
  )
}

function getHealth(){

  return services.map(service => ({

    name:
    service.name,

    status:
    service.status || "UNKNOWN",

    lastHeartbeat:
    service.lastHeartbeat || null
  }))
}

function heartbeat(name){

  const service =
  services.find(
    s => s.name === name
  )

  if(service){

    service.status =
    "ONLINE"

    service.lastHeartbeat =
    new Date().toISOString()
  }
}

module.exports = {

  registerService,
  getHealth,
  heartbeat
}