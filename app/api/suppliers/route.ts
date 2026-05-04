// =====================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\suppliers\route.ts
// Timestamp: 2026-05-05 00:30
// Purpose: Full engine with OEM + predictive maintenance + driving habits
// =====================================================

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {

    const body = await req.json()
    const { model, engine, year, vehicle_id, km } = body

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const currentYear = new Date().getFullYear()
    const vehicleAge = currentYear - Number(year)

    // -------------------------------
    // 1. COMPATIBILITY
    // -------------------------------
    const { data: allParts } = await supabase
      .from("vin_part_compatibility")
      .select("*")

    if (!allParts) {
      return NextResponse.json({ success:true, results:[] })
    }

    const matchedParts = allParts.filter(p =>
      (p.model || "").toUpperCase() === model.toUpperCase() &&
      (p.engine || "").toUpperCase().includes(engine.toUpperCase()) &&
      Number(p.year) === Number(year)
    )

    if (matchedParts.length === 0) {
      return NextResponse.json({ success:true, results:[] })
    }

    const baseParts = matchedParts.map(p => p.part_number)

    // -------------------------------
    // 2. CROSS REFERENCE
    // -------------------------------
    const { data: crossRefs } = await supabase
      .from("part_cross_reference")
      .select("*")

    let expandedParts = [...baseParts]

    if (crossRefs) {
      baseParts.forEach(oem => {
        crossRefs
          .filter(c => c.oem_part_number === oem)
          .forEach(c => expandedParts.push(c.alt_part_number))
      })
    }

    expandedParts = [...new Set(expandedParts)]

    // -------------------------------
    // 3. SUPPLIER PARTS
    // -------------------------------
    const { data: supplierParts } = await supabase
      .from("supplier_parts")
      .select("*")

    const filtered = (supplierParts || []).filter(sp =>
      expandedParts.includes(sp.part_number)
    )

    // -------------------------------
    // 4. SUPPLIERS
    // -------------------------------
    const { data: suppliers } = await supabase
      .from("suppliers")
      .select("*")

    // -------------------------------
    // 5. OEM VALIDATION
    // -------------------------------
    const { data: oemValidation } = await supabase
      .from("oem_part_validation")
      .select("*")

    const getOEMStatus = (partNumber: string) => {
      const row = oemValidation?.find(o => o.part_number === partNumber)
      return row?.is_oem || false
    }

    // -------------------------------
    // 6. FAILURE MODEL
    // -------------------------------
    const { data: failureModel } = await supabase
      .from("part_failure_model")
      .select("*")

    // -------------------------------
    // 7. LOAD DRIVING PROFILE (NEW)
    // -------------------------------
    let drivingProfile:any = null

    if(vehicle_id){
      const { data } = await supabase
        .from("vehicle_driving_profile")
        .select("*")
        .eq("vehicle_id", vehicle_id)
        .single()

      drivingProfile = data
    }

    // -------------------------------
    // 8. PREDICT FAILURE (UPDATED)
    // -------------------------------
    const predictFailure = (
      partNumber: string,
      currentKm: number
    ) => {

      const modelRow = failureModel?.find(f => f.part_number === partNumber)
      if (!modelRow) return null

      const lifeKm = Number(modelRow.avg_life_km || 150000)
      const lifeYears = Number(modelRow.avg_life_years || 10)

      const kmUsed = currentKm || 0
      const kmRemaining = lifeKm - kmUsed

      const yearlyKm = drivingProfile?.avg_km_per_year || 12000
      const dailyKm = yearlyKm / 365

      const daysRemaining = kmRemaining > 0
        ? Math.round(kmRemaining / dailyKm)
        : 0

      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + daysRemaining)

      const kmRisk = kmUsed / lifeKm
      const ageRisk = vehicleAge / lifeYears
      const risk = Math.min(Math.max(kmRisk, ageRisk), 1)

      return {
        vehicleAge,
        currentKm: kmUsed,
        lifeKm,
        kmRemaining,
        daysRemaining,
        dueDate,
        risk
      }
    }

    // -------------------------------
    // 9. ENRICH + SCORE
    // -------------------------------
    const enriched = filtered.map(sp => {

      const supplier = suppliers?.find(s => s.id === sp.supplier_id)

      const isOEM =
        supplier?.is_authorised === true ||
        getOEMStatus(sp.part_number)

      const condition = (sp.condition || "NEW").toUpperCase()
      const price = Number(sp.price || 0)

      const prediction = predictFailure(sp.part_number, km || 0)

      let score = 100

      score -= price * 0.1

      if (isOEM) score += 25

      if (condition === "USED") score -= 15

      if (prediction) {
        score -= prediction.risk * 40
      }

      return {
        supplier: supplier?.name || "Unknown",
        part: sp.part_number,
        price,
        isOEM,
        condition,
        score,
        prediction
      }
    })

    // -------------------------------
    // 10. GROUP
    // -------------------------------
    const grouped: Record<string, any[]> = {}

    enriched.forEach(item => {
      if (!grouped[item.part]) grouped[item.part] = []
      grouped[item.part].push(item)
    })

    // -------------------------------
    // 11. BUILD RESULTS
    // -------------------------------
    const results = Object.keys(grouped).map(part => {

      const items = grouped[part]

      const recommended = [...items].sort((a,b) => b.score - a.score)[0]
      const cheapest = [...items].sort((a,b) => a.price - b.price)[0]
      const oem = items.find(i => i.isOEM)

      let savings = null
      if (oem && cheapest) {
        savings = oem.price - cheapest.price
      }

      return {
        part,
        recommended,
        cheapest,
        oem,
        savings,
        prediction: recommended?.prediction || null,
        options: items
      }
    })

    // -------------------------------
    // 12. RETURN
    // -------------------------------
    return NextResponse.json({
      success:true,
      results,
      debug:{
        matchedParts: matchedParts.length,
        expandedParts: expandedParts.length,
        matchedSuppliers: filtered.length,
        groupedParts: results.length,
        vehicleAge,
        km
      }
    })

  } catch (err:any) {

    console.error("SUPPLIER API ERROR:", err)

    return NextResponse.json({
      success:false,
      error: err.message
    })
  }
}