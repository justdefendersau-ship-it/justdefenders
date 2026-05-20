import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// File: lib/supabaseServer.ts
// Purpose: Server-side Supabase client
// =====================================================

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)