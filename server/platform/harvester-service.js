/* ==================================================================================================
   JustDefenders Â©
   File:
   C:\dev\justdefenders\frontend\server\platform\harvester-service.js

   MS-006 â€” PLATFORM / SERVICE HEALTH
   CONTROLLED RUNTIME INTEGRATION

   Timestamp: 17th August 2026, 22:53 Sydney
   ================================================================================================== */

const fs = require("fs")
const path = require("path")

const logger = require("../shared/logger")
const { bootstrapService } = require("./service-bootstrap")
const health = require("./health-manager")
const scheduler = require("../runtime/central-scheduler")
const persistence = require("./persistence-manager")
const {
  persistPlatformServiceHealth
} = require("./platform-service-health-writer")

let runtimeState = {
  name: "harvester",
  running: false,
  startedAt: null,
  stoppedAt: null,
  lastRun: null,
  lastError: null,
  heartbeat: null,
  timer: null,
  schedulerTask: null,
  service: null,
  health: {
    status: "STOPPED"
  },
  discovery: [],
  discoveryLastUpdated: null,
  latestExecution: null,
  federation: {
    inventory: [],
    members: [],
    summary: {
      members: 0,
      onlineMembers: 0,
      degradedMembers: 0,
      offlineMembers: 0,
      totalHarvestedRecords: 0,
      totalPersistedRecords: 0,
      federationConfidence: 0,
      federationHealth: "UNKNOWN"
    },
    generatedAt: null
  }
}

let platformHealthLifecycleGeneration = 0
let platformHealthPersistenceTail = Promise.resolve()

function ensureDataDirectory() {
  const dir = path.join(process.cwd(), "data")

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

function queuePlatformHealthPersistence(expectedGeneration = platformHealthLifecycleGeneration) {
  const serviceState = health.getService("harvester")

  if (!serviceState) {
    return
  }

  platformHealthPersistenceTail =
    platformHealthPersistenceTail
      .catch(() => {})
      .then(async () => {
        if (expectedGeneration !== platformHealthLifecycleGeneration) {
          return
        }

        try {
          await persistPlatformServiceHealth(serviceState)
        } catch (error) {
          logger.warn(
            "Platform service-health persistence failed: " +
            (error && error.message ? error.message : String(error))
          )
        }
      })
}

function updateHealthStatus(status, details = {}) {
  runtimeState.health = {
    ...runtimeState.health,
    status,
    ...details,
    timestamp: new Date().toISOString()
  }

  if (runtimeState.service) {
    runtimeState.service.status = status
    runtimeState.service.running = runtimeState.running
    runtimeState.service.lastHeartbeat = runtimeState.heartbeat || null
  }

  health.setServiceStatus("harvester", status, {
    running: runtimeState.running,
    lastHeartbeat: runtimeState.heartbeat || null,
    ...details
  })
}

function normalizeSourceName(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
}

function loadJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (error) {
    return null
  }
}

function buildSourceDiscovery() {
  const registryPath = path.join(process.cwd(), "data", "suppliers", "supplier-registry.json")
  const healthPath = path.join(process.cwd(), "data", "suppliers", "live-sync", "supplier-health.json")

  const registry = loadJsonFile(registryPath) || []
  const healthEntries = loadJsonFile(healthPath) || []
  const healthIndex = new Map(
    Array.isArray(healthEntries)
      ? healthEntries.map(item => [String(item.supplier).trim(), item])
      : []
  )

  return Array.isArray(registry)
    ? registry.map(item => {
        const supplierName = String(item.supplier || item.supplierName || "unknown").trim()
        const healthRecord = healthIndex.get(supplierName) || null
        const configurationValid = item.validation === "VALIDATED" && item.catalogue === "AVAILABLE"
        const enabled = item.tradeAccount === "ACTIVE" || item.catalogue === "AVAILABLE" || item.api === "ACTIVE" || item.scraping === "SUPPORTED"

        return {
          id: normalizeSourceName(supplierName),
          supplier: supplierName,
          country: item.country || "UNKNOWN",
          validation: item.validation || "UNKNOWN",
          catalogue: item.catalogue || "UNKNOWN",
          api: item.api || "UNKNOWN",
          scraping: item.scraping || "UNKNOWN",
          tradeAccount: item.tradeAccount || "UNKNOWN",
          enabled,
          configurationValid,
          health: healthRecord ? healthRecord.status : "UNKNOWN",
          healthDetails: healthRecord || null
        }
      })
    : []
}

