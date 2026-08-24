/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\health-manager.js
===================================================== */

const logger =
require("../shared/logger")

const {
  persistPlatformServiceHealth
} =
require("./platform-service-health-writer")

const services = []

const PLATFORM_HEALTH_PERSISTENCE_INTERVAL_MS =
60 * 1000

const persistenceState = new Map()

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

function createPersistenceSnapshot(service){

  return {
    name:
    service.name,

    status:
    service.status || "UNKNOWN",

    running:
    Boolean(service.running),

    lastHeartbeat:
    service.lastHeartbeat || null,

    error:
    service.error || null
  }
}

function persistHeartbeatIfDue(service){

  if(!service || !service.name){
    return
  }

  const now =
  Date.now()

  const state =
  persistenceState.get(service.name) ||
  {
    lastAttemptAt: 0,
    inFlight: false
  }

  if(state.inFlight){
    return
  }

  if(
    state.lastAttemptAt !== 0 &&
    now - state.lastAttemptAt <
    PLATFORM_HEALTH_PERSISTENCE_INTERVAL_MS
  ){
    return
  }

  state.lastAttemptAt =
  now

  state.inFlight =
  true

  persistenceState.set(
    service.name,
    state
  )

  const snapshot =
  createPersistenceSnapshot(service)

  Promise.resolve(
    persistPlatformServiceHealth(snapshot)
  )
  .catch(error => {

    logger.warn(
      "Platform service-health heartbeat persistence failed: " +
      (error && error.message
        ? error.message
        : String(error))
    )
  })
  .finally(() => {

    const current =
    persistenceState.get(service.name)

    if(current){
      current.inFlight =
      false

      persistenceState.set(
        service.name,
        current
      )
    }
  })
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

    persistHeartbeatIfDue(service)
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