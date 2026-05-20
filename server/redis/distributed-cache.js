/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\redis\distributed-cache.js
===================================================== */

const redis =
require("./redis-client")

async function setCache(
  key,
  value
){

  try {

    await redis.set(

      key,

      JSON.stringify(value)
    )

  } catch(error){

    console.log(
      "Cache set failure"
    )
  }
}

async function getCache(
  key
){

  try {

    const value =
    await redis.get(key)

    return JSON.parse(value)

  } catch(error){

    return null
  }
}

module.exports = {

  setCache,
  getCache
}