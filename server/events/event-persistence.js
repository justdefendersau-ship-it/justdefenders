/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\events\event-persistence.js
===================================================== */

const persisted = []

function persist(
  event
){

  persisted.push({

    ...event,

    persistedAt:
    new Date().toISOString()
  })
}

function getPersisted(){

  return persisted
}

module.exports = {

  persist,
  getPersisted
}