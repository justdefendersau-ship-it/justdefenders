"use client"

export default function MobileSearchCard({

  title,
  supplier,
  vehicle,
  price,
  stock

}:any){

  return (

    <div
      style={{

        background:"white",

        borderRadius:"14px",

        padding:"16px",

        marginBottom:"14px",

        boxShadow:
        "0 3px 10px rgba(0,0,0,0.08)"
      }}
    >

      <h2
        style={{
          fontSize:"18px"
        }}
      >
        {title}
      </h2>

      <p>
        {supplier}
      </p>

      <p>
        {vehicle}
      </p>

      <p>
        ${price}
      </p>

      <p>
        Stock:
        {stock}
      </p>

    </div>
  )
}