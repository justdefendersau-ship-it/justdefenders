/* =====================================================
   JustDefenders ©
   Recommendation Contract
===================================================== */

import {

  OperationalIntelligenceContract

}
from "./operationalIntelligence"

export interface RecommendationContract
extends OperationalIntelligenceContract {

  recommendationType?:

    | "required"
    | "recommended"
    | "optional"

  recommendationReasoning?: string[]

  routeWeighting?: number

  operationalPriority?: number
}
