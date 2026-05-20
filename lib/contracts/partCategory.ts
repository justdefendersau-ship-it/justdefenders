/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/partCategory.ts

   Timestamp:
   11 May 2026 11:55 (Sydney)

   PURPOSE:
   Structured category hierarchy contract
===================================================== */

export interface PartCategoryContract {

  id: string

  category: string

  subcategories?: string[]

  operationalPriority?:

    | "critical"
    | "recommended"
    | "optional"

  touringRelevant?: boolean

  notes?: string[]
}
