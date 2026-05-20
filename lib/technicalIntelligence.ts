/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\technicalIntelligence.ts

   Timestamp:
   2026-05-07 11:30

   Purpose:
   - Interactive technical intelligence
   - Repair intelligence
   - Workshop assistance
===================================================== */

export type TechnicalIntelligence = {

  part: string

  repairDifficulty: string

  estimatedRepairTime: string

  torqueSpecifications: {

    component: string

    torque: string

  }[]

  requiredTools: string[]

  dependencies: string[]

  whileYouAreThere: string[]

  commonMistakes: string[]

  forumInsights: string[]

  preventativeMaintenance: string[]
}

// =====================================================
// TECHNICAL DATABASE
// =====================================================

const TECH_DATA: TechnicalIntelligence[] = [

  // =====================================================
  // RTC6079
  // =====================================================

  {
    part:"RTC6079",

    repairDifficulty:
      "Advanced",

    estimatedRepairTime:
      "3-5 hours",

    torqueSpecifications:[

      {
        component:
          "Wheel Bearing Nut",

        torque:
          "65 Nm"
      },

      {
        component:
          "Swivel Housing Bolts",

        torque:
          "81 Nm"
      }
    ],

    requiredTools:[

      "Hub Nut Socket",

      "Torque Wrench",

      "Seal Puller",

      "Bearing Grease"
    ],

    dependencies:[

      "FTC3401",

      "RTC3511",

      "Wheel Bearings"
    ],

    whileYouAreThere:[

      "Inspect swivel chrome surfaces",

      "Check wheel bearings",

      "Replace hub seals if leaking",

      "Inspect brake pads"
    ],

    commonMistakes:[

      "Incorrect wheel bearing preload",

      "Damaging swivel seal during install",

      "Reusing worn bearings"
    ],

    forumInsights:[

      "Many owners prefer one-shot swivel grease",

      "Aftermarket seals vary significantly in quality"
    ],

    preventativeMaintenance:[

      "Inspect swivel housings annually",

      "Check for oil contamination around seals"
    ]
  },

  // =====================================================
  // ERR3340
  // =====================================================

  {
    part:"ERR3340",

    repairDifficulty:
      "Easy",

    estimatedRepairTime:
      "30 mins",

    torqueSpecifications:[

      {
        component:
          "Oil Filter Housing",

        torque:
          "Hand tight + quarter turn"
      }
    ],

    requiredTools:[

      "Oil Drain Tray",

      "Filter Wrench"
    ],

    dependencies:[

      "Engine Oil",

      "Sump Washer"
    ],

    whileYouAreThere:[

      "Inspect turbo hoses",

      "Check oil cooler lines",

      "Inspect for oil leaks"
    ],

    commonMistakes:[

      "Over-tightening filter",

      "Double gasketing"
    ],

    forumInsights:[

      "OEM filters generally preferred for TD5",

      "Heavy-duty oils commonly recommended for touring"
    ],

    preventativeMaintenance:[

      "Shorter intervals recommended after water crossings"
    ]
  },

  // =====================================================
  // STC50529
  // =====================================================

  {
    part:"STC50529",

    repairDifficulty:
      "Easy",

    estimatedRepairTime:
      "10 mins",

    torqueSpecifications:[],

    requiredTools:[

      "Screwdriver"
    ],

    dependencies:[

      "Intake Hose Inspection"
    ],

    whileYouAreThere:[

      "Inspect airbox sealing",

      "Check intake hoses for cracking"
    ],

    commonMistakes:[

      "Poor airbox sealing after replacement"
    ],

    forumInsights:[

      "Dust ingress common in off-road conditions"
    ],

    preventativeMaintenance:[

      "Replace earlier after dusty touring"
    ]
  }
]

// =====================================================
// LOOKUP
// =====================================================

export function getTechnicalIntelligence(
  part:string
){

  return TECH_DATA.find(

    t => t.part === part

  ) || null
}
