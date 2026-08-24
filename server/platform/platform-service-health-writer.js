// ==================================================================================================
//
// JUSTDEFENDERS® ENGINEERING
//
// Timestamp: 17th August 2026, 22:38 Sydney
//
// File:
//     server/platform/platform-service-health-writer.js
//
// MS-006 — PLATFORM / SERVICE HEALTH
// DEDICATED SUPABASE CURRENT-STATE WRITER
//
// ==================================================================================================

'use strict'

const TABLE_NAME =
  'platform_service_health'

/**
 * Normalise the authoritative health-manager service state into the
 * approved platform_service_health persistence contract.
 *
 * Persistence contract:
 *
 *     service_name
 *     status
 *     running
 *     last_heartbeat_at
 *     error
 *     updated_at
 *
 * This function does not calculate or otherwise determine service health.
 * health-manager.js remains the authoritative semantic source.
 *
 * @param {object} serviceState
 * @returns {object}
 */
function normaliseServiceHealth(serviceState)
{
  if(
    serviceState === null ||
    typeof serviceState !== 'object'
  )
  {
    throw new TypeError(
      'Platform service-health state must be an object.'
    )
  }

  const serviceName =
    typeof serviceState.service_name === 'string'
      ? serviceState.service_name.trim()
      : typeof serviceState.serviceName === 'string'
        ? serviceState.serviceName.trim()
        : typeof serviceState.name === 'string'
          ? serviceState.name.trim()
          : ''

  if(serviceName.length === 0)
  {
    throw new TypeError(
      'Platform service-health state requires a service name.'
    )
  }

  if(typeof serviceState.status !== 'string')
  {
    throw new TypeError(
      'Platform service-health state requires status.'
    )
  }

  if(typeof serviceState.running !== 'boolean')
  {
    throw new TypeError(
      'Platform service-health state requires running.'
    )
  }

  let lastHeartbeatAt = null

  if(
    serviceState.last_heartbeat_at !== undefined &&
    serviceState.last_heartbeat_at !== null
  )
  {
    if(typeof serviceState.last_heartbeat_at !== 'string')
    {
      throw new TypeError(
        'last_heartbeat_at must be a string or null.'
      )
    }

    lastHeartbeatAt =
      serviceState.last_heartbeat_at
  }
  else if(
    serviceState.lastHeartbeat !== undefined &&
    serviceState.lastHeartbeat !== null
  )
  {
    if(serviceState.lastHeartbeat instanceof Date)
    {
      lastHeartbeatAt =
        serviceState.lastHeartbeat.toISOString()
    }
    else if(typeof serviceState.lastHeartbeat === 'string')
    {
      lastHeartbeatAt =
        serviceState.lastHeartbeat
    }
    else
    {
      lastHeartbeatAt =
        String(serviceState.lastHeartbeat)
    }
  }

  let error = null

  if(
    serviceState.error !== undefined &&
    serviceState.error !== null
  )
  {
    error =
      String(serviceState.error)
  }

  return {
    service_name: serviceName,
    status: serviceState.status,
    running: serviceState.running,
    last_heartbeat_at: lastHeartbeatAt,
    error,
    updated_at: new Date().toISOString()
  }
}

/**
 * Persist the current authoritative platform/service-health state.
 *
 * The existing trusted Supabase administrative client is resolved through
 * the already-approved getSupabaseAdminClient() export.
 *
 * Native dynamic import() is intentionally used because:
 *
 *     server/platform/*.js
 *
 * is the active CommonJS server surface, while:
 *
 *     lib/supabase/server.ts
 *
 * exposes getSupabaseAdminClient() as an ES-module named export.
 *
 * The compatibility mechanism was verified against the active Node runtime
 * before this writer was authorised.
 *
 * @param {object} serviceState
 * @returns {Promise<object>}
 */
async function persistPlatformServiceHealth(serviceState)
{
  const record =
    normaliseServiceHealth(serviceState)

  const supabaseServer =
    await import('../../lib/supabase/server.ts')

  if(
    !supabaseServer ||
    typeof supabaseServer.getSupabaseAdminClient !== 'function'
  )
  {
    throw new Error(
      'Approved getSupabaseAdminClient() export is unavailable.'
    )
  }

  const supabase =
    supabaseServer.getSupabaseAdminClient()

  const { data, error } =
    await supabase
      .from(TABLE_NAME)
      .upsert(
        record,
        {
          onConflict: 'service_name'
        }
      )
      .select()
      .single()

  if(error)
  {
    throw new Error(
      `Platform service-health persistence failed: ${error.message}`
    )
  }

  return data
}

module.exports = {
  persistPlatformServiceHealth
}