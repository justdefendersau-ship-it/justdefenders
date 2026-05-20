import { NextResponse } from "next/server"
import { resetSettings } from "../../../../lib/settings"

// =====================================================
// JustDefenders ©
// Reset system state
// =====================================================

export async function POST(){

  resetSettings()

  return NextResponse.json({ success:true })
}