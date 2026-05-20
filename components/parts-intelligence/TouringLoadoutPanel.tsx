// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\parts-intelligence\TouringLoadoutPanel.tsx
//
// Timestamp:
// 2026-05-10 23:35 (Sydney)
//
// PURPOSE:
// Touring Loadout Intelligence
// =====================================================

"use client";

import React from "react";

// =====================================================
// TOURING PROFILES
// =====================================================

const touringProfiles:any = {

  // ===================================================
  // WEEKEND TOURING
  // ===================================================

  "Weekend Touring": {

    operationalFocus: [

      "Cooling hoses",
      "General servicing",
      "Tyre inspection",
      "Battery health"

    ],

    recommendations: [

      "Carry basic recovery kit",
      "Carry spare belts",
      "Inspect cooling system",
      "Verify tyre pressures"

    ],

    routeIntelligence: [

      "Water: 20L Recommended",
      "Fuel: Standard tank acceptable",
      "Recovery: Basic recovery kit",
      "Communications: Mobile coverage assumed"

    ]
  },

  // ===================================================
  // HIGH COUNTRY
  // ===================================================

  "High Country": {

    operationalFocus: [

      "Tyre sidewalls",
      "Recovery points",
      "Suspension articulation",
      "Steering components"

    ],

    recommendations: [

      "Carry tyre repair kit",
      "Inspect recovery hardware",
      "Verify suspension condition",
      "Carry steering fluid"

    ],

    routeIntelligence: [

      "Water: 40L Recommended",
      "Fuel: Additional reserve advised",
      "Recovery: Winch recommended",
      "Communications: UHF preferred"

    ]
  },

  // ===================================================
  // CAPE YORK
  // ===================================================

  "Cape York": {

    operationalFocus: [

      "Wheel bearings",
      "Hub seals",
      "Breathers",
      "Cooling system"

    ],

    recommendations: [

      "Carry wheel bearing kit",
      "Carry hub seals",
      "Inspect breathers",
      "Carry cooling redundancy"

    ],

    routeIntelligence: [

      "Water: 60L Recommended",
      "Fuel: Long range recommended",
      "Recovery: Water crossing preparation",
      "Communications: Satellite recommended"

    ]
  },

  // ===================================================
  // CSR
  // ===================================================

  "CSR": {

    operationalFocus: [

      "Cooling hoses",
      "Water pump",
      "Wheel bearings",
      "Drive belts",
      "Fuel filtration",
      "Clutch hydraulics"

    ],

    recommendations: [

      "Carry full cooling hose kit",
      "Carry wheel bearing kits",
      "Carry spare belts",
      "Carry hub seals",
      "Carry engine oil reserve"

    ],

    routeIntelligence: [

      "Water: 80L+ Critical",
      "Fuel: Long range + jerry reserves",
      "Recovery: Full remote recovery loadout",
      "Communications: Satellite mandatory"

    ]
  },

  // ===================================================
  // GUNBARREL
  // ===================================================

  "Gunbarrel": {

    operationalFocus: [

      "Cooling systems",
      "Dust filtration",
      "Tyre integrity",
      "Suspension wear"

    ],

    recommendations: [

      "Carry secondary fuel filtration",
      "Carry spare air filters",
      "Carry tyre repair systems",
      "Inspect suspension hardware"

    ],

    routeIntelligence: [

      "Water: 70L Recommended",
      "Fuel: Long-range mandatory",
      "Recovery: Remote-area recovery essential",
      "Communications: Satellite mandatory"

    ]
  }

};

// =====================================================
// COMPONENT
// =====================================================

export default function TouringLoadoutPanel({

  selectedTouring,
  setSelectedTouring

}:any){

  // ===================================================
  // SAFETY FALLBACK
  // ===================================================

  const profile =

    touringProfiles[selectedTouring]
    ||
    touringProfiles["Weekend Touring"]

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="jd-loadout-shell">

      <div className="jd-loadout-header">

        <div className="jd-loadout-title">

          Touring Loadout Intelligence

        </div>

        <select

          className="jd-select"

          value={selectedTouring}

          onChange={(e)=>
            setSelectedTouring(
              e.target.value
            )
          }

        >

          {Object.keys(
            touringProfiles
          ).map(
            (
              item:string,
              idx:number
            )=>(

              <option
                key={idx}
              >

                {item}

              </option>
            )
          )}

        </select>

      </div>

      <div className="jd-loadout-grid">

        {/* ============================================= */}
        {/* OPERATIONAL FOCUS */}
        {/* ============================================= */}

        <div className="jd-loadout-card">

          <div className="jd-loadout-card-title">

            Operational Focus

          </div>

          <ul className="jd-loadout-list">

            {profile.operationalFocus.map(

              (
                item:string,
                idx:number
              )=>(

                <li key={idx}>

                  {item}

                </li>
              )
            )}

          </ul>

        </div>

        {/* ============================================= */}
        {/* RECOMMENDATIONS */}
        {/* ============================================= */}

        <div className="jd-loadout-card">

          <div className="jd-loadout-card-title">

            Touring Recommendations

          </div>

          <ul className="jd-loadout-list">

            {profile.recommendations.map(

              (
                item:string,
                idx:number
              )=>(

                <li key={idx}>

                  {item}

                </li>
              )
            )}

          </ul>

        </div>

        {/* ============================================= */}
        {/* ROUTE INTELLIGENCE */}
        {/* ============================================= */}

        <div className="jd-loadout-card">

          <div className="jd-loadout-card-title">

            Route Intelligence

          </div>

          <ul className="jd-loadout-list">

            {profile.routeIntelligence.map(

              (
                item:string,
                idx:number
              )=>(

                <li key={idx}>

                  {item}

                </li>
              )
            )}

          </ul>

        </div>

      </div>

    </section>
  )
}