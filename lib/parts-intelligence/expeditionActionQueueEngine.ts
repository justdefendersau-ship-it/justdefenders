/* =====================================================
   JustDefenders ©
===================================================== */

import {

  RecommendationContract

}
from "../contracts/recommendation"

import {

  EngineResponse

}
from "../contracts/engineResponse"

export function getExpeditionActionQueue(

  route:string,
  vehicle:string

): EngineResponse<RecommendationContract> {

  const data:
    RecommendationContract[] = []

  if(
    route === "CSR"
  ){

    data.push({

      id:"ACTION-001",

      category:"action",

      severity:"critical",

      confidence:0.95,

      title:
        "Replace cooling hoses before departure",

      summary:
        "Critical expedition preparation action",

      operationalImpact:
        "Overheating risk under remote load",

      reasoning:[

        "High remote heat exposure",
        "Known cooling fatigue patterns",
        "Recovery difficulty elevated"

      ],

      recommendations:[

        "Replace hoses",
        "Carry spare hose kit"

      ],

      linkedParts:[

        "PCH119890"

      ],

      expeditionRoutes:[

        route

      ],

      vehicleCompatibility:[

        vehicle

      ],

      carrySpareRecommended:true,

      recommendationType:"required",

      operationalPriority:1
    })
  }

  return {

    success:true,

    generatedAt:
      new Date().toISOString(),

    engineVersion:"1.0.0",

    confidence:0.94,

    data,

    metadata:{

      route,
      vehicle
    }
  }
}
