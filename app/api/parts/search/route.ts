// JustDefenders © API - Parts Search (Supabase)
// Timestamp: 30 April 2026

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('parts_pricing')
     .select(`
  price,
  currency,
  availability,
  created_at,
  parts (
    part_number
  ),
  suppliers (
    name
  )
`)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    return NextResponse.json(data)
  } catch (err: any) {
    console.error('API ERROR:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}