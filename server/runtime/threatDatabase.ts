// JustDefenders ©
// File: C:\dev\justdefenders\frontend\server\runtime\threatDatabase.ts
// Timestamp: 15 May 2026 00:45 Sydney

export interface ThreatRecord {

  id: string

  source: string

  severity:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"

  description: string

  createdAt: string
}

class ThreatDatabase {

  private threats:
    Map<string, ThreatRecord>

  constructor() {

    this.threats = new Map()
  }

  insertThreat(
    threat: ThreatRecord
  ): void {

    this.threats.set(
      threat.id,
      threat
    )
  }

  getThreat(
    id: string
  ): ThreatRecord | undefined {

    return this.threats.get(id)
  }

  getAllThreats():
  ThreatRecord[] {

    return Array.from(
      this.threats.values()
    )
  }

  deleteThreat(
    id: string
  ): boolean {

    return this.threats.delete(id)
  }

  clear():
  void {

    this.threats.clear()
  }
}

export const threatDatabase =
  new ThreatDatabase()