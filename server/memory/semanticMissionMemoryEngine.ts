/* =====================================================
   JustDefenders ©
   File:
   /server/memory/semanticMissionMemoryEngine.ts

   Timestamp:
   14 May 2026 18:15 (Sydney)

   PURPOSE:
   Semantic mission memory engine
===================================================== */

export interface MemoryEvent {

  id:string

  mission:string

  memory:string
}

const memories:MemoryEvent[] = []

export function storeMissionMemory(

  event:MemoryEvent

){

  memories.push(event)
}

export function retrieveMissionMemories(){

  return memories
}
