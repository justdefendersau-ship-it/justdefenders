"use client"

export default function ProductCard({

  title,
  supplier,
  vehicle,
  price,
  fitment,
  relevance,
  stock

}:any){

  return (

    <div
      style={{

        background:"white",

        borderRadius:"16px",

        padding:"20px",

        marginBottom:"18px",

        boxShadow:
        "0 4px 16px rgba(0,0,0,0.08)"
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
        Vehicle:
        {vehicle}
      </p>

      <p>
        Price:
        ${price}
      </p>

      <p>
        Fitment Confidence:
        {fitment}%
      </p>

      <p>
        Relevance:
        {relevance}
      </p>

      <p>
        Stock:
        {stock}
      </p>

    </div>
  )
}