"use client"

import { io }
from "socket.io-client"

export const socket =
io("http://localhost:8081", {

  reconnection:true,

  reconnectionAttempts:999999,

  reconnectionDelay:1000,

  transports:["websocket"]
})