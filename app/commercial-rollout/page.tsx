"use client"

import {
  useEffect,
  useState
}
from "react"

import CommercialCard from
"../../components/commercial/CommercialCard"

export default function CommercialRollout(){

  const [
    workshops,
    setWorkshops
  ] = useState([])

  const [
    expeditions,
    setExpeditions
  ] = useState([])

  const [
    suppliers,
    setSuppliers
  ] = useState([])

  const [
    analytics,
    setAnalytics
  ] = useState([])

  useEffect(() => {

    async function load(){

      const workshopResponse =
      await fetch(
        "/api/commercial/workshops"
      )

      const expeditionResponse =
      await fetch(
        "/api/commercial/expeditions"
      )

      const supplierResponse =
      await fetch(
        "/api/commercial/suppliers"
      )

      const analyticsResponse =
      await fetch(
        "/api/commercial/analytics"
      )

      const workshopData =
      await workshopResponse.json()

      const expeditionData =
      await expeditionResponse.json()

      const supplierData =
      await supplierResponse.json()

      const analyticsData =
      await analyticsResponse.json()

      setWorkshops(
        workshopData.workshops
      )

      setExpeditions(
        expeditionData.expeditions
      )

      setSuppliers(
        supplierData.suppliers
      )

      setAnalytics(
        analyticsData.analytics
      )
    }

    load()

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
          Commercial Operational Rollout
        </h1>

        <p>
          Workshop + Expedition + Supplier Pilot Operations
        </p>

      </div>

      <div
        style={{
          marginBottom:"30px"
        }}
      >

        <h2>
          Workshop Pilots
        </h2>

        {

          workshops.map(

            (
              item:any,
              index:number
            ) => (

              <CommercialCard

                key={index}

                title={item.workshop}

                value={item.workflowCompletion}

                status={item.status}

              />
            )
          )
        }

      </div>

      <div
        style={{
          marginBottom:"30px"
        }}
      >

        <h2>
          Expedition Pilots
        </h2>

        {

          expeditions.map(

            (
              item:any,
              index:number
            ) => (

              <CommercialCard

                key={index}

                title={item.expedition}

                value={item.aiTrust}

                status={item.status}

              />
            )
          )
        }

      </div>

      <div
        style={{
          marginBottom:"30px"
        }}
      >

        <h2>
          Supplier Commercial Onboarding
        </h2>

        {

          suppliers.map(

            (
              item:any,
              index:number
            ) => (

              <CommercialCard

                key={index}

                title={item.supplier}

                value={item.slaCompliance}

                status={item.commercialStatus}

              />
            )
          )
        }

      </div>

      <div>

        <h2>
          Commercial Analytics
        </h2>

        {

          analytics.map(

            (
              item:any,
              index:number
            ) => (

              <CommercialCard

                key={index}

                title={item.metric}

                value={item.value}

                status="ACTIVE"

              />
            )
          )
        }

      </div>

    </main>
  )
}