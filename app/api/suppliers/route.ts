import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function parseBool(v:any){
  return v === "true"
}

export async function POST(req:Request){

  try{

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // --------------------------------------------------
    // LOAD CONFIG
    // --------------------------------------------------
    const { data: configRows } = await supabase
      .from("system_config")
      .select("*")

    const config:any = {}
    configRows?.forEach(c=> config[c.key] = c.value)

    const banditEnabled = parseBool(config.bandit_enabled)
    const dynamicPricing = parseBool(config.dynamic_pricing_enabled)
    const marketplaceEnabled = parseBool(config.marketplace_enabled)

    const maxIncrease = parseFloat(config.max_price_increase_pct || "0.3")
    const minReliability = parseFloat(config.min_supplier_reliability || "0.6")

    // --------------------------------------------------
    // GET DATA
    // --------------------------------------------------
    const { data: suppliers } = await supabase
      .from("part_suppliers")
      .select("*")

    const { data: perf } = await supabase
      .from("supplier_performance")
      .select("*")

    const grouped:any = {}

    suppliers?.forEach(sp => {

      const reliability = perf?.find(p=>p.supplier_name===sp.supplier_name)?.success_rate || 0.8

      // --------------------------------------------------
      // SAFETY: FILTER BAD SUPPLIERS
      // --------------------------------------------------
      if(reliability < minReliability){
        return
      }

      let price = sp.price

      // --------------------------------------------------
      // SAFETY: DYNAMIC PRICING WITH CAP
      // --------------------------------------------------
      if(dynamicPricing){

        const cost = sp.cost_price || sp.price * 0.7
        let margin = 0.25

        const maxPrice = sp.price * (1 + maxIncrease)

        price = cost * (1 + margin)

        if(price > maxPrice){
          price = maxPrice
        }
      }

      if(!grouped[sp.part_number]){
        grouped[sp.part_number] = []
      }

      grouped[sp.part_number].push({
        supplier: sp.supplier_name,
        price,
        reliability,
        url: sp.url
      })
    })

    const results = Object.keys(grouped).map(part => {

      const options = grouped[part].sort((a:any,b:any)=>a.price - b.price)

      return {
        part,
        best: options[0],
        options
      }
    })

    return NextResponse.json({
      success:true,
      flags:{
        banditEnabled,
        dynamicPricing,
        marketplaceEnabled
      },
      results
    })

  }catch(e:any){

    return NextResponse.json({
      success:false,
      error:e.message
    })
  }
}
