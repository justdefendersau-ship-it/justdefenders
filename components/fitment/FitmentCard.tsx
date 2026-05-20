"use client"

export default function FitmentCard({

  part,
  confidence,
  compatible,
  expedition

}:any){

  return (

    <div
      style={{

        background:"white",

        borderRadius:"18px",

        padding:"22px",

        marginBottom:"18px",

        boxShadow:
        "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >

      <h2>
        {part}
      </h2>

      <p>
        Fitment Confidence:
        {confidence}%
      </p>

      <p>
        Compatible Vehicles:
        {compatible.join(", ")}
      </p>

      <p>
        Expedition Recommended:
        {String(expedition)}
      </p>

    </div>
  )
}