function buildFederationState(sourceDiscovery = [], latestExecution = null, persistenceState = null) {
  const members = Array.isArray(sourceDiscovery)
    ? sourceDiscovery.map(source => {
        const supplierName = String(source.supplier || source.id || "unknown").trim()
        const sourceId = String(source.id || normalizeSourceName(supplierName))
        const executionEntry = latestExecution && Array.isArray(latestExecution.executions)
          ? latestExecution.executions.find(exec => {
              const execSource = String(exec.source || exec.id || "").trim()
              return execSource === supplierName || execSource === sourceId
            }) || null
          : null

        const enabled = Boolean(source.enabled)
        const healthValue = String(source.health || "UNKNOWN").toUpperCase()
        const executionStatus = executionEntry
          ? String(executionEntry.executionStatus || "UNKNOWN").toUpperCase()
          : "UNKNOWN"
        const recordsHarvested = executionEntry && Number.isFinite(Number(executionEntry.recordsCollected))
          ? Number(executionEntry.recordsCollected)
          : 0
        const persistenceSuccess = persistenceState && String(persistenceState.status || "").toUpperCase() === "SUCCESS"
        const recordsPersisted = persistenceSuccess ? recordsHarvested : 0
        const executionCount = executionEntry ? 1 : 0
        const failureCount = executionStatus === "FAILED" ? 1 : 0

        let operationalStatus = "OFFLINE"
        if (!enabled) {
          operationalStatus = "OFFLINE"
        } else if (executionStatus === "FAILED" || healthValue === "CRITICAL" || healthValue === "ERROR" || failureCount > 0) {
          operationalStatus = "OFFLINE"
        } else if (executionStatus === "SKIPPED" || healthValue === "DEGRADED" || healthValue === "WARN" || healthValue === "WARNING") {
          operationalStatus = "DEGRADED"
        } else {
          operationalStatus = "ONLINE"
        }

        const confidenceValue = typeof source.confidence === "number"
          ? source.confidence
          : (source.configurationValid ? 0.92 : 0.45)

        return {
          supplier: supplierName,
          sourceId,
          operationalStatus,
          enabled,
          lastSuccessfulExecution: executionEntry && executionStatus === "COMPLETED"
            ? (executionEntry.completionTime || executionEntry.startTime || null)
            : null,
          executionDurationMs: executionEntry && Number.isFinite(Number(executionEntry.durationMs))
            ? Number(executionEntry.durationMs)
            : null,
          executionCount,
          recordsHarvested,
          recordsPersisted,
          confidence: confidenceValue,
          health: healthValue || "UNKNOWN",
          failureCount
        }
      })
    : []

  const onlineMembers = members.filter(member => member.operationalStatus === "ONLINE").length
  const degradedMembers = members.filter(member => member.operationalStatus === "DEGRADED").length
  const offlineMembers = members.filter(member => member.operationalStatus === "OFFLINE").length
  const federationConfidence = members.length > 0
    ? Number((members.reduce((sum, member) => sum + (typeof member.confidence === "number" ? member.confidence : 0), 0) / members.length).toFixed(2))
    : 0

  let federationHealth = "UNKNOWN"
  if (members.length > 0) {
    if (offlineMembers > 0 && degradedMembers === 0 && onlineMembers === 0) {
      federationHealth = "OFFLINE"
    } else if (degradedMembers > 0 || (onlineMembers > 0 && offlineMembers > 0)) {
      federationHealth = "DEGRADED"
    } else {
      federationHealth = "ONLINE"
    }
  }

  return {
    inventory: members,
    members,
    summary: {
      members: members.length,
      onlineMembers,
      degradedMembers,
      offlineMembers,
      totalHarvestedRecords: members.reduce((sum, member) => sum + member.recordsHarvested, 0),
      totalPersistedRecords: members.reduce((sum, member) => sum + member.recordsPersisted, 0),
      federationConfidence,
      federationHealth
    },
    generatedAt: latestExecution && latestExecution.executedAt ? latestExecution.executedAt : new Date().toISOString()
  }
}

