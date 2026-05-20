"use client"

export default function VoiceUXPanel(){

  return (

    <div
      style={{

        background:"#111827",

        color:"white",

        borderRadius:"18px",

        padding:"22px",

        marginBottom:"20px"
      }}
    >

      <h2>
        Voice Operations Active
      </h2>

      <p>
        Hands-free Defender workflows enabled.
      </p>

      <div
        style={{
          marginTop:"14px"
        }}
      >

        <button
          style={{

            padding:"14px 18px",

            borderRadius:"12px",

            border:"none",

            background:"#1D4ED8",

            color:"white"
          }}
        >
          Start Voice Session
        </button>

      </div>

    </div>
  )
}