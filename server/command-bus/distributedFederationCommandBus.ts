/* =====================================================
   JustDefenders ©
   File:
   /server/command-bus/distributedFederationCommandBus.ts

   Timestamp:
   14 May 2026 20:15 (Sydney)

   PURPOSE:
   Distributed federation command bus
===================================================== */

export interface FederationCommand {

  id:string

  command:string

  region:string
}

const commands:FederationCommand[] = []

export function publishFederationCommand(

  command:FederationCommand

){

  commands.push(command)

  return command
}

export function getFederationCommands(){

  return commands
}
