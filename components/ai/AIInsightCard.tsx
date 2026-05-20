"use client"

export default function AIInsightCard({

  title,
  confidence,
  recommendation,
  severity

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
        {title}
      </h2>

      <p>
        Confidence:
        {confidence}%
      </p>

      <p>
        Recommendation:
        {recommendation}
      </p>

      <p>
        Severity:
        {severity}
      </p>

    </div>
  )
}