import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders Â©
// File: C:\dev\justdefenders\frontend\lib\getUser.ts
// Timestamp: 2026-05-06 12:10
// =====================================================

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getUser(){
  const { data } = await supabase.auth.getUser()
  return data?.user || null
}