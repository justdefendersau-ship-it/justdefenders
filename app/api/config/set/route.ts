import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase
    .from("system_config")
    .upsert({
      key: body.key,
      value: body.value
    })

  return NextResponse.json({ success:true })
}
