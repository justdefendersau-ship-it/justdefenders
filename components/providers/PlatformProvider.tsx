/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\components\providers\PlatformProvider.tsx
 *
 * Timestamp:
 * 27 June 2026 11:30 Sydney
 *
 * PURPOSE:
 * Canonical application provider composition root.
 *
 * M3.7.2 – Platform Runtime Integration
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Composes all runtime providers required by the
 * JustDefenders platform.
 *
 * The PlatformProvider becomes the single entry point
 * for application state and shared runtime services.
 *
 * ============================================================
 */

"use client"

import type { ReactNode } from "react"

import {

    DigitalTwinProvider

} from "@/contexts/DigitalTwinContext"

interface PlatformProviderProps {

    children: ReactNode

}

export default function PlatformProvider({

    children

}: PlatformProviderProps) {

    return (

        <DigitalTwinProvider>

            {children}

        </DigitalTwinProvider>

    )

}