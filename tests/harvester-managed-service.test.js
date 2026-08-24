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

  assert.ok(Array.isArray(status.latestExecution.normalisedResults));
  assert.equal(status.latestExecution.normalisedResults.length, status.latestExecution.rawResults.length);

  const firstNormalisedResult = status.latestExecution.normalisedResults[0];
  assert.equal(typeof firstNormalisedResult.supplier, 'string');
  assert.equal(typeof firstNormalisedResult.source, 'string');
  assert.ok(firstNormalisedResult.sourceAttribution && typeof firstNormalisedResult.sourceAttribution === 'object');
  assert.ok(firstNormalisedResult.rawResultReference && typeof firstNormalisedResult.rawResultReference === 'object');
  assert.equal(firstNormalisedResult.rawResultReference.source, status.latestExecution.rawResults[0].source);

  await stopHarvesterManagedService();
});

test('harvester runtime exposes federation inventory and summary data', async () => {
  const runtime = startHarvesterManagedService({ runOnce: true, skipBootstrap: true });

  assert.equal(runtime.running, true);

  const status = getHarvesterRuntimeStatus();
  assert.ok(status.federation);
  assert.ok(Array.isArray(status.federation.members));
  assert.ok(status.federation.members.length > 0);

  const firstMember = status.federation.members[0];
  assert.equal(typeof firstMember.supplier, 'string');
  assert.ok(['ONLINE', 'DEGRADED', 'OFFLINE'].includes(firstMember.operationalStatus));
  assert.equal(typeof firstMember.enabled, 'boolean');
  assert.ok(firstMember.lastSuccessfulExecution === null || typeof firstMember.lastSuccessfulExecution === 'string');
  assert.ok(typeof firstMember.executionDurationMs === 'number' || firstMember.executionDurationMs === null);
  assert.equal(typeof firstMember.executionCount, 'number');
  assert.equal(typeof firstMember.recordsHarvested, 'number');
  assert.equal(typeof firstMember.recordsPersisted, 'number');
  assert.equal(typeof firstMember.failureCount, 'number');
  assert.ok(typeof firstMember.confidence === 'number' || firstMember.confidence === null);
  assert.ok(typeof firstMember.health === 'string');

  assert.ok(status.federation.summary);
  assert.equal(typeof status.federation.summary.members, 'number');
  assert.equal(typeof status.federation.summary.onlineMembers, 'number');
  assert.equal(typeof status.federation.summary.degradedMembers, 'number');
  assert.equal(typeof status.federation.summary.offlineMembers, 'number');
  assert.equal(typeof status.federation.summary.totalHarvestedRecords, 'number');
  assert.equal(typeof status.federation.summary.totalPersistedRecords, 'number');
  assert.equal(typeof status.federation.summary.federationConfidence, 'number');
  assert.ok(['ONLINE', 'DEGRADED', 'OFFLINE', 'UNKNOWN'].includes(status.federation.summary.federationHealth));

  await stopHarvesterManagedService();
});
