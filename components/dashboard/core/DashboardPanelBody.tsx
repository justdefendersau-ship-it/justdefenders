/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\core\DashboardPanelBody.tsx
 *
 * Timestamp:
 * 26 June 2026 12:05 Sydney
 *
 * PURPOSE:
 * Standard dashboard panel body component.
 *
 * Milestone:
 * M3.1 Dashboard Framework
 *
 * DESCRIPTION:
 * Provides a consistent content container for all
 * dashboard panels throughout the JustDefenders platform.
 *
 * This component intentionally contains no business
 * logic and is reusable across:
 *
 *   • Garage
 *   • Parts
 *   • Suppliers
 *   • Command Centre
 *   • Expedition
 *   • Administration
 *
 * Future Enhancements:
 *   • Scroll locking
 *   • Automatic empty state rendering
 *   • Skeleton loading integration
 *   • Virtualised content support
 * ============================================================
 */

"use client"

import { ReactNode } from "react"

export interface DashboardPanelBodyProps {

  children: ReactNode

  className?: string

  scrollable?: boolean

}

export default function DashboardPanelBody({

  children,

  className = "",

  scrollable = false

}: DashboardPanelBodyProps) {

  return (

    <div

      className={`

        flex
        flex-1
        flex-col

        pt-5

        ${scrollable ? "overflow-y-auto" : ""}

        ${className}

      `}

    >

      {children}

    </div>

  )

}