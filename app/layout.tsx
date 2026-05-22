/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\layout.tsx
 *
 * Timestamp:
 * 21 May 2026 15:44 Sydney
 *
 * PURPOSE:
 * Root Layout
 *
 * STRATEGY:
 * PASS 23 — Production Readiness Layer
 *
 * ============================================================
 */

import type {
  Metadata
} from "next"

import "./globals.css"

import ErrorBoundary
from "@/components/system/ErrorBoundary"

import {
  AuthProvider
} from "@/contexts/AuthContext"

import {
  ProcurementProvider
} from "@/contexts/ProcurementContext"

import {
  ProcurementListProvider
} from "@/contexts/ProcurementListContext"

import {
  validateEnv
} from "@/lib/config/validateEnv"

// ============================================================
// VALIDATE ENV
// ============================================================

validateEnv()

// ============================================================
// METADATA
// ============================================================

export const metadata:
Metadata = {

  title:
    "JustDefenders©",

  description:
    "Operational Procurement Intelligence Platform"
}

// ============================================================
// ROOT LAYOUT
// ============================================================

export default function RootLayout({

  children

}: Readonly<{

  children:
    React.ReactNode

}>){

  return (

    <html lang="en">

      <body
        className="
          bg-[#020617]
          text-white
          antialiased
        "
      >

        <ErrorBoundary>

          <AuthProvider>

            <ProcurementListProvider>

              <ProcurementProvider>

                {children}

              </ProcurementProvider>

            </ProcurementListProvider>

          </AuthProvider>

        </ErrorBoundary>

      </body>

    </html>
  )
}