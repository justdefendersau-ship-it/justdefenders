"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/operations-map/True3DOperationsMap.tsx

   Timestamp:
   11 May 2026 18:15 (Sydney)

   PURPOSE:
   Advanced 3D globe federation map
===================================================== */

import React
from "react"

import dynamic
from "next/dynamic"

const Globe = dynamic(

  ()=>import("react-globe.gl"),

  {

    ssr:false
  }
)

const points = [

  {

    lat:-33.8688,

    lng:151.2093,

    size:1.2
  },

  {

    lat:1.3521,

    lng:103.8198,

    size:1.1
  },

  {

    lat:25.2048,

    lng:55.2708,

    size:1.4
  }
]

export default function True3DOperationsMap(){

  return (

    <div className="jd-globe-shell">

      <Globe

        globeImageUrl=
        "//unpkg.com/three-globe/example/img/earth-dark.jpg"

        backgroundColor=
        "rgba(0,0,0,0)"

        pointsData={points}

        pointAltitude="size"

        pointColor={()=>

          "#00ffb4"
        }

      />

    </div>
  )
}
