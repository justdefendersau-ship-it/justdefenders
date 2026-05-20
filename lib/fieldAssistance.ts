/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\fieldAssistance.ts

   Timestamp:
   2026-05-07 18:00

   Purpose:
   - Field assistance intelligence
   - Touring support
===================================================== */

// =====================================================
// GET FIELD ADVICE
// =====================================================

export function getFieldAdvice(

  alerts:any[]

){

  const advice:any[] = []

  alerts.forEach((a)=>{

    if(

      a.title.includes("Cooling")

    ){

      advice.push({

        category:"field",

        title:
          "Remote cooling system protocol",

        guidance:
          "Reduce speed, minimise load, inspect hoses and coolant immediately."
      })
    }

    if(

      a.title.includes("battery")

    ){

      advice.push({

        category:"field",

        title:
          "Battery preservation guidance",

        guidance:
          "Reduce accessory usage and inspect alternator output."
      })
    }
  })

  return advice
}
