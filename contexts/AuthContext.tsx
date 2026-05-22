/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\AuthContext.tsx
 *
 * Timestamp:
 * 21 May 2026 10:52 Sydney
 *
 * PURPOSE:
 * Authentication Context
 *
 * STRATEGY:
 * PASS 17A — Authentication Foundation
 *
 * ============================================================
 */

"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import type {
  Session
} from "@supabase/supabase-js"

import {
  supabase
} from "@/lib/supabase/client"

// ============================================================
// TYPES
// ============================================================

interface AuthContextType {

  session:
    Session
    |
    null

  loading:
    boolean
}

// ============================================================
// CONTEXT
// ============================================================

const AuthContext =
  createContext<
    AuthContextType
    |
    undefined
  >(undefined)

// ============================================================
// PROVIDER
// ============================================================

export function AuthProvider({

  children

}: {

  children:
    React.ReactNode

}){

  const [

    session,

    setSession

  ] = useState<
    Session
    |
    null
  >(null)

  const [

    loading,

    setLoading

  ] = useState(true)

  // ==========================================================
  // INIT
  // ==========================================================

  useEffect(() => {

    supabase.auth
      .getSession()

      .then(

        ({
          data
        }) => {

          setSession(
            data.session
          )

          setLoading(false)
        }
      )

    const {

      data:
        listener

    } =

      supabase.auth
        .onAuthStateChange(

          (
            _event,

            session
          ) => {

            setSession(
              session
            )
          }
        )

    return () => {

      listener.subscription
        .unsubscribe()
    }

  }, [])

  // ==========================================================
  // VALUE
  // ==========================================================

  return (

    <AuthContext.Provider

      value={{

        session,

        loading
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useAuth(){

  const context =
    useContext(
      AuthContext
    )

  if (
    !context
  ) {

    throw new Error(

      "useAuth must be used within AuthProvider"
    )
  }

  return context
}