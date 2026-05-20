/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\redis\ai-context-cache.js
===================================================== */

const cache =
require("./distributed-cache")

async function storeContext(
  session,
  context
){

  await cache.setCache(

    "ai-context-" + session,

    context
  )
}

async function getContext(
  session
){

  return await cache.getCache(

    "ai-context-" + session
  )
}

module.exports = {

  storeContext,
  getContext
}