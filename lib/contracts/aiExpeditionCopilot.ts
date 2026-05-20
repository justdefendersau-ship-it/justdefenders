/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/aiExpeditionCopilot.ts

   Timestamp:
   13 May 2026 10:45 (Sydney)

   PURPOSE:
   AI expedition copilot contract
===================================================== */

export interface AIExpeditionCopilotContract {

  copilotId:string

  convoyName:string

  copilotState?:

    | "listening"
    | "assisting"
    | "advising"
    | "critical"

  activeConversationThreads?:number

  aiConfidence?:number

  survivabilityAwareness?:number

  predictiveAccuracy?:number

  copilotAlerts?:string[]

  autonomousRecommendations?:string[]

  voiceCommands?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
