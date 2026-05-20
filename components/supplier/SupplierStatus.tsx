"use client"

export default function SupplierStatus({

  supplier,
  status,
  reliability,
  freshness

}:any){

  function statusColor(){

    if(status === "ONLINE"){
      return "#0F766E"
    }

    return "#D97706"
  }

  return (

    <div
      style={{

        background:"white",

        borderRadius:"18px",

        padding:"22px",

        marginBottom:"16px",

        boxShadow:
        "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >

      <div
        style={{

          display:"flex",

          justifyContent:"space-between",

          alignItems:"center"
        }}
      >

        <h2>
          {supplier}
        </h2>

        <span
          style={{

            background:statusColor(),

            color:"white",

            padding:"8px 12px",

            borderRadius:"999px"
          }}
        >
          {status}
        </span>

      </div>

      <p>
        Reliability:
        {reliability}%
      </p>

      <p>
        Feed Freshness:
        {freshness} mins
      </p>

    </div>
  )
}