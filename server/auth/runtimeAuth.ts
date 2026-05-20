// JustDefenders ©
// File: C:\dev\justdefenders\frontend\server\auth\runtimeAuth.ts
// Timestamp: 15 May 2026 00:05 Sydney

export interface RuntimeUser {
  id: string
  username: string
  role: string
}

export interface RuntimeTokenPayload {
  sub: string
  username: string
  role: string
  exp: number
}

const TOKEN_DURATION_SECONDS =
  60 * 60 * 24

export function signRuntimeToken(
  user: RuntimeUser
): string {

  const payload: RuntimeTokenPayload = {
    sub: user.id,
    username: user.username,
    role: user.role,
    exp:
      Math.floor(
        Date.now() / 1000
      ) + TOKEN_DURATION_SECONDS
  }

  return Buffer
    .from(
      JSON.stringify(payload)
    )
    .toString("base64url")
}

export function verifyRuntimeToken(
  token: string
): RuntimeTokenPayload | null {

  try {

    const decoded =
      Buffer
        .from(
          token,
          "base64url"
        )
        .toString("utf8")

    const payload =
      JSON.parse(decoded) as RuntimeTokenPayload

    if (
      payload.exp <
      Math.floor(Date.now() / 1000)
    ) {
      return null
    }

    return payload

  } catch {
    return null
  }
}