function writeRuntimeArtifact(result) {
  const dir = ensureDataDirectory()
  const target = path.join(dir, "harvester-runtime.json")

  const payload = {
    service: "harvester",
    running: runtimeState.running,
    lastRun: runtimeState.lastRun,
    lastError: runtimeState.lastError,
    health: runtimeState.health,
    latestExecution: runtimeState.latestExecution,
    federation: runtimeState.federation,
    result
  }

  fs.writeFileSync(target, JSON.stringify(payload, null, 2))
}

function normaliseHarvestResult(rawResult) {
  const payload = rawResult && rawResult.payload && typeof rawResult.payload === "object" ? rawResult.payload : {}
  const supplier = rawResult && rawResult.supplier ? String(rawResult.supplier) : "unknown"
  const source = rawResult && rawResult.source ? String(rawResult.source) : supplier

  const priceValue = payload.price != null ? Number(payload.price) : null
  const confidenceValue = payload.confidence != null ? Number(payload.confidence) : null

  return {
    supplier,
    source,
    manufacturer: payload.manufacturer || payload.manufacturerName || null,
    manufacturerPartNumber: payload.manufacturerPartNumber || payload.partNumber || null,
    oemPartNumber: payload.oemPartNumber || payload.oemPart || null,
    description: payload.description || payload.title || payload.name || null,
    price: Number.isFinite(priceValue) ? priceValue : null,
    currency: payload.currency || "UNKNOWN",
    availability: payload.availability || payload.inStock || payload.status || null,
    harvestTimestamp: rawResult && rawResult.capturedAt ? rawResult.capturedAt : null,
    confidence: Number.isFinite(confidenceValue) ? confidenceValue : null,
    sourceAttribution: {
      supplier,
      source,
      sourceId: rawResult && rawResult.sourceId ? rawResult.sourceId : null,
      country: payload.country || null,
      capturedAt: rawResult && rawResult.capturedAt ? rawResult.capturedAt : null,
      status: rawResult && rawResult.status ? rawResult.status : null
    },
    rawResultReference: {
      source,
      sourceId: rawResult && rawResult.sourceId ? rawResult.sourceId : null,
      capturedAt: rawResult && rawResult.capturedAt ? rawResult.capturedAt : null,
      status: rawResult && rawResult.status ? rawResult.status : null
    }
  }
}

