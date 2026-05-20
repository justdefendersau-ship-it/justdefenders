/* =====================================================
   JustDefenders ©
   File:
   /server/workflows/distributedMissionWorkflowEngine.ts

   Timestamp:
   14 May 2026 10:15 (Sydney)

   PURPOSE:
   Distributed mission workflow engine
===================================================== */

export interface WorkflowTask {

  id:string

  mission:string

  status:string
}

const workflows:WorkflowTask[] = []

export function createWorkflowTask(

  task:WorkflowTask

){

  workflows.push(task)

  return task
}

export function getWorkflowTasks(){

  return workflows
}
