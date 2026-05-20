/* =====================================================
   JustDefenders ©
   File:
   /lib/services/liveEventReplayService.ts

   Timestamp:
   14 May 2026 06:15 (Sydney)

   PURPOSE:
   Live operational event replay
===================================================== */

export interface ReplayEvent {

  id:string

  timestamp:number

  event:string
}

const replayBuffer:
ReplayEvent[] = []

export function pushReplayEvent(

  event:ReplayEvent

){

  replayBuffer.push(event)

  if(
    replayBuffer.length > 100
  ){

    replayBuffer.shift()
  }
}

export function getReplayEvents(){

  return replayBuffer
}