function executeConfiguredSources(sourceDiscovery) {
  const executions = []
  const rawResults = []
  const normalisedResults = []

  sourceDiscovery.forEach(source => {
    const sourceName = String(source.supplier || source.id || "unknown").trim()
    const startTime = new Date().toISOString()
    let executionStatus = "COMPLETED"
    let recordsCollected = 0
    let executionErrors = []
    let rawResult = null

    try {
      const isExecutable = Boolean(source.enabled && source.configurationValid)

      if (!isExecutable) {
        executionStatus = "SKIPPED"
        recordsCollected = 0
      } else {
        recordsCollected = 1
      }

      rawResult = {
        source: sourceName,
        sourceId: source.id,
        status: isExecutable ? "EXECUTED" : "SKIPPED",
        supplier: sourceName,
        country: source.country || "UNKNOWN",
        validation: source.validation || "UNKNOWN",
        catalogue: source.catalogue || "UNKNOWN",
        tradeAccount: source.tradeAccount || "UNKNOWN",
        enabled: Boolean(source.enabled),
        configurationValid: Boolean(source.configurationValid),
        health: source.health || "UNKNOWN",
        capturedAt: startTime,
        payload: {
          supplier: sourceName,
          country: source.country || "UNKNOWN",
          validation: source.validation || "UNKNOWN",
          catalogue: source.catalogue || "UNKNOWN",
          health: source.health || "UNKNOWN"
        }
      }
    } catch (error) {
      executionStatus = "FAILED"
      executionErrors = [error.message || "Execution failed"]
      recordsCollected = 0
      rawResult = {
        source: sourceName,
        status: "FAILED",
        error: error.message || "Execution failed",
        capturedAt: startTime
      }
    }

    const completionTime = new Date().toISOString()
    const durationMs = Math.max(0, new Date(completionTime).getTime() - new Date(startTime).getTime())

    executions.push({
      source: sourceName,
      startTime,
      completionTime,
      durationMs,
      executionStatus,
      recordsCollected,
      executionErrors
    })

    rawResults.push(rawResult)
    normalisedResults.push(normaliseHarvestResult(rawResult))
  })

  return {
    executions,
    rawResults,
    normalisedResults,
    summary: {
      totalSources: sourceDiscovery.length,
      completed: executions.filter(entry => entry.executionStatus === "COMPLETED").length,
      skipped: executions.filter(entry => entry.executionStatus === "SKIPPED").length,
      failed: executions.filter(entry => entry.executionStatus === "FAILED").length
    }
  }
}

async function runHarvesterCycle() {
  if (!runtimeState.running) {
    return {
      success: false,
      skipped: true,
      reason: "service-stopped"
    }
  }

  const lifecycleGeneration = platformHealthLifecycleGeneration

  logger.info("Harvester managed-service cycle executing")
  runtimeState.lastRun = new Date().toISOString()
  runtimeState.heartbeat = runtimeState.lastRun
  updateHealthStatus("RUNNING")
  queuePlatformHealthPersistence(lifecycleGeneration)

  const sourceDiscovery = buildSourceDiscovery()
  runtimeState.discovery = sourceDiscovery
  runtimeState.discoveryLastUpdated = runtimeState.lastRun

  const executionSummary = executeConfiguredSources(sourceDiscovery)
  runtimeState.latestExecution = {
    executedAt: runtimeState.lastRun,
    executions: executionSummary.executions,
    rawResults: executionSummary.rawResults,
    normalisedResults: executionSummary.normalisedResults,
    summary: executionSummary.summary
  }

  try {
    const dir = ensureDataDirectory()
    const filePath = path.join(dir, "supplier-live.json")

    let existing = {}

    try {
      existing = JSON.parse(fs.readFileSync(filePath, "utf8"))
    } catch (error) {
      existing = {}
    }

    const result = {
      service: "harvester",
      status: "COMPLETED",
      lastRun: runtimeState.lastRun,
      data: {
        ...existing,
        harvester: {
          status: "ONLINE",
          lastRun: runtimeState.lastRun,
          source: "managed-service"
        },
        sourceDiscovery: {
          discoveredAt: runtimeState.lastRun,
          totalSources: sourceDiscovery.length,
          sources: sourceDiscovery
        },
        latestExecution: runtimeState.latestExecution
      }
    }

    // persist canonical normalised results for survivability and downstream processing
    try {
      const pers = persistence.persistCanonicalRecords(
        runtimeState.latestExecution.normalisedResults,
        { source: 'harvester', executedAt: runtimeState.lastRun }
      )

      runtimeState.persistence = pers.metadata || null
      result.data.persistence = runtimeState.persistence
    } catch (err) {
      runtimeState.persistence = { status: 'FAILED', error: err.message }
      result.data.persistence = runtimeState.persistence
    }

    runtimeState.federation = buildFederationState(
      sourceDiscovery,
      runtimeState.latestExecution,
      runtimeState.persistence
    )
    result.data.federation = runtimeState.federation

    fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2))
    writeRuntimeArtifact(result)

    runtimeState.lastError = null
    runtimeState.heartbeat = new Date().toISOString()
    updateHealthStatus("ONLINE", { result: "COMPLETED" })
    queuePlatformHealthPersistence(lifecycleGeneration)

    return result
  } catch (error) {
    runtimeState.lastError = error.message
    runtimeState.heartbeat = new Date().toISOString()
    updateHealthStatus("ERROR", { error: error.message })
    queuePlatformHealthPersistence(lifecycleGeneration)

    logger.error("Harvester managed-service cycle failed: " + error.message)

    return {
      success: false,
      error: error.message
    }
  }
}

