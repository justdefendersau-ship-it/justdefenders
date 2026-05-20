/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\redis\event-buffer.js
===================================================== */

const redis =
require("./redis-client")

async function pushEvent(
  event
){

  try {

    await redis.lPush(

      "event-buffer",

      JSON.stringify(event)
    )

  } catch(error){

    console.log(
      "Event buffer failure"
    )
  }
}

async function getEvents(){

  try {

    return await redis.lRange(

      "event-buffer",

      0,

      20
    )

  } catch(error){

    return []
  }
}

module.exports = {

  pushEvent,
  getEvents
}