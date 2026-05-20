"use client"

export default function SupplierComparison({

  supplier,
  price,
  freight,
  stock,
  trust

}:any){

  return (

    <div
      style={{

        background:"white",

        borderRadius:"18px",

        padding:"20px",

        marginBottom:"16px",

        boxShadow:
        "0 4px 14px rgba(0,0,0,0.08)"
      }}
    >

      <div
        style={{

          display:"flex",

          justifyContent:"space-between",

          marginBottom:"12px"
        }}
      >

        <h2>
          {supplier}
        </h2>

        <strong>
          ${price}
        </strong>

      </div>

      <p>
        Freight:
        {freight}
      </p>

      <p>
        Stock:
        {stock}
      </p>

      <p>
        Trust Score:
        {trust}
      </p>

    </div>
  )
}