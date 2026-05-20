/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\harvestScheduler.ts

   Timestamp:
   2026-05-07 12:30

   Purpose:
   - Scheduled harvesting
   - Background intelligence refresh
===================================================== */

import {

  getKnowledgeForPart

}
from "./knowledgeHarvester"

import {

  storeKnowledgeNode

}
from "./knowledgeGraph"

// =====================================================
// PARTS
// =====================================================

const TRACKED_PARTS = [

  "RTC6079",

  "ERR3340",

  "STC50529"
]

// =====================================================
// RUN HARVEST
// =====================================================

export async function runScheduledHarvest(){

  console.log(
    "RUNNING SCHEDULED HARVEST"
  )

  for(const part of TRACKED_PARTS){

    const knowledge =
      await getKnowledgeForPart(
        part
      )

    for(const item of knowledge){

      await storeKnowledgeNode({

        part_number:
          part,

        category:
          item.category,

        source:
          item.source,

        title:
          item.title,

        insights:
          item.insights,

        confidence:
          item.confidence,

        metadata:{

          harvestedAt:
            item.harvestedAt
        }
      })
    }
  }

  console.log(
    "HARVEST COMPLETE"
  )
}

// =====================================================
// INTERVAL
// =====================================================

export function startHarvestScheduler(){

  console.log(
    "STARTING HARVEST SCHEDULER"
  )

  // =====================================================
  // INITIAL
  // =====================================================

  runScheduledHarvest()

  // =====================================================
  // EVERY 6 HOURS
  // =====================================================

  setInterval(()=>{

    runScheduledHarvest()

  }, 1000 * 60 * 60 * 6)
}
