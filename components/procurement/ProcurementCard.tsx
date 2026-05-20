"use client"

export default function ProcurementCard({

  title,
  supplier,
  status,
  amount

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
        Supplier:
        {supplier}
      </p>

      <p>
        Status:
        {status}
      </p>

      <p>
        Amount:
        ${amount}
      </p>

    </div>
  )
}