/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\persistence-manager.js
===================================================== */

const fs = require('fs')
const path = require('path')

function ensureDataDirectory() {
  const dir = path.join(process.cwd(), 'data')

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

function ensureRecordsDirectory() {
  const dir = path.join(ensureDataDirectory(), 'canonical-records')

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

function writeJsonFile(target, payload) {
  fs.writeFileSync(target, JSON.stringify(payload, null, 2))
}

function metadataFilePath() {
  return path.join(ensureDataDirectory(), 'persistence-metadata.json')
}

function appendMetadata(entry) {
  const target = metadataFilePath()
  let existing = []

  try {
    existing = JSON.parse(fs.readFileSync(target, 'utf8')) || []
  } catch (e) {
    existing = []
  }

  existing.push(entry)
  writeJsonFile(target, existing)
}

function persistCanonicalRecords(records = [], options = {}) {
  const dir = ensureRecordsDirectory()
  const timestamp = new Date().toISOString()
  const safeTs = String(timestamp).replace(/[:.]/g, '-')
  const fileName = `canonical-${safeTs}.json`
  const filePath = path.join(dir, fileName)

  const payload = {
    persistedAt: timestamp,
    source: options.source || 'unknown',
    executedAt: options.executedAt || null,
    recordCount: Array.isArray(records) ? records.length : 0,
    records: Array.isArray(records) ? records : []
  }

  try {
    writeJsonFile(filePath, payload)

    const metadata = {
      persistedAt: timestamp,
      recordCount: payload.recordCount,
      storageLocation: filePath,
      status: 'SUCCESS',
      source: payload.source,
      executedAt: payload.executedAt
    }

    appendMetadata(metadata)

    return {
      success: true,
      metadata
    }
  } catch (error) {
    const metadata = {
      persistedAt: timestamp,
      recordCount: payload.recordCount,
      storageLocation: filePath,
      status: 'FAILED',
      error: error.message
    }

    try {
      appendMetadata(metadata)
    } catch (e) {
      // best effort
    }

    return {
      success: false,
      metadata
    }
  }
}

function getPersistenceMetadata() {
  const target = metadataFilePath()

  try {
    return JSON.parse(fs.readFileSync(target, 'utf8')) || []
  } catch (e) {
    return []
  }
}

module.exports = {
  persistCanonicalRecords,
  getPersistenceMetadata
}
