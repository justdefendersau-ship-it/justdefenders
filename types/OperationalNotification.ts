// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\types\OperationalNotification.ts
//
// Timestamp:
// 27 May 2026 19:45 Sydney
//
// PURPOSE:
// Operational notification model.
// ====================================================================

export interface OperationalNotification {

  id:string

  timestamp:string

  severity:
    "LOW" |
    "MEDIUM" |
    "HIGH"

  category:string

  title:string

  message:string

  acknowledged:boolean
}