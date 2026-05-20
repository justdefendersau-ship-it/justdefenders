import crypto from "crypto"

// =====================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\tracking.ts
// Timestamp: 2026-05-07 06:30
// Purpose:
// - Generate persistent affiliate tracking IDs
// =====================================================

export function generateTrackingId(){

  return crypto.randomUUID()
}
