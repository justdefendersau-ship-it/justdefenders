/* =====================================================
   JustDefenders ©
   File:
   /server/autoscaling/federationRuntimeAutoscaling.ts

   Timestamp:
   14 May 2026 14:15 (Sydney)

   PURPOSE:
   Federation runtime autoscaling logic
===================================================== */

export function evaluateAutoscaling(

  load:number

){

  if(
    load > 80
  ){

    return {

      action:"SCALE_UP",

      replicas:6
    }
  }

  return {

    action:"STABLE",

    replicas:3
  }
}
