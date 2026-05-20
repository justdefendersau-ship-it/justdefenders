/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\knowledgeHarvester.ts

   Timestamp:
   2026-05-07 12:00

   Purpose:
   - Knowledge harvesting
   - Technical intelligence extraction
   - Community insight harvesting
===================================================== */

import * as cheerio from "cheerio"

// =====================================================
// TYPES
// =====================================================

export type HarvestedKnowledge = {

  source: string

  category: string

  title: string

  partNumbers: string[]

  insights: string[]

  confidence: number

  harvestedAt: string
}

// =====================================================
// KNOWLEDGE SOURCES
// =====================================================

const SOURCES = [

  {
    name:"AULRO",

    category:"forum",

    url:
      "https://www.aulro.com"
  },

  {
    name:"Defender2",

    category:"forum",

    url:
      "https://www.defender2.net"
  },

  {
    name:"LR4x4",

    category:"forum",

    url:
      "https://forums.lr4x4.com"
  }
]

// =====================================================
// PART EXTRACTION
// =====================================================

function extractPartNumbers(
  text:string
){

  const matches =

    text.match(

      /\b[A-Z]{2,5}[0-9]{3,6}\b/g

    ) || []

  return [...new Set(matches)]
}

// =====================================================
// INSIGHT EXTRACTION
// =====================================================

function extractInsights(
  text:string
){

  const insights:string[] = []

  const lower =
    text.toLowerCase()

  // =====================================================
  // FAILURE
  // =====================================================

  if(
    lower.includes("common failure")
  ){

    insights.push(
      "Common failure pattern detected"
    )
  }

  // =====================================================
  // AFTERMARKET
  // =====================================================

  if(
    lower.includes("aftermarket")
  ){

    insights.push(
      "Aftermarket upgrade discussion detected"
    )
  }

  // =====================================================
  // OEM
  // =====================================================

  if(
    lower.includes("oem")
  ){

    insights.push(
      "OEM comparison discussion detected"
    )
  }

  // =====================================================
  // LEAK
  // =====================================================

  if(
    lower.includes("leak")
  ){

    insights.push(
      "Leak-related maintenance discussion"
    )
  }

  return insights
}

// =====================================================
// HARVEST URL
// =====================================================

export async function harvestUrl(
  url:string
){

  try {

    const res =
      await fetch(
        url,
        {
          headers:{
            "User-Agent":
              "Mozilla/5.0"
          },

          cache:"no-store"
        }
      )

    if(!res.ok){

      return null
    }

    const html =
      await res.text()

    const $ =
      cheerio.load(html)

    const body =
      $("body").text()

    const partNumbers =
      extractPartNumbers(body)

    const insights =
      extractInsights(body)

    return {

      source:url,

      category:"community",

      title:
        $("title").text(),

      partNumbers,

      insights,

      confidence:0.72,

      harvestedAt:
        new Date().toISOString()
    }

  } catch(err){

    console.error(
      "HARVEST ERROR:",
      err
    )

    return null
  }
}

// =====================================================
// SAMPLE KNOWLEDGE
// =====================================================

export async function getKnowledgeForPart(
  part:string
){

  // =====================================================
  // SIMULATED HARVESTED INTELLIGENCE
  // =====================================================

  if(part === "RTC6079"){

    return [

      {

        source:"AULRO",

        category:"forum",

        title:
          "Swivel Housing Overhaul Experiences",

        partNumbers:[
          "RTC6079",
          "FTC3401"
        ],

        insights:[

          "Many owners prefer upgraded aftermarket swivel seals",

          "One-shot grease commonly recommended",

          "Check wheel bearings during swivel overhaul"
        ],

        confidence:0.91,

        harvestedAt:
          new Date().toISOString()
      }
    ]
  }

  // =====================================================
  // OIL FILTER
  // =====================================================

  if(part === "ERR3340"){

    return [

      {

        source:"Defender2",

        category:"forum",

        title:
          "Best Oil Filter Options for Touring",

        partNumbers:[
          "ERR3340"
        ],

        insights:[

          "OEM filters generally preferred",

          "Shorter oil intervals after dusty trips",

          "Aftermarket filters vary in quality"
        ],

        confidence:0.88,

        harvestedAt:
          new Date().toISOString()
      }
    ]
  }

  return []
}
