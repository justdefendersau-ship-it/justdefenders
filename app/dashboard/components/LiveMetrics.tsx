"use client";
import { useEffect, useState } from "react";

// =====================================================
// JustDefenders ©
// Live KPI metrics (conversion + revenue + CTR)
// =====================================================

export default function LiveMetrics(){

  const [metrics, setMetrics] = useState<any>(null)

  useEffect(()=>{
    load()
    const i = setInterval(load, 5000)
    return ()=>clearInterval(i)
  },[])

  async function load(){
    const res = await fetch("/api/analytics")
    const data = await res.json()

    let impressions = 0
    let clicks = 0
    let conversions = 0
    let revenue = 0

    data.variants?.forEach((v:any)=>{
      impressions += v.impressions || 0
      clicks += v.clicks || 0
      conversions += v.conversions || 0
      revenue += v.revenue || 0
    })

    setMetrics({
      impressions,
      clicks,
      conversions,
      revenue,
      ctr: impressions ? (clicks / impressions * 100).toFixed(1) : 0,
      conv: clicks ? (conversions / clicks * 100).toFixed(1) : 0
    })
  }

  if(!metrics) return <div>Loading metrics...</div>

  return (
    <div style={{background:"#111", padding:"12px", marginBottom:"20px"}}>

      <h3>Live Metrics</h3>

      <div>Impressions: {metrics.impressions}</div>
      <div>Clicks: {metrics.clicks}</div>
      <div>Conversions: {metrics.conversions}</div>

      <div>CTR: {metrics.ctr}%</div>
      <div>Conversion Rate: {metrics.conv}%</div>

      <div>Revenue: ${metrics.revenue}</div>

    </div>
  )
}
