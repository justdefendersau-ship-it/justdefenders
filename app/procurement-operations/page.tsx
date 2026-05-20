"use client"

import {
  useEffect,
  useState
}
from "react"

import ProcurementCard from
"../../components/procurement/ProcurementCard"

export default function ProcurementOperations(){

  const [
    carts,
    setCarts
  ] = useState([])

  const [
    quotes,
    setQuotes
  ] = useState([])

  const [
    tracking,
    setTracking
  ] = useState([])

  useEffect(() => {

    async function load(){

      const cartResponse =
      await fetch(
        "/api/orders/cart"
      )

      const quoteResponse =
      await fetch(
        "/api/orders/quote"
      )

      const trackingResponse =
      await fetch(
        "/api/orders/tracking"
      )

      const cartData =
      await cartResponse.json()

      const quoteData =
      await quoteResponse.json()

      const trackingData =
      await trackingResponse.json()

      setCarts(cartData.carts)

      setQuotes(quoteData.quotes)

      setTracking(trackingData.tracking)
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
          Procurement Operations
        </h1>

        <p>
          Real Ordering + Supplier Procurement Intelligence
        </p>

      </div>

      <div
        style={{
          marginBottom:"30px"
        }}
      >

        <h2>
          Active Carts
        </h2>

        {

          carts.map(

            (
              item:any,
              index:number
            ) => (

              <ProcurementCard

                key={index}

                title={item.cartId}

                supplier="Multi Supplier"

                status={item.status}

                amount={item.total}

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
          Supplier Quotes
        </h2>

        {

          quotes.map(

            (
              item:any,
              index:number
            ) => (

              <ProcurementCard

                key={index}

                title={item.quoteId}

                supplier={item.supplier}

                status={item.status}

                amount={item.freightEstimate}

              />
            )
          )
        }

      </div>

      <div>

        <h2>
          Order Tracking
        </h2>

        {

          tracking.map(

            (
              item:any,
              index:number
            ) => (

              <ProcurementCard

                key={index}

                title={item.orderId}

                supplier={item.supplier}

                status={item.status}

                amount={0}

              />
            )
          )
        }

      </div>

    </main>
  )
}