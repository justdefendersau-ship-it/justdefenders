const test = require('node:test');
const assert = require('node:assert/strict');

const { startHarvesterManagedService, stopHarvesterManagedService, getHarvesterRuntimeStatus } = require('../server/platform/harvester-service');

test('harvester managed service starts, reports health, and stops cleanly', async () => {
  const runtime = startHarvesterManagedService({ runOnce: true, skipBootstrap: true });

  assert.equal(runtime.running, true);
  assert.equal(runtime.name, 'harvester');
  assert.ok(Array.isArray(runtime.discovery));
  assert.ok(runtime.discovery.length > 0);

  const status = getHarvesterRuntimeStatus();
  assert.equal(status.running, true);
  assert.equal(status.service.name, 'harvester');
  assert.equal(status.health.status, 'ONLINE');
  assert.equal(status.schedulerRegistered, true);
  assert.ok(Array.isArray(status.discovery.sources));
  assert.ok(status.discovery.sources.length > 0);
  assert.equal(typeof status.discovery.lastUpdated, 'string');

  await stopHarvesterManagedService();

  const stoppedStatus = getHarvesterRuntimeStatus();
  assert.equal(stoppedStatus.running, false);
  assert.equal(stoppedStatus.health.status, 'STOPPED');
});

test('harvester managed service records execution metadata and raw harvest results', async () => {
  const runtime = startHarvesterManagedService({ runOnce: true, skipBootstrap: true });

  assert.equal(runtime.running, true);

  const status = getHarvesterRuntimeStatus();
  assert.ok(status.latestExecution);
  assert.ok(Array.isArray(status.latestExecution.executions));
  assert.ok(status.latestExecution.executions.length > 0);

  const firstExecution = status.latestExecution.executions[0];
  assert.equal(typeof firstExecution.source, 'string');
  assert.equal(typeof firstExecution.startTime, 'string');
  assert.equal(typeof firstExecution.completionTime, 'string');
  assert.equal(typeof firstExecution.durationMs, 'number');
  assert.ok(['COMPLETED', 'SKIPPED', 'FAILED'].includes(firstExecution.executionStatus));
  assert.equal(typeof firstExecution.recordsCollected, 'number');
  assert.ok(Array.isArray(firstExecution.executionErrors));

  assert.ok(Array.isArray(status.latestExecution.rawResults));
  assert.ok(status.latestExecution.rawResults.length > 0);

  await stopHarvesterManagedService();
});
