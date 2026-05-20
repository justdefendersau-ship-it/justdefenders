// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\auth.ts
// Timestamp: 14 May 2026 14:00 Sydney

import bcrypt from "bcryptjs"

export interface AuthUser {
  id: number
  tenantId: number
  createdAt: Date
  username: string
  password: string
  role: string
}

export interface AuthResult {
  success: boolean
  user?: AuthUser
  error?: string
}

/**
 * Validate password against stored hash/password field
 */
export async function validatePassword(
  password: string,
  storedPassword: string
): Promise<boolean> {

  if (!password || !storedPassword) {
    return false
  }

  try {

    return await bcrypt.compare(
      password,
      storedPassword
    )

  } catch {

    return false
  }
}

/**
 * Authenticate user safely
 */
export async function authenticateUser(
  username: string,
  password: string,
  users: AuthUser[]
): Promise<AuthResult> {

  if (!username || !password) {

    return {
      success: false,
      error: "Missing credentials"
    }
  }

  const user = users.find(
    (u) => u.username === username
  )

  if (!user) {

    return {
      success: false,
      error: "User not found"
    }
  }

  const valid = await validatePassword(
    password,
    user.password
  )

  if (!valid) {

    return {
      success: false,
      error: "Invalid credentials"
    }
  }

  return {
    success: true,
    user
  }
}