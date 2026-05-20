// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\distributed\distributedRuntimeTypes.ts
// Timestamp: 15 May 2026 10:40 Sydney
// ====================================================================

export type DistributedNodeStatus =

  | "online"
  | "offline"
  | "degraded"

export interface DistributedRuntimeNode {

  id: string

  region: string

  status: DistributedNodeStatus

  workload: number

  lastHeartbeat: string
}