export class ThreatDetectionEngine {

  async analyseTelemetry(telemetry?: any) {

    return {

      detection: "ACTIVE",

      telemetry
    }
  }
}
