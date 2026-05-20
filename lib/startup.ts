/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\startup.ts

   Timestamp:
   2026-05-07 12:30

   Purpose:
   - Platform startup
   - Background scheduler bootstrap
===================================================== */

import {

  startHarvestScheduler

}
from "./harvestScheduler"

// =====================================================
// START
// =====================================================

let started = false

export function startPlatformServices(){

  if(started){

    return
  }

  started = true

  console.log(
    "STARTING PLATFORM SERVICES"
  )

  // =====================================================
  // HARVESTER
  // =====================================================

  startHarvestScheduler()
}
