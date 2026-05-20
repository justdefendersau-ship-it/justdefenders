/* =====================================================
   JustDefenders ©
   File:
   /lib/services/operationalAIInferenceGateway.ts

   Timestamp:
   14 May 2026 04:15 (Sydney)

   PURPOSE:
   Operational AI inference gateway
===================================================== */

import axios
from "axios"

export async function runAIInference(

  telemetry:any

){

  try{

    const response =
    await axios.post(

      "/api/threat-events",

      telemetry
    )

    return {

      success:true,

      result:response.data
    }

  }catch(error){

    return {

      success:false,

      error
    }
  }
}
