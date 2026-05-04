import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const body = await req.json()
  const { vehicle_id, timeline } = body

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const alerts:any[] = []

  timeline.forEach((t:any)=>{

    if(t.priority === "URGENT"){
      alerts.push({
        vehicle_id,
        message: `${t.part} requires immediate attention`,
        priority: "high"
      })
    }

    if(t.priority === "SOON"){
      alerts.push({
        vehicle_id,
        message: `${t.part} due soon`,
        priority: "medium"
      })
    }

  })

  await supabase.from("maintenance_notifications").insert(alerts)

  return NextResponse.json({ success:true })
}