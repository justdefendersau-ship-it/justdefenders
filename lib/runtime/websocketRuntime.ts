// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\websocketRuntime.ts
//
// Timestamp:
// 28 May 2026 05:10 Sydney
//
// PURPOSE:
// Operational websocket runtime.
// ====================================================================

import { WebSocketServer }
from "ws"

// ====================================================================
// GLOBAL
// ====================================================================

let websocketServer:
WebSocketServer | null = null

// ====================================================================
// START
// ====================================================================

export function startWebsocketRuntime(){

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

export function broadcastRuntimeEvent(

  event:any

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