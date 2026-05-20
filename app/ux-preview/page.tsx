"use client"

import TrustCard from
"../../components/ux/TrustCard"

import SupplierComparison from
"../../components/ux/SupplierComparison"

import VoiceUXPanel from
"../../components/ux/VoiceUXPanel"

export default function UXPreview(){

  return (

    <main
      style={{

        background:"#EEF2F7",

        minHeight:"100vh",

        padding:"24px",

        fontFamily:"Arial",

        maxWidth:"900px",

        margin:"0 auto"
      }}
    >

      <div
        style={{
          marginBottom:"24px"
        }}
      >

        <h1>
          UI / UX Polish Preview
        </h1>

        <p>
          Commercial Defender Intelligence UX
        </p>

      </div>

      <VoiceUXPanel />

      <TrustCard

        title="P2263 Turbo Fault"

        status="ACTIVE"

        confidence={94}

        freshness="Updated 2 mins ago"

        severity="CRITICAL"

        action="Inspect turbo hoses immediately"

      />

      <div
        style={{
          marginTop:"30px",
          marginBottom:"20px"
        }}
      >

        <h2>
          Supplier Comparison
        </h2>

      </div>

      <SupplierComparison

        supplier="Bearmach"

        price={188.20}

        freight="2-4 days"

        stock={12}

        trust={96}

      />

      <SupplierComparison

        supplier="Allmakes 4x4"

        price={194.60}

        freight="3-5 days"

        stock={18}

        trust={92}

      />

      <div
        style={{

          background:"white",

          borderRadius:"18px",

          padding:"24px",

          marginTop:"24px"
        }}
      >

        <h2>
          Search Intelligence
        </h2>

        <input
          placeholder="Search Defender parts..."
          style={{

            width:"100%",

            padding:"16px",

            borderRadius:"14px",

            border:"1px solid #DDD",

            marginTop:"16px"
          }}
        />

      </div>

    </main>
  )
}