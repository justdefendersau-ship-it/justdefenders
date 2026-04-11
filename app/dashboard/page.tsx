// JustDefenders ©
// File: /app/dashboard/page.tsx
// Timestamp: 30 March 2026 00:35 (Sydney)
// PURPOSE: DASHBOARD WITH MARKET INTELLIGENCE (REPLACES PARTS PANEL)

import FleetHealth from "@/components/dashboard/FleetHealth";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import QuickActions from "@/components/dashboard/QuickActions";
import MyVehicles from "@/components/dashboard/MyVehicles";
import RecentActivity from "@/components/dashboard/RecentActivity";
import MarketIntel from "@/components/dashboard/MarketIntel";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">
        Command Center
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* ========================= */}
        {/* ROW 1 */}
        {/* ========================= */}

        <div className="bg-white shadow rounded-xl p-4">
          <FleetHealth />
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <AlertsPanel />
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <MyVehicles />
        </div>

        {/* ========================= */}
        {/* ROW 2 */}
        {/* ========================= */}

        <div className="bg-white shadow rounded-xl p-4 col-span-2">
          <RecentActivity />
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <MarketIntel />
        </div>

        {/* ========================= */}
        {/* ROW 3 */}
        {/* ========================= */}

        <div className="bg-white shadow rounded-xl p-4 col-span-3">
          <QuickActions />
        </div>

      </div>
    </div>
  );
}