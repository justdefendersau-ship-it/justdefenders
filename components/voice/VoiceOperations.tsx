"use client"

import {
  useState
}
from "react"

export default function VoiceOperations(){

  const [
    response,
    setResponse
  ] = useState(null)

  async function voiceSearch(){

    const result =
    await fetch(

      "/api/voice/search",

      {
        method:"POST"
      }
    )

    const data =
    await result.json()

    setResponse(data)
  }

  async function voiceDiagnostics(){

    const result =
    await fetch(

      "/api/voice/diagnostics",

      {
        method:"POST"
      }
    )

    const data =
    await result.json()

    setResponse(data)
  }

  function speak(){

    if(!response){
      return
    }

    const speech =
    new SpeechSynthesisUtterance(

      JSON.stringify(response)
    )

    window.speechSynthesis.speak(
      speech
    )
  }

  return (

    <div>

      <div
        style={{
          display:"flex",
          gap:"12px",
          marginBottom:"20px"
        }}
      >

        <button
          onClick={voiceSearch}
          style={{

            flex:1,

            padding:"14px",

            borderRadius:"12px",

            border:"none",

            background:"#1D4ED8",

            color:"white"
          }}
        >
          Voice Search
        </button>

        <button
          onClick={voiceDiagnostics}
          style={{

            flex:1,

            padding:"14px",

            borderRadius:"12px",

            border:"none",

            background:"#0F766E",

            color:"white"
          }}
        >
          Voice Diagnostics
        </button>

      </div>

      <button
        onClick={speak}
        style={{

          width:"100%",

          padding:"14px",

          borderRadius:"12px",

          border:"none",

          background:"#111827",

          color:"white",

          marginBottom:"20px"
        }}
      >
        Speak Response
      </button>

      {

        response && (

          <div
            style={{

              background:"white",

              padding:"20px",

              borderRadius:"14px"
            }}
          >

            <pre>
              {JSON.stringify(
                response,
                null,
                2
              )}
            </pre>

          </div>
        )
      }

    </div>
  )
}