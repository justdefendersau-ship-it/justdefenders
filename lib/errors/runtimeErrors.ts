// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\errors\runtimeErrors.ts
// Timestamp: 14 May 2026 23:15 Sydney
// ====================================================================

export class RuntimeError
extends Error {

  public readonly statusCode:
    number

  public readonly operational:
    boolean

  constructor(
    message: string,
    statusCode = 500,
    operational = true
  ) {

    super(message)

    this.name =
      "RuntimeError"

    this.statusCode =
      statusCode

    this.operational =
      operational
  }
}

export class ValidationError
extends RuntimeError {

  constructor(
    message: string
  ) {

    super(
      message,
      400,
      true
    )

    this.name =
      "ValidationError"
  }
}

export class AuthenticationError
extends RuntimeError {

  constructor(
    message = "Unauthorised"
  ) {

    super(
      message,
      401,
      true
    )

    this.name =
      "AuthenticationError"
  }
}

export class AuthorizationError
extends RuntimeError {

  constructor(
    message = "Forbidden"
  ) {

    super(
      message,
      403,
      true
    )

    this.name =
      "AuthorizationError"
  }
}

export class NotFoundError
extends RuntimeError {

  constructor(
    message = "Not found"
  ) {

    super(
      message,
      404,
      true
    )

    this.name =
      "NotFoundError"
  }
}