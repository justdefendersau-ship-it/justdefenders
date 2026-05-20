"use client"

import {
  useEffect,
  useState
}
from "react"

import SupplierStatus from
"../../components/supplier/SupplierStatus"

export default function SupplierOperations(){

  const [
    suppliers,
    setSuppliers
  ] = useState([])

  useEffect(() => {

    async function load(){

      const response =
      await fetch(
        "/api/suppliers/health"
      )

      const data =
      await response.json()

      setSuppliers(
        data.suppliers
      )
    }

    load()

    const interval =
    setInterval(
      load,
      5000
    )

    return () =>
    clearInterval(interval)

  },[])

  return (

    <main
      style={{

        background:"#EEF2F7",

        minHeight:"100vh",

        padding:"24px",

        fontFamily:"Arial"
      }}
    >

      <div
        style={{
          marginBottom:"28px"
        }}
      >

        <h1>
          Supplier Operations
        </h1>

        <p>
          Live Supplier Operational Intelligence
        </p>

      </div>

      {

        suppliers.map(

          (
            item:any,
            index:number
          ) => (

            <SupplierStatus

              key={index}

              supplier={item.supplier}

              status={item.status}

              reliability={item.reliabilityScore}

              freshness={item.feedFreshnessMinutes}

            />
          )
        )
      }

      <div
        style={{

          background:"white",

          borderRadius:"18px",

          padding:"24px",

          marginTop:"20px"
        }}
      >

        <h2>
          Operational Summary
        </h2>

        <p>
          Real supplier integration active.
        </p>

        <p>
          Inventory freshness monitoring enabled.
        </p>

        <p>
          Supplier reliability scoring enabled.
        </p>

      </div>

    </main>
  )
}