function startHarvesterManagedService(options = {}) {
  if (runtimeState.running) {
    return runtimeState
  }

  platformHealthLifecycleGeneration += 1

  runtimeState.running = true
  runtimeState.startedAt = new Date().toISOString()
  runtimeState.stoppedAt = null
  runtimeState.lastError = null
  runtimeState.health = {
    status: "STARTING"
  }

  if (!options.skipBootstrap) {
    bootstrapService({ name: "harvester" })
  }

  health.registerService({
    name: "harvester",
    status: "STARTING",
    running: true
  })

  runtimeState.service = health.getService("harvester")
  updateHealthStatus("STARTING")
  queuePlatformHealthPersistence()

  const intervalMs = options.intervalMs || 1000 * 60 * 60 * 6

  if (options.runOnce) {
    runHarvesterCycle()
  } else {
    runHarvesterCycle()

    runtimeState.schedulerTask = scheduler.registerTask(
      "harvester",
      intervalMs,
      async () => {
        await runHarvesterCycle()
      }
    )
  }

  updateHealthStatus("ONLINE")

  logger.info("Harvester managed-service registered")

  return runtimeState
}

async function stopHarvesterManagedService() {
  if (runtimeState.timer) {
    clearInterval(runtimeState.timer)
    runtimeState.timer = null
  }

  platformHealthLifecycleGeneration += 1

  runtimeState.running = false
  runtimeState.stoppedAt = new Date().toISOString()
  updateHealthStatus("STOPPED")
  queuePlatformHealthPersistence()

  const dir = ensureDataDirectory()
  const target = path.join(dir, "harvester-runtime.json")

  const payload = {
    service: "harvester",
    running: false,
    stoppedAt: runtimeState.stoppedAt,
    health: runtimeState.health,
    latestExecution: runtimeState.latestExecution,
    federation: runtimeState.federation || null,
    persistence: runtimeState.persistence || null
  }

  fs.writeFileSync(target, JSON.stringify(payload, null, 2))

  return runtimeState
}

function getHarvesterRuntimeStatus() {
  const service = health.getService("harvester")

  if (!runtimeState.federation || !Array.isArray(runtimeState.federation.members)) {
    runtimeState.federation = buildFederationState(
      runtimeState.discovery,
      runtimeState.latestExecution,
      runtimeState.persistence
    )
  }

  return {
    name: runtimeState.name,
    running: runtimeState.running,
    startedAt: runtimeState.startedAt,
    stoppedAt: runtimeState.stoppedAt,
    lastRun: runtimeState.lastRun,
    lastError: runtimeState.lastError,
    service: service || runtimeState.service,
    health: runtimeState.health,
    schedulerRegistered: Boolean(runtimeState.schedulerTask),
    discovery: {
      sources: runtimeState.discovery,
      lastUpdated: runtimeState.discoveryLastUpdated
    },
    latestExecution: runtimeState.latestExecution,
    federation: runtimeState.federation,
    persistence: runtimeState.persistence || null
  }
}

module.exports = {
  startHarvesterManagedService,
  stopHarvesterManagedService,
  runHarvesterCycle,
  getHarvesterRuntimeStatus
}
