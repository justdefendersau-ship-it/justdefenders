"use client"

export default function CommercialCard({

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

      <h2>
        {title}
      </h2>

      <p>
        Value:
        {value}
      </p>

      <p>
        Status:
        {status}
      </p>

    </div>
  )
}