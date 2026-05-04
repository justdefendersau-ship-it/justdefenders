export const runtime = "nodejs"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

export async function GET() {

  const { data, error } = await supabase
    .from("parts")
    .select("*")
    .limit(5)

  return new Response(JSON.stringify({
    ok: true,
    data,
    error
  }), {
    headers: { "Content-Type": "application/json" }
  })
}
