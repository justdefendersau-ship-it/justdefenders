/* =====================================================
   JustDefenders ©
   File:
   /server/security/enterpriseSecretsVault.ts

   Timestamp:
   14 May 2026 10:15 (Sydney)

   PURPOSE:
   Enterprise secrets + environment vault
===================================================== */

import dotenv
from "dotenv"

dotenv.config()

export const enterpriseVault = {

  runtimeSecret:
  process.env.RUNTIME_SECRET ||
  "JUSTDEFENDERS_RUNTIME_SECRET",

  federationKey:
  process.env.FEDERATION_KEY ||
  "JUSTDEFENDERS_FEDERATION_KEY",

  analyticsKey:
  process.env.ANALYTICS_KEY ||
  "JUSTDEFENDERS_ANALYTICS_KEY"
}
