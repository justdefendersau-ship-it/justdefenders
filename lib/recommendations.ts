/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\recommendations.ts

   Timestamp:
   2026-05-07 10:30

   Purpose:
   - Personalised recommendation engine
   - Ownership intelligence
   - Preventative maintenance logic
===================================================== */

export type Recommendation = {

  title: string

  reason: string

  priority: "low" | "medium" | "high"

  category: string
}

// =====================================================
// RECOMMENDATIONS
// =====================================================

export function buildRecommendations(

  vehicle:any,

  parts:string[],

  emergencyMode:boolean

): Recommendation[] {

  const recs: Recommendation[] = []

  // =====================================================
  // EMERGENCY MODE
  // =====================================================

  if(emergencyMode){

    recs.push({

      title:
        "Check nearby suppliers first",

      reason:
        "Pickup and same-day dispatch may reduce downtime.",

      priority:"high",

      category:"urgency"
    })
  }

  // =====================================================
  // PUMA
  // =====================================================

  if(vehicle?.generation === "Puma"){

    recs.push({

      title:
        "Inspect intercooler hoses",

      reason:
        "Puma Defenders commonly experience hose degradation over time.",

      priority:"medium",

      category:"maintenance"
    })

    recs.push({

      title:
        "Consider heavy-duty clutch upgrades",

      reason:
        "Aftermarket clutch kits are often more durable than OEM under touring loads.",

      priority:"medium",

      category:"upgrade"
    })
  }

  // =====================================================
  // TD5
  // =====================================================

  if(vehicle?.generation === "TD5"){

    recs.push({

      title:
        "Oil contamination check",

      reason:
        "TD5 injector harness oil migration is a common preventative maintenance item.",

      priority:"high",

      category:"maintenance"
    })

    recs.push({

      title:
        "Carry crank angle sensor spare",

      reason:
        "Many TD5 owners carry a spare due to roadside failure risk.",

      priority:"medium",

      category:"reliability"
    })
  }

  // =====================================================
  // 300TDI
  // =====================================================

  if(vehicle?.generation === "300Tdi"){

    recs.push({

      title:
        "Timing belt inspection recommended",

      reason:
        "300Tdi engines benefit from preventative timing belt maintenance.",

      priority:"high",

      category:"maintenance"
    })
  }

  // =====================================================
  // BUNDLE LOGIC
  // =====================================================

  if(parts.length >= 2){

    recs.push({

      title:
        "Bundle UK orders where possible",

      reason:
        "Shipping cost per item reduces significantly with combined UK orders.",

      priority:"medium",

      category:"shipping"
    })
  }

  // =====================================================
  // AFTERMARKET
  // =====================================================

  recs.push({

    title:
      "Review aftermarket alternatives",

    reason:
      "Some aftermarket Defender parts outperform OEM durability.",

    priority:"medium",

    category:"aftermarket"
  })

  return recs
}
