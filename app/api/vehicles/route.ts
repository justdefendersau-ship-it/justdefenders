import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  try {

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // -------------------------------
    // GET VEHICLE CONFIGS
    // -------------------------------
    const { data, error } = await supabase
      .from("vehicle_configurations")
      .select("model, engine, year")

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message
      })
    }

    return NextResponse.json({
      success: true,
      data: data || []
    })

  } catch (err: any) {

    return NextResponse.json({
      success: false,
      error: err.message
    })
  }
}