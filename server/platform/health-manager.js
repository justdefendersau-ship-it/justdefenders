/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\health-manager.js
===================================================== */

const logger =
require("../shared/logger")

const services = []

function registerService(service){

  if(!services.some(existing => existing.name === service.name)){
    services.push(service)
  } else {
    const existing = services.find(item => item.name === service.name)
    Object.assign(existing, service)
  }

  logger.info(
    "Registered service: " +
    service.name
  )
}

function getService(name){
  return services.find(service => service.name === name) || null
}

function getHealth(){

  return services.map(service => ({

    name:
    service.name,

    status:
    service.status || "UNKNOWN",

    running:
    Boolean(service.running),

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

    service.running =
    true

    service.lastHeartbeat =
    new Date().toISOString()
  }
}

function setServiceStatus(name, status, details = {}){
  const service = getService(name)

  if(service){
    service.status = status
    service.running = Boolean(details.running)
    service.lastHeartbeat = details.lastHeartbeat || service.lastHeartbeat || null

    if(details.error){
      service.error = details.error
    }
  }
}

module.exports = {

  registerService,
  getService,
  getHealth,
  heartbeat,
  setServiceStatus
}