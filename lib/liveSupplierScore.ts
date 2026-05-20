import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders
// Live supplier scoring engine
// =====================================================

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getLiveSupplierScore(
  supplier: string,
  price: number
){

  try {

    const { data } = await supabase
      .from("supplier_metrics")
      .select("*")
      .eq("supplier", supplier)
      .single()

    // =====================================================
    // DEFAULT SCORE (cold start)
    // =====================================================

    if(!data){

      return {
        score: 0.5,
        clicks: 0,
        conversions: 0,
        revenue: 0
      }
    }

    const clicks = Number(data.clicks || 0)
    const conversions = Number(data.conversions || 0)
    const revenue = Number(data.revenue || 0)

    // =====================================================
    // DERIVED METRICS
    // =====================================================

    const ctr =
      clicks > 0
        ? conversions / clicks
        : 0

    const rpc =
      clicks > 0
        ? revenue / clicks
        : 0

    // cheaper parts slightly boosted
    const priceScore =
      price > 0
        ? 1 / price
        : 0

    // =====================================================
    // FINAL WEIGHTED SCORE
    // =====================================================

    const score =
      ctr * 0.4 +
      rpc * 0.4 +
      priceScore * 0.2

    return {
      score,
      clicks,
      conversions,
      revenue,
      ctr,
      rpc
    }

  } catch (err) {

    console.error("LIVE SCORE ERROR:", err)

    return {
      score: 0.5,
      clicks: 0,
      conversions: 0,
      revenue: 0
    }
  }
}