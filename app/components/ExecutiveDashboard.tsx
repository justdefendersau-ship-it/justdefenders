"use client"

export default function ExecutiveDashboard(){

  return (

    <div style={panel}>

      <h2 style={header}>

        Executive Cyber Risk

      </h2>

      <div style={grid}>

        <div style={card}>

          <h3>Platform Risk</h3>

          <h1>LOW</h1>

        </div>

        <div style={card}>

          <h3>Threat Forecast</h3>

          <h1>ELEVATED</h1>

        </div>

        <div style={card}>

          <h3>Resilience Score</h3>

          <h1>91%</h1>

        </div>

      </div>

    </div>
  )
}

const panel = {

  background:"#111",

  borderRadius:"12px",

  padding:"20px"
}

const header = {

  color:"#00ff88"
}

const grid = {

  display:"grid",

  gridTemplateColumns:
  "repeat(3, 1fr)",

  gap:"20px",

  marginTop:"20px"
}

const card = {

  background:"#1a1a1a",

  padding:"20px",

  borderRadius:"10px"
}