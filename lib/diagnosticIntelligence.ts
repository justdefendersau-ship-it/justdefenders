/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\diagnosticIntelligence.ts

   Timestamp:
   2026-05-07 14:00

   Purpose:
   - Adaptive diagnostic intelligence
   - Symptom intelligence
   - Mechanical + OBD diagnostics
===================================================== */

// =====================================================
// TYPES
// =====================================================

export type DiagnosticResult = {

  symptom: string

  probableCause: string

  likelihood: number

  urgency: string

  difficulty: string

  recommendedParts: string[]

  recommendedActions: string[]
}

// =====================================================
// DIAGNOSTIC GRAPH
// =====================================================

const DIAGNOSTIC_GRAPH = [

  // =====================================================
  // OVERHEATING
  // =====================================================

  {

    symptom:
      "overheating",

    results:[

      {

        probableCause:
          "Cooling system leak",

        likelihood:0.88,

        urgency:"high",

        difficulty:"medium",

        recommendedParts:[

          "PCH001190",
          "PEM100990"
        ],

        recommendedActions:[

          "Inspect hoses",

          "Pressure test cooling system",

          "Inspect radiator"
        ]
      },

      {

        probableCause:
          "Viscous fan failure",

        likelihood:0.64,

        urgency:"medium",

        difficulty:"easy",

        recommendedParts:[

          "ERR2266"
        ],

        recommendedActions:[

          "Inspect fan resistance",

          "Check fan operation"
        ]
      }
    ]
  },

  // =====================================================
  // CLUNK
  // =====================================================

  {

    symptom:
      "clunk on acceleration",

    results:[

      {

        probableCause:
          "Worn A-frame ball joint",

        likelihood:0.82,

        urgency:"medium",

        difficulty:"medium",

        recommendedParts:[

          "ANR1799"
        ],

        recommendedActions:[

          "Inspect rear suspension",

          "Check driveline play"
        ]
      },

      {

        probableCause:
          "Propshaft wear",

        likelihood:0.71,

        urgency:"high",

        difficulty:"medium",

        recommendedParts:[

          "TVC100010"
        ],

        recommendedActions:[

          "Inspect universal joints",

          "Check propshaft movement"
        ]
      }
    ]
  },

  // =====================================================
  // HARD STARTING
  // =====================================================

  {

    symptom:
      "hard starting",

    results:[

      {

        probableCause:
          "Glow plug degradation",

        likelihood:0.69,

        urgency:"medium",

        difficulty:"easy",

        recommendedParts:[

          "ERR6066"
        ],

        recommendedActions:[

          "Check glow plugs",

          "Inspect battery voltage"
        ]
      }
    ]
  }
]

// =====================================================
// DIAGNOSE
// =====================================================

export function diagnoseSymptom(
  symptom:string
){

  const lower =
    symptom.toLowerCase()

  const match =
    DIAGNOSTIC_GRAPH.find(

      d => lower.includes(
        d.symptom
      )
    )

  if(!match){

    return []
  }

  return match.results
}
