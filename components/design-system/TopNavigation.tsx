"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\design-system\TopNavigation.tsx
//
// Timestamp:
// 2026-05-08 10:30
//
// Purpose:
// - Unified top navigation
// =====================================================

export default function TopNavigation(){

  const items = [

    {

      label:"Garage",

      href:"/garage"
    },

    {

      label:"Parts",

      href:"/parts"
    },

    {

      label:"Command Centre",

      href:"/command-centre"
    },

    {

      label:"Expedition",

      href:"/expedition"
    },

    {

      label:"Suppliers",

      href:"/supplier-operations"
    }
  ]

  return (

    <div style={{

      width:"100%",

      background:"#fff",

      borderBottom:"1px solid #ddd",

      padding:"14px 20px",

      display:"flex",

      gap:"20px",

      position:"sticky",

      top:0,

      zIndex:1000
    }}>

      {items.map(
        (item,idx)=>(

          <a
            key={idx}

            href={item.href}

            style={{

              textDecoration:"none",

              fontWeight:"bold",

              color:"#172b4d"
            }}
          >

            {item.label}

          </a>
        )
      )}

    </div>
  )
}
