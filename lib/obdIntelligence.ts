/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\obdIntelligence.ts

   Timestamp:
   2026-05-07 14:00

   Purpose:
   - OBD intelligence foundations
   - Fault-code interpretation
===================================================== */

// =====================================================
// DTC MAP
// =====================================================

const DTC_MAP:any = {

  P0101:{

    title:
      "MAF Sensor Performance",

    severity:
      "medium",

    likelyCauses:[

      "Dirty MAF sensor",

      "Intake leak",

      "Faulty sensor"
    ]
  },

  P0401:{

    title:
      "EGR Flow Insufficient",

    severity:
      "medium",

    likelyCauses:[

      "Blocked EGR",

      "Vacuum issue"
    ]
  },

  P1190:{

    title:
      "Fuel Pressure Out Of Range",

    severity:
      "high",

    likelyCauses:[

      "Fuel regulator issue",

      "Pump issue"
    ]
  }
}

// =====================================================
// LOOKUP
// =====================================================

export function interpretDTC(
  code:string
){

  return DTC_MAP[code] || null
}
