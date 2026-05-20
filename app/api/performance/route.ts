import { NextResponse } from "next/server"
import { getStats } from "../../../lib/supplierPerformance"

// =====================================================
// JustDefenders ©
// Performance debug endpoint
// =====================================================

export async function GET(){
  return NextResponse.json(getStats())
}