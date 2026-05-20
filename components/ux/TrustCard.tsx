"use client"

export default function TrustCard({

  title,
  status,
  confidence,
  freshness,
  severity,
  action

}:any){

  function severityColor(){

    if(severity === "CRITICAL"){
      return "#B91C1C"
    }

    if(severity === "HIGH"){
      return "#D97706"
    }

    return "#0F766E"
  }

  return (

    <div
      style={{

        background:"white",

        borderRadius:"18px",

        padding:"22px",

        marginBottom:"18px",

        boxShadow:
        "0 6px 18px rgba(0,0,0,0.08)",

        borderLeft:
        `6px solid ${severityColor()}`
      }}
    >

      <div
        style={{

          display:"flex",

          justifyContent:"space-between",

          alignItems:"center",

          marginBottom:"12px"
        }}
      >

        <h2>
          {title}
        </h2>

        <span
          style={{

            background:"#EEF2FF",

            padding:"8px 12px",

            borderRadius:"999px",

            fontWeight:"bold"
          }}
        >
          {status}
        </span>

      </div>

      <p>
        Confidence:
        {confidence}%
      </p>

      <p>
        Data Freshness:
        {freshness}
      </p>

      <p>
        Recommended Action:
        {action}
      </p>

    </div>
  )
}