/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\auth\authOptions.ts
 *
 * Timestamp:
 * 24 May 2026 00:52 Sydney
 *
 * PURPOSE:
 * Real SaaS Authentication Activation Layer
 *
 * STRATEGY:
 * PASS 45 — Real SaaS Activation
 *
 * OBJECTIVES:
 * - NextAuth activation
 * - secure SaaS authentication
 * - RBAC enforcement
 * - protected operational routes
 * - persistent identity sessions
 * - subscription-aware authentication
 * - enterprise operational security
 *
 * ============================================================
 */

import {

  PrismaAdapter

} from "@auth/prisma-adapter"

import {

  compare

} from "bcryptjs"

import CredentialsProvider from "next-auth/providers/credentials"

import type {

  NextAuthOptions

} from "next-auth"

import {

  prisma

} from "@/lib/database/prisma"

// ============================================================
// TYPES
// ============================================================

export type PlatformRole =

  | "MEMBER"
  | "PREMIUM"
  | "FLEET"
  | "ADMIN"

// ============================================================
// AUTH OPTIONS
// ============================================================

export const authOptions:
  NextAuthOptions = {

  // ==========================================================
  // ADAPTER
  // ==========================================================

  adapter:
    PrismaAdapter(prisma),

  // ==========================================================
  // SESSION
  // ==========================================================

  session: {

    strategy:
      "jwt",

    maxAge:
      60 * 60 * 24 * 30
  },

  // ==========================================================
  // SECRET
  // ==========================================================

  secret:
    process.env.NEXTAUTH_SECRET,

  // ==========================================================
  // PAGES
  // ==========================================================

  pages: {

    signIn:
      "/auth/login",

    error:
      "/auth/error"
  },

  // ==========================================================
  // PROVIDERS
  // ==========================================================

  providers: [

    CredentialsProvider({

      name:
        "Credentials",

      credentials: {

        email: {

          label:
            "Email",

          type:
            "email"
        },

        password: {

          label:
            "Password",

          type:
            "password"
        }
      },

      async authorize(credentials){

        // ====================================================
        // VALIDATION
        // ====================================================

        if (

          !credentials?.email
          ||
          !credentials?.password

        ){

          throw new Error(
            "Missing credentials"
          )
        }

        // ====================================================
        // USER
        // ====================================================

        const user = await prisma.user.findFirst({

            where: {

              email:
                credentials.email
            },

            include: {

              subscription:
                true
            }
          })

        // ====================================================
        // VALIDATE
        // ====================================================

        if (

          !user
          ||
          !user.passwordHash

        ){

          throw new Error(
            "Invalid credentials"
          )
        }

        // ====================================================
        // PASSWORD
        // ====================================================

        const valid =
          await compare(

            credentials.password,

            user.passwordHash
          )

        if (!valid){

          throw new Error(
            "Invalid credentials"
          )
        }

        // ====================================================
        // ACTIVE
        // ====================================================

        if (!user.active){

          throw new Error(
            "Account disabled"
          )
        }

        // ====================================================
        // RETURN
        // ====================================================

return {

  id: String(user.id),

  email: user.email,

  name: user.name,

  role: user.role,

subscriptionStatus:

  user.subscription?.status
  ||
  "INACTIVE",

plan:

  user.subscription?.planName
  ||
  "FREE"
}
      }
    })
  ],

  // ==========================================================
  // CALLBACKS
  // ==========================================================

  callbacks: {

    // ========================================================
    // JWT
    // ========================================================

    async jwt({

      token,
      user

    }){

      if (user){

        token.id =
          user.id

token.role =

  (user as any).role

token.subscriptionStatus =

  (user as any).subscriptionStatus

token.plan =

  (user as any).plan
      }

      return token
    },

    // ========================================================
    // SESSION
    // ========================================================

    async session({

      session,
      token

    }){

      if (session.user){

;(session.user as any).id =

  token.id as string

;(session.user as any).role =

  token.role

;(session.user as any).subscriptionStatus =

  token.subscriptionStatus

;(session.user as any).plan =

  token.plan
      }

      return session
    }
  },

  // ==========================================================
  // EVENTS
  // ==========================================================

  events: {

    // ========================================================
    // SIGN IN
    // ========================================================

    async signIn(message){

      console.log(

        "[AUTH_SIGN_IN]",

        {

          userId:
            message.user.id,

          email:
            message.user.email,

          timestamp:
            new Date().toISOString()
        }
      )
    },

    // ========================================================
    // SIGN OUT
    // ========================================================

    async signOut(message){

      console.log(

        "[AUTH_SIGN_OUT]",

        {

          session:
            message.session?.user?.email,

          timestamp:
            new Date().toISOString()
        }
      )
    }
  },

  // ==========================================================
  // DEBUG
  // ==========================================================

  debug:
    process.env.NODE_ENV !== "production"
}

// ============================================================
// RBAC
// ============================================================

export function hasRequiredRole(

  userRole:
    PlatformRole,

  requiredRole:
    PlatformRole

){

  const hierarchy:
    Record<
      PlatformRole,
      number
    > = {

    MEMBER: 1,

    PREMIUM: 2,

    FLEET: 3,

    ADMIN: 4
  }

  return (

    hierarchy[userRole]
    >=
    hierarchy[requiredRole]
  )
}

// ============================================================
// FEATURE ACCESS
// ============================================================

export function hasFeatureAccess(

  role:
    PlatformRole,

  feature:
    string

){

  const featureMap:
    Record<
      string,
      PlatformRole
    > = {

    // ========================================================
    // MEMBER
    // ========================================================

    procurement:
      "MEMBER",

    federation:
      "MEMBER",

    vehicleIntelligence:
      "MEMBER",

    // ========================================================
    // PREMIUM
    // ========================================================

    expedition:
      "PREMIUM",

    predictiveMaintenance:
      "PREMIUM",

    telemetry:
      "PREMIUM",

    // ========================================================
    // FLEET
    // ========================================================

    fleetOperations:
      "FLEET",

    enterpriseTelemetry:
      "FLEET",

    // ========================================================
    // ADMIN
    // ========================================================

    admin:
      "ADMIN"
  }

  const requiredRole =

    featureMap[feature]
    ||
    "ADMIN"

  return hasRequiredRole(

    role,

    requiredRole
  )
}

// ============================================================
// SUBSCRIPTION
// ============================================================

export function isSubscriptionActive(

  status?: string

){

  return [

    "ACTIVE",
    "TRIAL"

  ].includes(
    status || ""
  )
}