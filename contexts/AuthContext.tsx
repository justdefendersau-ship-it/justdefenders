/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\contexts\AuthContext.tsx
 *
 * Timestamp:
 * 23 May 2026 19:08 Sydney
 *
 * PURPOSE:
 * Authentication Integration Layer
 *
 * STRATEGY:
 * PASS 38B — Authentication Integration
 *
 * OBJECTIVES:
 * - persistent operational identity
 * - role-aware authentication
 * - entitlement persistence
 * - operational session management
 * - protected operational intelligence
 * - fleet-aware authentication
 *
 * ============================================================
 */

"use client"

import {

  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState

} from "react"

import type {

  PlatformRole,
  PlatformUser

} from "@/lib/auth/rbac"

import {

  MOCK_PLATFORM_USER

} from "@/lib/auth/rbac"

// ============================================================
// TYPES
// ============================================================

interface AuthContextValue {

  user:
    PlatformUser
    |
    null

  authenticated:
    boolean

  loading:
    boolean

  login: (

    email: string,
    password: string

  ) => Promise<void>

  logout: () => void

  setRole: (

    role: PlatformRole

  ) => void
}

// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY =
  "justdefenders-auth"

// ============================================================
// CONTEXT
// ============================================================

const AuthContext =
  createContext<
    AuthContextValue
    |
    undefined
  >(undefined)

// ============================================================
// PROVIDER
// ============================================================

export function AuthProvider({

  children

}: {

  children: React.ReactNode

}){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    user,
    setUser

  ] = useState<
    PlatformUser
    |
    null
  >(null)

  const [

    loading,
    setLoading

  ] = useState(true)

  // ==========================================================
  // LOAD SESSION
  // ==========================================================

  useEffect(() => {

    try {

      const raw =
        localStorage.getItem(
          STORAGE_KEY
        )

      if (

        raw

      ){

        const parsed =
          JSON.parse(raw)

        setUser(parsed)
      }

    } catch (

      error

    ){

      console.error(

        "[AUTH_LOAD_ERROR]",

        error
      )

      localStorage.removeItem(
        STORAGE_KEY
      )

    } finally {

      setLoading(false)
    }

  }, [])

  // ==========================================================
  // LOGIN
  // ==========================================================

  const login =
    useCallback(

      async (

        email: string,
        _password: string

      ) => {

        // ====================================================
        // MOCK AUTH
        // ====================================================

        const normalizedEmail =
          email
            .trim()
            .toLowerCase()

        let role:
          PlatformRole =
            "MEMBER"

        // ====================================================
        // ROLE ROUTING
        // ====================================================

        if (

          normalizedEmail.includes(
            "admin"
          )

        ){

          role = "ADMIN"

        } else if (

          normalizedEmail.includes(
            "fleet"
          )

        ){

          role = "FLEET"

        } else if (

          normalizedEmail.includes(
            "premium"
          )

        ){

          role = "PREMIUM"
        }

        // ====================================================
        // USER
        // ====================================================

        const sessionUser:
          PlatformUser = {

          ...MOCK_PLATFORM_USER,

          id:
            crypto.randomUUID(),

          name:
            normalizedEmail
              .split("@")[0],

          email:
            normalizedEmail,

          role,

          active:
            true
        }

        // ====================================================
        // SAVE
        // ====================================================

        localStorage.setItem(

          STORAGE_KEY,

          JSON.stringify(
            sessionUser
          )
        )

        setUser(
          sessionUser
        )

      },

      []
    )

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout =
    useCallback(() => {

      localStorage.removeItem(
        STORAGE_KEY
      )

      setUser(null)

    }, [])

  // ==========================================================
  // ROLE SWITCH
  // ==========================================================

  const setRole =
    useCallback(

      (

        role: PlatformRole

      ) => {

        if (

          !user

        ){

          return
        }

        const updatedUser = {

          ...user,

          role
        }

        setUser(
          updatedUser
        )

        localStorage.setItem(

          STORAGE_KEY,

          JSON.stringify(
            updatedUser
          )
        )

      },

      [user]
    )

  // ==========================================================
  // VALUE
  // ==========================================================

  const value =
    useMemo<
      AuthContextValue
    >(() => ({

      user,

      authenticated:
        !!user,

      loading,

      login,

      logout,

      setRole

    }), [

      user,
      loading,
      login,
      logout,
      setRole
    ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <AuthContext.Provider
      value={value}
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

  ){

    throw new Error(

      "useAuth must be used within AuthProvider"
    )
  }

  return context
}