import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const body = await req.json()
  const { vehicle_id, timeline } = body

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const inserts:any[] = []

  timeline.forEach((t:any)=>{

    let dueKm = t.km || null

    inserts.push({
      vehicle_id,
      part_number: t.part,
      priority: t.priority,
      due_km: dueKm,
      due_date: null
    })

  })

  await supabase.from("maintenance_schedule").insert(inserts)

  return NextResponse.json({ success:true })
}