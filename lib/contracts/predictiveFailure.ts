/* =====================================================
   JustDefenders ©
   Predictive Failure Contract
===================================================== */

import {

  OperationalIntelligenceContract

}
from "./operationalIntelligence"

export interface PredictiveFailureContract
extends OperationalIntelligenceContract {

  failureLikelihood: number

  historicalCorrelation?: number

  environmentalFactors?: string[]

  knownFailurePatterns?: string[]

  operationalThresholdKm?: number
}
