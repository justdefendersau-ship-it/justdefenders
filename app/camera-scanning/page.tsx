"use client"

import CameraScanner from
"../../components/scanning/CameraScanner"

export default function CameraScanning(){

  return (

    <main
      style={{

        background:"#EEF2F7",

        minHeight:"100vh",

        padding:"24px",

        fontFamily:"Arial",

        maxWidth:"520px",

        margin:"0 auto"
      }}
    >

      <div
        style={{
          marginBottom:"24px"
        }}
      >

        <h1>
          Camera + Real Scanning
        </h1>

        <p>
          Operational Defender Scanning
        </p>

      </div>

      <div
        style={{

          background:"#DCE7F7",

          borderRadius:"16px",

          height:"220px",

          marginBottom:"24px",

          display:"flex",

          alignItems:"center",

          justifyContent:"center"
        }}
      >

        <p>
          Camera Preview Placeholder
        </p>

      </div>

      <CameraScanner />

    </main>
  )
}