export class IncidentEngine {

  async createIncident(

    severity?: any,

    title?: any,

    telemetry?: any
  ) {

    return {

      incident: "CREATED",

      severity,

      title,

      telemetry
    }
  }

  async getIncidents() {

    return []
  }
}
