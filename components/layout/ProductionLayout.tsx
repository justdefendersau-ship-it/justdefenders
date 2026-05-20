"use client"

import ProductionNavigation from
"../navigation/ProductionNavigation"

export default function ProductionLayout({

  title,
  subtitle,
  children

}:any){

  return (

    <main
      style={{

        background:"#0B1220",

        minHeight:"100vh",

        padding:"24px",

        fontFamily:"Inter, Arial",

        color:"#E5E7EB"
      }}
    >

      <div
        style={{
          marginBottom:"28px"
        }}
      >

        <h1
          style={{
            fontSize:"42px",
            marginBottom:"10px"
          }}
        >

          {title}

        </h1>

        <p
          style={{
            color:"#9CA3AF"
          }}
        >

          {subtitle}

        </p>

      </div>

      <ProductionNavigation />

      {children}

    </main>
  )
}