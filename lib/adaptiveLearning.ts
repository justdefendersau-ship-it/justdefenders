/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\adaptiveLearning.ts

   Timestamp:
   2026-05-07 16:00

   Purpose:
   - Adaptive learning intelligence
   - Feedback loops
   - Reinforcement learning foundation
===================================================== */

import { createClient }
from "@supabase/supabase-js"

// =====================================================
// SUPABASE
// =====================================================

const supabase =
  createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL || "",

    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  )

// =====================================================
// STORE OUTCOME
// =====================================================

export async function storeRepairOutcome({

  vin,

  symptom,

  diagnosis,

  repair,

  supplier,

  successful,

  feedback

}:any){

  try {

    const {

      error

    } = await supabase

      .from("repair_outcomes")

      .insert({

        vin,

        symptom,

        diagnosis,

        repair,

        supplier,

        successful,

        feedback,

        created_at:
          new Date().toISOString()
      })

    if(error){

      console.error(
        "OUTCOME STORE ERROR:",
        error
      )
    }

  } catch(err){

    console.error(
      "OUTCOME FAILURE:",
      err
    )
  }
}

// =====================================================
// LEARNED CONFIDENCE
// =====================================================

export async function getLearnedConfidence(

  diagnosis:string

){

  try {

    const {

      data,

      error

    } = await supabase

      .from("repair_outcomes")

      .select("*")

      .eq(
        "diagnosis",
        diagnosis
      )

    if(error){

      console.error(error)

      return 0.50
    }

    const total =
      data?.length || 0

    if(total === 0){

      return 0.50
    }

    const successful =
      data.filter(

        (d:any)=>

          d.successful
      ).length

    return Number(

      (successful / total)
        .toFixed(2)
    )

  } catch(err){

    console.error(err)

    return 0.50
  }
}

// =====================================================
// SUPPLIER INTELLIGENCE
// =====================================================

export async function getSupplierPerformance(

  supplier:string

){

  try {

    const {

      data,

      error

    } = await supabase

      .from("repair_outcomes")

      .select("*")

      .eq(
        "supplier",
        supplier
      )

    if(error){

      console.error(error)

      return {
        score:0.50
      }
    }

    const total =
      data?.length || 0

    if(total === 0){

      return {
        score:0.50
      }
    }

    const successful =
      data.filter(

        (d:any)=>

          d.successful
      ).length

    return {

      score:Number(

        (successful / total)
          .toFixed(2)
      ),

      total
    }

  } catch(err){

    console.error(err)

    return {
      score:0.50
    }
  }
}
