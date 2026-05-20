/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\redis\redis-client.js
===================================================== */

const {
  createClient
} = require("redis")

const config =
require("./redis-config")

const client =
createClient({

  socket:{

    host:
    config.host,

    port:
    config.port
  }
})

client.on(

  "error",

  error => {

    console.log(
      "Redis error:",
      error.message
    )
  }
)

async function connect(){

  try {

    await client.connect()

    console.log(
      "Redis connected"
    )

  } catch(error){

    console.log(
      "Redis connection failure"
    )
  }
}

connect()

module.exports =
client