/* ====================================================================
 * JustDefenders ©
 * File: C:\dev\justdefenders\frontend\lib\security\securityFoundation.ts
 * Timestamp: 12 August 2026 — Sydney
 *
 * WP-003F.1 — Security Foundation
 *
 * Purpose:
 *   Provide the common, dependency-light security foundation shared by
 *   subsequent platform security modules.
 *
 * Authorised responsibilities:
 *   - Shared security configuration
 *   - Security constants
 *   - Secure default behaviours
 *   - Standard security responses
 *   - Security error classification
 *   - Security utility functions
 *   - Common validation routines
 *   - Shared middleware decision helpers
 *
 * Deferred responsibilities:
 *   - Authentication
 *   - Authorisation
 *   - Environment validation
 *   - HTTP security enforcement
 *   - Security diagnostics
 *   - Persistence
 *   - Database access
 *   - Supabase access
 *   - Application-specific request handling
 *
 * This module contains pure, dependency-light primitives only.
 * ==================================================================== */

export const SECURITY_DEFAULTS = Object.freeze({
  maxRequestBodyBytes: 1024 * 1024,
  maxSecurityFailureMessageLength: 256,
  defaultClassification: "internal"
} as const)

export const SECURITY_LIMITS = Object.freeze({
  maxRequestBodyBytes: SECURITY_DEFAULTS.maxRequestBodyBytes,
  maxSecurityFailureMessageLength:
    SECURITY_DEFAULTS.maxSecurityFailureMessageLength
} as const)

export type SecurityClassification =
  | "authentication"
  | "authorization"
  | "validation"
  | "rate-limit"
  | "internal"

export type SecurityResponse = Readonly<{
  success: false
  error: string
  classification: SecurityClassification
}>

export type SecurityValidationResult = Readonly<{
  valid: boolean
  reason?: string
}>

export type SecurityMiddlewareDecision = Readonly<{
  allowed: boolean
  classification?: SecurityClassification
  reason?: string
}>

export function classifySecurityFailure(
  error: unknown
): SecurityClassification {
  if (
    error instanceof Error &&
    /authenticat|unauthori[sz]|invalid token|missing token|token expired/i.test(
      error.message
    )
  ) {
    return "authentication"
  }

  if (
    error instanceof Error &&
    /forbidden|authori[sz]ation|access denied|permission/i.test(
      error.message
    )
  ) {
    return "authorization"
  }

  if (
    error instanceof Error &&
    /validation|invalid input|invalid request|invalid json/i.test(
      error.message
    )
  ) {
    return "validation"
  }

  if (
    error instanceof Error &&
    /rate.?limit|too many requests|throttl/i.test(
      error.message
    )
  ) {
    return "rate-limit"
  }

  return SECURITY_DEFAULTS.defaultClassification
}

export function createSecurityFailureResponse(
  error: unknown,
  message?: string
): SecurityResponse {
  const classification = classifySecurityFailure(error)

  const fallbackMessage =
    classification === SECURITY_DEFAULTS.defaultClassification
      ? "Security operation failed"
      : "Security operation rejected"

  const selectedMessage =
    typeof message === "string" && message.trim().length > 0
      ? message.trim()
      : fallbackMessage

  return Object.freeze({
    success: false,
    error: selectedMessage.slice(
      0,
      SECURITY_LIMITS.maxSecurityFailureMessageLength
    ),
    classification
  })
}

export function validateSecurityFailureMessage(
  message: unknown
): SecurityValidationResult {
  if (typeof message !== "string") {
    return Object.freeze({
      valid: false,
      reason: "Security failure message must be a string"
    })
  }

  if (message.trim().length === 0) {
    return Object.freeze({
      valid: false,
      reason: "Security failure message must not be empty"
    })
  }

  if (
    message.length >
    SECURITY_LIMITS.maxSecurityFailureMessageLength
  ) {
    return Object.freeze({
      valid: false,
      reason: "Security failure message exceeds the configured limit"
    })
  }

  return Object.freeze({
    valid: true
  })
}

export function validateRequestBodySize(
  sizeBytes: unknown
): SecurityValidationResult {
  if (
    typeof sizeBytes !== "number" ||
    !Number.isFinite(sizeBytes) ||
    sizeBytes < 0
  ) {
    return Object.freeze({
      valid: false,
      reason: "Request body size must be a non-negative finite number"
    })
  }

  if (sizeBytes > SECURITY_LIMITS.maxRequestBodyBytes) {
    return Object.freeze({
      valid: false,
      reason: "Request body exceeds the configured security limit"
    })
  }

  return Object.freeze({
    valid: true
  })
}

export function validateRequiredSecurityValue(
  value: unknown
): SecurityValidationResult {
  if (typeof value !== "string") {
    return Object.freeze({
      valid: false,
      reason: "Required security value must be a string"
    })
  }

  if (value.trim().length === 0) {
    return Object.freeze({
      valid: false,
      reason: "Required security value must not be empty"
    })
  }

  return Object.freeze({
    valid: true
  })
}

export function createSecurityMiddlewareDecision(
  allowed: boolean,
  classification?: SecurityClassification,
  reason?: string
): SecurityMiddlewareDecision {
  const decision: {
    allowed: boolean
    classification?: SecurityClassification
    reason?: string
  } = {
    allowed
  }

  if (classification !== undefined) {
    decision.classification = classification
  }

  if (reason !== undefined && reason.trim().length > 0) {
    decision.reason = reason.slice(
      0,
      SECURITY_LIMITS.maxSecurityFailureMessageLength
    )
  }

  return Object.freeze(decision)
}