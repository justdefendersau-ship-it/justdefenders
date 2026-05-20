/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\garage-core\garageCoreEngine.ts

   Timestamp:
   2026-05-10 13:15

   Purpose:
   - Garage operational intelligence
   - Maintenance forecasting
   - Ownership intelligence
===================================================== */

// =====================================================
// VEHICLE PROFILE
// =====================================================

export function getVehicleOperationalProfile(){

  return {

    vin:
      "SALLDHA87XA176069",

    model:
      "Land Rover Defender 110",

    engine:
      "300Tdi",

    year:
      "1999",

    odometer:
      "412,870 km",

    registration:
      "DEF110",

    registrationExpiry:
      "2026-07-21"
  }
}

// =====================================================
// OWNERSHIP COSTS
// =====================================================

export function getOwnershipOperationalCosts(){

  return {

    insurance:1450,

    registration:1042,

    roadside:198,

    servicing:4860,

    fuelEstimate:9120
  }
}

// =====================================================
// UPCOMING SERVICE
// =====================================================

export function getUpcomingOperationalServices(){

  return [

    {

      service:
        "420,000 km Major Service",

      due:
        "7,130 km",

      priority:
        "HIGH",

      includes:[

        "Engine oil",

        "Fuel filter",

        "Cooling system inspection",

        "Wheel bearing inspection",

        "Transfer case oil"
      ]
    },

    {

      service:
        "Cooling Hose Replacement Review",

      due:
        "3 months",

      priority:
        "MEDIUM",

      includes:[

        "Upper radiator hose",

        "Lower radiator hose",

        "Heater hoses"
      ]
    }
  ]
}

// =====================================================
// MAINTENANCE TIMELINE
// =====================================================

export function getOperationalMaintenanceTimeline(){

  return [

    {

      date:
        "2025-08-14",

      work:
        "Water pump replacement",

      supplier:
        "MR Automotive"
    },

    {

      date:
        "2025-07-02",

      work:
        "Full cooling hose replacement",

      supplier:
        "British Off Road"
    },

    {

      date:
        "2025-03-16",

      work:
        "Front wheel bearings",

      supplier:
        "Rovacraft"
    }
  ]
}

// =====================================================
// EXPIRY INTELLIGENCE
// =====================================================

export function getOperationalExpiryIntelligence(){

  return [

    {

      item:
        "Insurance",

      provider:
        "Shannons",

      expiry:
        "2026-08-02"
    },

    {

      item:
        "Roadside Assistance",

      provider:
        "NRMA",

      expiry:
        "2026-11-18"
    },

    {

      item:
        "Battery Warranty",

      provider:
        "Battery World",

      expiry:
        "2028-04-12"
    }
  ]
}
