/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\core\DashboardPanelHeader.tsx
 *
 * Timestamp:
 * 26 June 2026 11:38 Sydney
 *
 * PURPOSE:
 * Standard dashboard panel header component.
 *
 * Milestone:
 * M3.1 Dashboard Framework
 *
 * DESCRIPTION:
 * Provides a consistent header for all dashboard panels
 * across the JustDefenders platform.
 *
 * This component is intentionally business-agnostic and
 * is designed for reuse by:
 *
 *   • Garage
 *   • Parts
 *   • Suppliers
 *   • Command Centre
 *   • Expedition
 *   • Administration
 *
 * Future Enhancements:
 *   • Refresh action
 *   • Context menu
 *   • Collapse support
 *   • Drag/drop dashboard support
 * ============================================================
 */

"use client"

import { ReactNode } from "react"

export interface DashboardPanelHeaderProps {

  title: string

  subtitle?: string

  icon?: ReactNode

  actions?: ReactNode

}

export default function DashboardPanelHeader({

  title,

  subtitle,

  icon,

  actions

}: DashboardPanelHeaderProps) {

  return (

    <div
      className="
        flex
        items-start
        justify-between
        gap-4
        border-b
        border-neutral-800
        pb-4
      "
    >

      <div
        className="
          flex
          items-start
          gap-3
          min-w-0
        "
      >

        {icon && (

          <div
            className="
              mt-0.5
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-neutral-800
              text-neutral-200
              shrink-0
            "
          >

            {icon}

          </div>

        )}

        <div className="min-w-0">

          <h2
            className="
              text-lg
              font-semibold
              text-white
              truncate
            "
          >

            {title}

          </h2>

          {subtitle && (

            <p
              className="
                mt-1
                text-sm
                text-neutral-400
                leading-5
              "
            >

              {subtitle}

            </p>

          )}

        </div>

      </div>

      {actions && (

        <div
          className="
            flex
            items-center
            gap-2
            shrink-0
          "
        >

          {actions}

        </div>

      )}

    </div>

  )

}