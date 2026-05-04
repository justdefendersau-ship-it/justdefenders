// =====================================================
// JustDefenders ©
// Send push notifications to all subscribers
// =====================================================

import webpush from "web-push"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
)

export async function POST(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("push_subscriptions")
    .select("*")

  const payload = JSON.stringify({
    title: "JustDefenders Alert",
    body: "You have pending vehicle maintenance"
  })

  for(const row of data || []){
    try {
      await webpush.sendNotification(row.subscription, payload)
    } catch(err){
      console.error("Push error:", err)
    }
  }

  return NextResponse.json({ success:true })
}