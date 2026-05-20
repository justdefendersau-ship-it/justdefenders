/* =====================================================
   JustDefenders ©
===================================================== */

export function getRouteOperationalRibbon(

  route:string,
  keyword:string

){

  const criticalKeywords = [

    "cooling",
    "bearing",
    "filter",
    "belt",
    "hose",
    "recovery",
    "fuel"

  ]

  const lowerKeyword =
    keyword.toLowerCase()

  const isCritical =
    criticalKeywords.some(

      (k)=>
        lowerKeyword.includes(k)
    )

  if(

    (
      route === "CSR"
      ||
      route === "Gunbarrel"
    )

    &&

    isCritical

  ){

    return {

      ribbon:"CRITICAL REMOTE SPARE",

      className:
        "jd-ribbon-red"
    }
  }

  if(

    route === "Cape York"

    &&

    (
      lowerKeyword.includes("bearing")
      ||
      lowerKeyword.includes("seal")
    )

  ){

    return {

      ribbon:"WATER CROSSING READY",

      className:
        "jd-ribbon-green"
    }
  }

  if(

    route === "High Country"

    &&

    (
      lowerKeyword.includes("recovery")
      ||
      lowerKeyword.includes("cooling")
    )

  ){

    return {

      ribbon:"HIGH COUNTRY READY",

      className:
        "jd-ribbon-blue"
    }
  }

  return {

    ribbon:null,

    className:null
  }
}
