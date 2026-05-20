/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalButton.tsx
 *
 * Timestamp:
 * 17 May 2026 14:45 Sydney
 *
 * PURPOSE:
 * Tactical Operational Button System
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import type {
  ComponentPropsWithoutRef,
  ReactNode
} from "react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TYPES
// ============================================================

interface TacticalButtonProps
extends ComponentPropsWithoutRef<"button"> {

  children: ReactNode

  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"

  tactical?:
    boolean

  loading?:
    boolean

  fullWidth?:
    boolean
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalButton({

  children,

  variant = "primary",

  tactical = false,

  loading = false,

  fullWidth = false,

  className = "",

  onDrag,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,

  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,

  ...props

}: TacticalButtonProps){

  // ==========================================================
  // VARIANT STYLES
  // ==========================================================

  const variantStyles = {

    primary: {

      background:
        tacticalColors.accentBlue,

      color:
        tacticalColors.textPrimary,

      border:
        `1px solid ${tacticalColors.border}`
    },

    secondary: {

      background:
        tacticalColors.surfaceElevated,

      color:
        tacticalColors.textPrimary,

      border:
        `1px solid ${tacticalColors.border}`
    },

    danger: {

      background:
        tacticalColors.danger,

      color:
        "#FFFFFF",

      border:
        `1px solid ${tacticalColors.danger}`
    },

    ghost: {

      background:
        "transparent",

      color:
        tacticalColors.textPrimary,

      border:
        `1px solid ${tacticalColors.border}`
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <motion.button

      whileHover={{
        y: -2,
        scale: 1.01
      }}

      whileTap={{
        scale: 0.98
      }}

      transition={{
        duration: 0.15
      }}

      className={`
        relative
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-5
        py-3
        text-sm
        font-semibold
        tracking-wide
        transition-all
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}

      style={{

        ...variantStyles[variant],

        boxShadow:
          tactical
            ? "0 0 20px rgba(59,130,246,0.22)"
            : undefined
      }}

      disabled={
        loading || props.disabled
      }

      {...props}
    >

      {/* ==================================================== */}
      {/* LOADING */}
      {/* ==================================================== */}

      {loading && (

        <div
          className="
            h-4
            w-4
            animate-spin
            rounded-full
            border-2
            border-white/20
            border-t-white
          "
        />
      )}

      {/* ==================================================== */}
      {/* CONTENT */}
      {/* ==================================================== */}

      <span>
        {children}
      </span>

    </motion.button>
  )
}