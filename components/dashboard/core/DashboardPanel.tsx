/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\core\DashboardPanel.tsx
 *
 * Timestamp:
 * 26 June 2026 12:18 Sydney
 *
 * PURPOSE:
 * Standard dashboard panel container.
 *
 * Milestone:
 * M3.1 Dashboard Framework
 *
 * DESCRIPTION:
 * Provides the standard dashboard panel used throughout
 * the JustDefenders platform.
 *
 * This component composes:
 *
 *   • DashboardPanelHeader
 *   • DashboardPanelBody
 *
 * The panel intentionally contains no business logic
 * and may be reused by:
 *
 *   • Garage
 *   • Parts
 *   • Suppliers
 *   • Command Centre
 *   • Expedition
 *   • Administration
 *
 * Future Enhancements:
 *
 *   • Footer support
 *   • Loading state
 *   • Empty state
 *   • Error state
 *   • Refresh callback
 *   • Context menu
 *   • Drag / Drop
 *   • User customisation
 *
 * ============================================================
 */

"use client"

import { ReactNode } from "react"

import DashboardPanelHeader from "./DashboardPanelHeader"
import DashboardPanelBody from "./DashboardPanelBody"

export interface DashboardPanelProps {

  title: string

  subtitle?: string

  icon?: ReactNode

  actions?: ReactNode

  children: ReactNode

  className?: string

  bodyClassName?: string

  scrollable?: boolean

}

export default function DashboardPanel({

  title,

  subtitle,

  icon,

  actions,

  children,

  className = "",

  bodyClassName = "",

  scrollable = false

}: DashboardPanelProps) {

  return (

    <section

      className={`

        flex
        flex-col

        rounded-xl

        border

        border-neutral-800

        bg-neutral-900

        shadow-lg

        p-6

        ${className}

      `}

    >

      <DashboardPanelHeader

        title={title}

        subtitle={subtitle}

        icon={icon}

        actions={actions}

      />

      <DashboardPanelBody

        className={bodyClassName}

        scrollable={scrollable}

      >

        {children}

      </DashboardPanelBody>

    </section>

  )

}