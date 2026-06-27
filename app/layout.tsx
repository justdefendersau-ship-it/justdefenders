// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\layout.tsx
//
// Timestamp:
// 27 June 2026 11:45 Sydney
//
// PURPOSE:
// Root application layout.
//
// M3.7.3 – Platform Runtime Integration
//
// CHANGE SUMMARY
// --------------------------------------------------------------------
// Introduces the PlatformProvider as the canonical runtime
// composition root for the JustDefenders application.
//
// All pages now share the same application runtime,
// including the Digital Twin context.
//
// ====================================================================

import "./globals.css"

import type { ReactNode } from "react"

import PlatformProvider from "@/components/providers/PlatformProvider"

export default function RootLayout({

  children

}: {

  children: ReactNode

}) {

  return (

    <html lang="en">

      <body>

        <PlatformProvider>

          {children}

        </PlatformProvider>

      </body>

    </html>

  )

}