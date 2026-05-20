/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\visualPartsIntelligence.ts

   Timestamp:
   2026-05-07 11:00

   Purpose:
   - Visual parts intelligence
   - Diagram intelligence
   - Workshop manual references
===================================================== */

export type PartVisualIntelligence = {

  part: string

  title: string

  image: string

  explodedDiagram: string

  diagramGroup: string

  relatedComponents: string[]

  workshopSection: string

  workshopProcedure: string

  workshopDifficulty: string

  estimatedTime: string

  notes: string[]
}

// =====================================================
// VISUAL DATABASE
// =====================================================

const VISUALS: PartVisualIntelligence[] = [

  // =====================================================
  // ERR3340
  // =====================================================

  {
    part:"ERR3340",

    title:
      "Defender Oil Filter",

    image:
      "https://media.lrdirect.com/images/ERR3340.jpg",

    explodedDiagram:
      "https://media.lrdirect.com/diagrams/defender_engine_oil_system.jpg",

    diagramGroup:
      "Engine Lubrication System",

    relatedComponents:[
      "RTC3184",
      "ERR6299",
      "ESR4238"
    ],

    workshopSection:
      "Engine Lubrication",

    workshopProcedure:
      "Oil and filter replacement",

    workshopDifficulty:
      "Easy",

    estimatedTime:
      "30-45 mins",

    notes:[

      "Prime filter before installation where applicable",

      "Inspect sump plug washer during servicing"
    ]
  },

  // =====================================================
  // RTC6079
  // =====================================================

  {
    part:"RTC6079",

    title:
      "Swivel Housing Seal",

    image:
      "https://media.lrdirect.com/images/RTC6079.jpg",

    explodedDiagram:
      "https://media.lrdirect.com/diagrams/defender_front_axle_swivel.jpg",

    diagramGroup:
      "Front Axle / Swivel Housing",

    relatedComponents:[
      "FTC3401",
      "FRC8220",
      "RTC3511"
    ],

    workshopSection:
      "Front Axle",

    workshopProcedure:
      "Swivel housing overhaul",

    workshopDifficulty:
      "Advanced",

    estimatedTime:
      "3-5 hours",

    notes:[

      "Check wheel bearings during overhaul",

      "Inspect chrome swivel surface for pitting"
    ]
  },

  // =====================================================
  // STC50529
  // =====================================================

  {
    part:"STC50529",

    title:
      "Air Filter",

    image:
      "https://media.lrdirect.com/images/STC50529.jpg",

    explodedDiagram:
      "https://media.lrdirect.com/diagrams/defender_intake_system.jpg",

    diagramGroup:
      "Intake System",

    relatedComponents:[
      "PHE000112",
      "ESR2623"
    ],

    workshopSection:
      "Air Intake",

    workshopProcedure:
      "Air filter replacement",

    workshopDifficulty:
      "Easy",

    estimatedTime:
      "10 mins",

    notes:[

      "Inspect intake hoses for cracking"
    ]
  }
]

// =====================================================
// LOOKUP
// =====================================================

export function getVisualIntelligence(
  part:string
){

  return VISUALS.find(

    v => v.part === part

  ) || null
}
