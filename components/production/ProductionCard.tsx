"use client"

export default function ProductionCard({

  title,
  value,
  status,
  subtitle

}:any){

  return (

    <div
      style={{

        background:"#18253A",

        border:"1px solid #22324B",

        borderRadius:"18px",

        padding:"22px",

        boxShadow:
        "0 10px 30px rgba(0,0,0,0.35)"
      }}
    >

      <div
        style={{
          marginBottom:"12px"
        }}
      >

        <p
          style={{

            color:"#9CA3AF",

            margin:0,

            fontSize:"13px"
          }}
        >

          {subtitle}

        </p>

      </div>

      <h2
        style={{

          color:"#E5E7EB",

          marginBottom:"14px"
        }}
      >

        {title}

      </h2>

      <h1
        style={{

          color:"#3B82F6",

          fontSize:"36px",

          marginBottom:"12px"
        }}
      >

        {value}

      </h1>

      <div
        style={{

          color:"#10B981",

          fontWeight:600
        }}
      >

        {status}

      </div>

    </div>
  )
}