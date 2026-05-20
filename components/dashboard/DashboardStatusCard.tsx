"use client"

export default function DashboardStatusCard({

  title,
  value,
  status

}:any){

  return (

    <div
      style={{

        background:"white",

        borderRadius:"18px",

        padding:"22px",

        boxShadow:
        "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >

      <p
        style={{
          color:"#6B7280"
        }}
      >
        {title}
      </p>

      <h2
        style={{
          fontSize:"32px",
          marginTop:"10px"
        }}
      >
        {value}
      </h2>

      <div
        style={{
          marginTop:"12px"
        }}
      >

        <span
          style={{

            background:"#DCFCE7",

            padding:"8px 12px",

            borderRadius:"999px"
          }}
        >
          {status}
        </span>

      </div>

    </div>
  )
}