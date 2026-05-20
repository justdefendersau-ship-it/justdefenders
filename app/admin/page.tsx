"use client";

import { useEffect, useMemo, useState } from "react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\admin\page.tsx
//
// Timestamp:
// 2026-05-07 07:30
//
// Purpose:
// - KPI cards
// - Revenue over time chart
// - Marketplace intelligence dashboard
// =====================================================

type Row = {
  supplier: string
  clicks: number
  conversions: number
  revenue: number
  ctr: number
  rpc: number
}

type Trend = {
  date: string
  revenue: number
  conversions: number
}

export default function Admin(){

  const [rows, setRows] =
    useState<Row[]>([])

  const [trend, setTrend] =
    useState<Trend[]>([])

  const [loading, setLoading] =
    useState(true)

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  async function load(){

    try {

      // =====================================================
      // METRICS
      // =====================================================

      const metricsRes =
        await fetch(
          "/api/admin/metrics"
        )

      const metricsData =
        await metricsRes.json()

      setRows(
        metricsData.data || []
      )

      // =====================================================
      // TREND DATA
      // =====================================================

      const trendRes =
        await fetch(
          "/api/admin/revenue-trend"
        )

      const trendData =
        await trendRes.json()

      setTrend(
        trendData.data || []
      )

    } catch (err) {

      console.error(err)
    }

    setLoading(false)
  }

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(()=>{

    load()

  },[])

  // =====================================================
  // AUTO REFRESH
  // =====================================================

  useEffect(()=>{

    const interval =
      setInterval(()=>{

        load()

      }, 30000)

    return ()=>clearInterval(interval)

  },[])

  // =====================================================
  // KPI TOTALS
  // =====================================================

  const totals = useMemo(()=>{

    const clicks =
      rows.reduce(
        (sum,r)=>sum+r.clicks,
        0
      )

    const conversions =
      rows.reduce(
        (sum,r)=>sum+r.conversions,
        0
      )

    const revenue =
      rows.reduce(
        (sum,r)=>sum+r.revenue,
        0
      )

    const ctr =
      clicks > 0
        ? conversions / clicks
        : 0

    return {
      clicks,
      conversions,
      revenue,
      ctr
    }

  }, [rows])

  // =====================================================
  // SUPPLIER CHART
  // =====================================================

  const supplierRevenue =
    rows.map((r)=>({

      supplier:r.supplier,
      revenue:Number(
        r.revenue.toFixed(2)
      )

    }))

  // =====================================================
  // LOADING
  // =====================================================

  if(loading){

    return (
      <div style={{
        padding:40
      }}>
        Loading dashboard...
      </div>
    )
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div style={{
      padding:"30px",
      maxWidth:"1400px",
      margin:"0 auto",
      fontFamily:"Arial"
    }}>

      <h1>
        JustDefenders Intelligence
      </h1>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div style={{
        display:"grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap:"20px",
        marginTop:"30px"
      }}>

        {/* Clicks */}

        <div style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"20px",
          background:"#fafafa"
        }}>

          <div style={{
            fontSize:"14px",
            opacity:0.7
          }}>
            Total Clicks
          </div>

          <div style={{
            fontSize:"36px",
            fontWeight:"bold",
            marginTop:"10px"
          }}>
            {totals.clicks}
          </div>

        </div>

        {/* Conversions */}

        <div style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"20px",
          background:"#fafafa"
        }}>

          <div style={{
            fontSize:"14px",
            opacity:0.7
          }}>
            Conversions
          </div>

          <div style={{
            fontSize:"36px",
            fontWeight:"bold",
            marginTop:"10px"
          }}>
            {totals.conversions}
          </div>

        </div>

        {/* Revenue */}

        <div style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"20px",
          background:"#fafafa"
        }}>

          <div style={{
            fontSize:"14px",
            opacity:0.7
          }}>
            Revenue
          </div>

          <div style={{
            fontSize:"36px",
            fontWeight:"bold",
            marginTop:"10px"
          }}>
            ${totals.revenue.toFixed(2)}
          </div>

        </div>

        {/* CTR */}

        <div style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"20px",
          background:"#fafafa"
        }}>

          <div style={{
            fontSize:"14px",
            opacity:0.7
          }}>
            Conversion Rate
          </div>

          <div style={{
            fontSize:"36px",
            fontWeight:"bold",
            marginTop:"10px"
          }}>
            {(totals.ctr * 100).toFixed(1)}%
          </div>

        </div>

      </div>

      {/* =====================================================
          REVENUE OVER TIME
      ===================================================== */}

      <div style={{
        marginTop:"40px",
        border:"1px solid #ddd",
        borderRadius:"10px",
        padding:"20px",
        background:"#fff"
      }}>

        <h2>
          Revenue Over Time
        </h2>

        <div style={{
          width:"100%",
          height:"400px"
        }}>

          <ResponsiveContainer>

            <LineChart data={trend}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =====================================================
          CONVERSION TREND
      ===================================================== */}

      <div style={{
        marginTop:"40px",
        border:"1px solid #ddd",
        borderRadius:"10px",
        padding:"20px",
        background:"#fff"
      }}>

        <h2>
          Conversion Trend
        </h2>

        <div style={{
          width:"100%",
          height:"350px"
        }}>

          <ResponsiveContainer>

            <BarChart data={trend}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="conversions"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =====================================================
          SUPPLIER REVENUE
      ===================================================== */}

      <div style={{
        marginTop:"40px",
        border:"1px solid #ddd",
        borderRadius:"10px",
        padding:"20px",
        background:"#fff"
      }}>

        <h2>
          Supplier Revenue
        </h2>

        <div style={{
          width:"100%",
          height:"400px"
        }}>

          <ResponsiveContainer>

            <LineChart
              data={supplierRevenue}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="supplier"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =====================================================
          SUPPLIER TABLE
      ===================================================== */}

      <div style={{
        marginTop:"40px"
      }}>

        <h2>
          Supplier Leaderboard
        </h2>

        <table style={{
          width:"100%",
          borderCollapse:"collapse",
          marginTop:"20px"
        }}>

          <thead>

            <tr style={{
              borderBottom:
                "2px solid #ddd",
              textAlign:"left"
            }}>

              <th>Supplier</th>
              <th>Clicks</th>
              <th>Conversions</th>
              <th>Revenue</th>
              <th>CTR</th>
              <th>Revenue / Click</th>

            </tr>

          </thead>

          <tbody>

            {rows.map((r, i)=>(

              <tr
                key={i}
                style={{
                  borderBottom:
                    "1px solid #eee"
                }}
              >

                <td>{r.supplier}</td>

                <td>{r.clicks}</td>

                <td>{r.conversions}</td>

                <td>
                  ${r.revenue.toFixed(2)}
                </td>

                <td>
                  {(r.ctr * 100).toFixed(1)}%
                </td>

                <td>
                  ${r.rpc.toFixed(2)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
