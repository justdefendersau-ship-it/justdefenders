/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\harvester-service.js
===================================================== */

const fs = require("fs")
const path = require("path")

const logger = require("../shared/logger")
const { bootstrapService } = require("./service-bootstrap")
const health = require("./health-manager")
const scheduler = require("../runtime/central-scheduler")

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
  latestExecution: null
}

function ensureDataDirectory() {
  const dir = path.join(process.cwd(), "data")

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
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
    result
  }

  fs.writeFileSync(target, JSON.stringify(payload, null, 2))
}

function executeConfiguredSources(sourceDiscovery) {
  const executions = []
  const rawResults = []

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
  })

  return {
    executions,
    rawResults,
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

  logger.info("Harvester managed-service cycle executing")
  runtimeState.lastRun = new Date().toISOString()
  runtimeState.heartbeat = runtimeState.lastRun
  updateHealthStatus("RUNNING")

  const sourceDiscovery = buildSourceDiscovery()
  runtimeState.discovery = sourceDiscovery
  runtimeState.discoveryLastUpdated = runtimeState.lastRun

  const executionSummary = executeConfiguredSources(sourceDiscovery)
  runtimeState.latestExecution = {
    executedAt: runtimeState.lastRun,
    executions: executionSummary.executions,
    rawResults: executionSummary.rawResults,
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

    fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2))
    writeRuntimeArtifact(result)

    runtimeState.lastError = null
    runtimeState.heartbeat = new Date().toISOString()
    updateHealthStatus("ONLINE", { result: "COMPLETED" })

    return result
  } catch (error) {
    runtimeState.lastError = error.message
    runtimeState.heartbeat = new Date().toISOString()
    updateHealthStatus("ERROR", { error: error.message })

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

  const intervalMs = options.intervalMs || 1000 * 60 * 60 * 6

  if (options.runOnce) {
    runHarvesterCycle()
  } else {
    runHarvesterCycle()
    runtimeState.timer = setInterval(() => {
      runHarvesterCycle()
    }, intervalMs)
  }

  runtimeState.schedulerTask = scheduler.registerTask(
    "harvester",
    intervalMs,
    async () => {
      await runHarvesterCycle()
    }
  )

  updateHealthStatus("ONLINE")

  logger.info("Harvester managed-service registered")

  return runtimeState
}

async function stopHarvesterManagedService() {
  if (runtimeState.timer) {
    clearInterval(runtimeState.timer)
    runtimeState.timer = null
  }

  runtimeState.running = false
  runtimeState.stoppedAt = new Date().toISOString()
  updateHealthStatus("STOPPED")

  const dir = ensureDataDirectory()
  const target = path.join(dir, "harvester-runtime.json")

  const payload = {
    service: "harvester",
    running: false,
    stoppedAt: runtimeState.stoppedAt,
    health: runtimeState.health,
    latestExecution: runtimeState.latestExecution
  }

  fs.writeFileSync(target, JSON.stringify(payload, null, 2))

  return runtimeState
}

function getHarvesterRuntimeStatus() {
  const service = health.getService("harvester")

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
    latestExecution: runtimeState.latestExecution
  }
}

module.exports = {
  startHarvesterManagedService,
  stopHarvesterManagedService,
  runHarvesterCycle,
  getHarvesterRuntimeStatus
}
