// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\dashboard\dashboardApi.ts
// Timestamp: 15 May 2026 15:20 Sydney
// ====================================================================

export async function fetchDashboardStatus() {

  try {

    const response =
      await fetch(
        "/api/operations/executive-status"
      )

    const data =
      await response.json()

    return data.executive

  } catch {

    return {

      operational: false,

      distributedNodes: 0,

      runtimeRequests: 0,

      runtimeErrors: 0,

      defenderModels: 0,

      suppliers: 0,

      supplierParts: 0,

      pricingEvents: 0
    }
  }
}