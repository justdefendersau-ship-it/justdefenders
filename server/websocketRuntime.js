// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\server\websocketRuntime.js
//
// Timestamp:
// 28 May 2026 05:50 Sydney
//
// PURPOSE:
// Operational websocket runtime.
// ====================================================================

const {
  WebSocketServer
} = require("ws")

// ====================================================================
// GLOBAL
// ====================================================================

let websocketServer = null

// ====================================================================
// START
// ====================================================================

function startWebsocketRuntime(){

  if(websocketServer){

    console.log(
      "WebSocket runtime already active"
    )

    return websocketServer
  }

  websocketServer =

    new WebSocketServer({

      port:8090
    })

  websocketServer.on(

    "connection",

    websocket => {

      console.log(
        "WebSocket client connected"
      )

      websocket.send(

        JSON.stringify({

          type:"RUNTIME_CONNECTED",

          timestamp:
            new Date().toISOString()
        })
      )
    }
  )

  console.log(
    "WebSocket runtime active on 8090"
  )

  return websocketServer
}

// ====================================================================
// BROADCAST
// ====================================================================

function broadcastRuntimeEvent(
  event
){

  if(!websocketServer){

    return
  }

  websocketServer.clients.forEach(

    client => {

      try {

        client.send(
          JSON.stringify(event)
        )

      } catch(error){

        console.error(
          "WebSocket broadcast failure:",
          error
        )
      }
    }
  )
}

// ====================================================================
// EXPORTS
// ====================================================================

module.exports = {

  startWebsocketRuntime,

  broadcastRuntimeEvent
}