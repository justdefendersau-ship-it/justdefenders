/* =====================================================
   JustDefenders ©
===================================================== */

export function getOperationalUrgency(

  route:string,
  keyword:string

){

  const lower =
    keyword.toLowerCase()

  const cooling =
    lower.includes("cooling")
    ||
    lower.includes("hose")

  const bearings =
    lower.includes("bearing")

  const filtration =
    lower.includes("filter")

  const belts =
    lower.includes("belt")

  // ===================================================
  // REMOTE ROUTES
  // ===================================================

  if(
    route === "CSR"
    ||
    route === "Gunbarrel"
  ){

    if(
      cooling
      ||
      bearings
      ||
      filtration
      ||
      belts
    ){

      return {

        operationalRisk:"HIGH",

        failureImpact:"CRITICAL",

        fieldRepairability:"MEDIUM",

        carrySpare:"YES",

        urgencyClass:"jd-urgency-high"
      }
    }

    return {

      operationalRisk:"MEDIUM",

      failureImpact:"MODERATE",

      fieldRepairability:"HIGH",

      carrySpare:"OPTIONAL",

      urgencyClass:"jd-urgency-medium"
    }
  }

  // ===================================================
  // CAPE YORK
  // ===================================================

  if(
    route === "Cape York"
  ){

    if(
      bearings
      ||
      cooling
    ){

      return {

        operationalRisk:"HIGH",

        failureImpact:"HIGH",

        fieldRepairability:"MEDIUM",

        carrySpare:"YES",

        urgencyClass:"jd-urgency-high"
      }
    }

    return {

      operationalRisk:"MEDIUM",

      failureImpact:"MODERATE",

      fieldRepairability:"HIGH",

      carrySpare:"RECOMMENDED",

      urgencyClass:"jd-urgency-medium"
    }
  }

  // ===================================================
  // HIGH COUNTRY
  // ===================================================

  if(
    route === "High Country"
  ){

    return {

      operationalRisk:"MEDIUM",

      failureImpact:"MODERATE",

      fieldRepairability:"HIGH",

      carrySpare:"RECOMMENDED",

      urgencyClass:"jd-urgency-medium"
    }
  }

  // ===================================================
  // DEFAULT
  // ===================================================

  return {

    operationalRisk:"LOW",

    failureImpact:"LOW",

    fieldRepairability:"HIGH",

    carrySpare:"NO",

    urgencyClass:"jd-urgency-low"
  }
}
