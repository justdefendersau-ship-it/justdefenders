"use client"

export default function SOCNavigation(){

  return (

    <aside style={sidebar}>

      <h2 style={logo}>

        JustDefenders

      </h2>

      <div style={section}>

        <div style={title}>

          SOC OPERATIONS

        </div>

        <div style={item}>Command Centre</div>
        <div style={item}>Investigations</div>
        <div style={item}>Threat Intel</div>
        <div style={item}>UEBA</div>

      </div>

      <div style={section}>

        <div style={title}>

          AI OPERATIONS

        </div>

        <div style={item}>AI Runtime</div>
        <div style={item}>Digital Twin</div>
        <div style={item}>Graph Analytics</div>
        <div style={item}>Cognitive Ops</div>

      </div>

      <div style={section}>

        <div style={title}>

          EXECUTIVE

        </div>

        <div style={item}>Risk Dashboard</div>
        <div style={item}>Resilience</div>
        <div style={item}>Strategic Forecasts</div>

      </div>

    </aside>
  )
}

const sidebar = {

  width:"280px",

  background:"#0d0d0d",

  borderRight:"1px solid #222",

  padding:"20px",

  minHeight:"100vh"
}

const logo = {

  color:"#00ff88"
}

const section = {

  marginTop:"30px"
}

const title = {

  color:"#777",

  marginBottom:"12px",

  fontSize:"12px"
}

const item = {

  padding:"10px",

  borderRadius:"8px",

  marginBottom:"8px",

  background:"#151515",

  cursor:"pointer"
}