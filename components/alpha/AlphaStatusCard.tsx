"use client"

export default function AlphaStatusCard({

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

      <p>
        {title}
      </p>

      <h2
        style={{
          fontSize:"30px"
        }}
      >
        {value}
      </h2>

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
  )
}