"use client"

import VoiceOperations from
"../../components/voice/VoiceOperations"

export default function VoiceOperationsPage(){

  return (

    <main
      style={{

        background:"#EEF2F7",

        minHeight:"100vh",

        padding:"24px",

        fontFamily:"Arial",

        maxWidth:"600px",

        margin:"0 auto"
      }}
    >

      <div
        style={{
          marginBottom:"24px"
        }}
      >

        <h1>
          Voice Operations
        </h1>

        <p>
          Hands-Free Defender Intelligence
        </p>

      </div>

      <VoiceOperations />

    </main>
  )
}