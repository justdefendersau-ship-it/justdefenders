"use client"

import {
  useState
}
from "react"

export default function CameraScanner(){

  const [
    result,
    setResult
  ] = useState(null)

  async function scanBarcode(){

    const response =
    await fetch(

      "/api/scanning/barcode",

      {
        method:"POST"
      }
    )

    const data =
    await response.json()

    setResult(data.scan)
  }

  async function scanVin(){

    const response =
    await fetch(

      "/api/scanning/vin-ocr",

      {
        method:"POST"
      }
    )

    const data =
    await response.json()

    setResult(data)
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
          onClick={scanBarcode}
          style={{

            flex:1,

            padding:"14px",

            borderRadius:"12px",

            border:"none",

            background:"#1D4ED8",

            color:"white"
          }}
        >
          Scan Barcode
        </button>

        <button
          onClick={scanVin}
          style={{

            flex:1,

            padding:"14px",

            borderRadius:"12px",

            border:"none",

            background:"#0F766E",

            color:"white"
          }}
        >
          Scan VIN
        </button>

      </div>

      {

        result && (

          <div
            style={{

              background:"white",

              padding:"20px",

              borderRadius:"14px"
            }}
          >

            <pre>
              {JSON.stringify(
                result,
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