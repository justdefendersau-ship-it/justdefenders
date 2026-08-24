const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const path = require('path')

const { startHarvesterManagedService, stopHarvesterManagedService, getHarvesterRuntimeStatus } = require('../server/platform/harvester-service')

function dataPath(...parts){
  return path.join(process.cwd(), 'data', ...parts)
}

test('harvester persists canonical records and metadata that survive restart', async () => {
  // ensure clean state for test
  const metaFile = dataPath('persistence-metadata.json')
  try { fs.unlinkSync(metaFile) } catch (e) {}

  const recordsDir = dataPath('canonical-records')
  try {
    if (fs.existsSync(recordsDir)){
      fs.readdirSync(recordsDir).forEach(f => fs.unlinkSync(path.join(recordsDir,f)))
    }
  } catch (e) {}

  // start a single run
  const runtime = startHarvesterManagedService({ runOnce: true, skipBootstrap: true })

  assert.equal(runtime.running, true)

  // allow a tick for persistence to complete
  await new Promise(resolve => setTimeout(resolve, 50))

  const status = getHarvesterRuntimeStatus()
  assert.ok(status.latestExecution)

  // metadata file should exist
  assert.ok(fs.existsSync(metaFile))

  const metadata = JSON.parse(fs.readFileSync(metaFile, 'utf8'))
  assert.ok(Array.isArray(metadata))
  assert.ok(metadata.length > 0)

  const last = metadata[metadata.length - 1]
  assert.equal(typeof last.persistedAt, 'string')
  assert.equal(typeof last.recordCount, 'number')
  assert.equal(typeof last.storageLocation, 'string')
  assert.ok(fs.existsSync(last.storageLocation))

  // stop service
  await stopHarvesterManagedService()

  // restart service and ensure metadata still present
  const runtime2 = startHarvesterManagedService({ runOnce: true, skipBootstrap: true })
  await new Promise(resolve => setTimeout(resolve, 50))

  assert.ok(fs.existsSync(metaFile))
  const metadata2 = JSON.parse(fs.readFileSync(metaFile, 'utf8'))
  assert.ok(Array.isArray(metadata2))
  assert.ok(metadata2.length >= metadata.length)

  await stopHarvesterManagedService()
})
