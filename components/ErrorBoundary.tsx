"use client"

/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\components\ErrorBoundary.tsx
===================================================== */

import React from "react"

type Props = {

  children:React.ReactNode
}

type State = {

  hasError:boolean
}

export default class ErrorBoundary
extends React.Component<Props, State> {

  constructor(props:Props){

    super(props)

    this.state = {

      hasError:false
    }
  }

  static getDerivedStateFromError(){

    return {

      hasError:true
    }
  }

  componentDidCatch(error:any){

    console.error(
      "UI FAILURE:",
      error
    )
  }

  render(){

    if(this.state.hasError){

      return (

        <main
          style={{

            background:"#050505",

            color:"#ffffff",

            minHeight:"100vh",

            padding:"40px",

            fontFamily:"Segoe UI"
          }}
        >

          <h1
            style={{

              color:"#ff4444"
            }}
          >

            JUSTDEFENDERS UI RECOVERY

          </h1>

          <p>

            A frontend rendering failure
            was safely contained.

          </p>

        </main>
      )
    }

    return this.props.children
  }
}
