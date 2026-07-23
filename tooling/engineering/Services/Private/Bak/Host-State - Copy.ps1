<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-State.ps1

Timestamp
10 July 2026 12:45

Work Package
WP-S001-03 — Operational Service Host

Component
Private Runtime State

Purpose
Maintains the authoritative runtime state for the Operational Service Host.

This module owns all host-level runtime state. Operational Service state
remains owned by Operational-Registry.

Dependencies
- Engineering-Common
- Operational-Registry

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
============================================================================== 
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE HOST STATE
# ============================================================================

$existingState = Get-Variable `
    -Name JDHostState `
    -Scope Script `
    -ErrorAction SilentlyContinue

if ($null -eq $existingState)
{
    $Script:JDHostState = [PSCustomObject]@{

        Name                = "JustDefenders Operational Service Host"

        Version             = "0.3.0"

        WorkPackage         = "WP-S001-03"

        Initialised         = $false

        Running             = $false

        Starting            = $false

        Stopping            = $false

        SchedulerRunning    = $false

        RecoveryEnabled     = $true

        HealthState         = "UNKNOWN"

        StartedAt           = $null

        StoppedAt           = $null

        LastHeartbeat       = $null

        LastHealthCheck     = $null

        LastRecoveryAttempt = $null

        Statistics = [PSCustomObject]@{

            HostStarts      = 0

            HostStops       = 0

            Restarts        = 0

            HealthChecks    = 0

            RecoveryEvents  = 0

            ManagedServices = 0

        }

    }
}

# ============================================================================
# GET HOST STATE
# ============================================================================

function Get-JDHostState
{
    [CmdletBinding()]
    param()

    return $Script:JDHostState
}

# ============================================================================
# RESET HOST STATE
# ============================================================================

function Reset-JDHostState
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    $state.Initialised         = $false
    $state.Running             = $false
    $state.Starting            = $false
    $state.Stopping            = $false

    $state.SchedulerRunning    = $false

    $state.HealthState         = "UNKNOWN"

    $state.StartedAt           = $null
    $state.StoppedAt           = $null

    $state.LastHeartbeat       = $null
    $state.LastHealthCheck     = $null
    $state.LastRecoveryAttempt = $null

    $state.Statistics.HostStarts      = 0
    $state.Statistics.HostStops       = 0
    $state.Statistics.Restarts        = 0
    $state.Statistics.HealthChecks    = 0
    $state.Statistics.RecoveryEvents  = 0
    $state.Statistics.ManagedServices = 0

    return $state
}

# ============================================================================
# UPDATE HEARTBEAT
# ============================================================================

function Update-JDHostHeartbeat
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    $state.LastHeartbeat = Get-Date

    return $state.LastHeartbeat
}

# ============================================================================
# UPDATE HEALTH
# ============================================================================

function Update-JDHostHealth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet(
            "UNKNOWN",
            "HEALTHY",
            "DEGRADED",
            "FAILED"
        )]
        [string]
        $Health
    )

    $state = Get-JDHostState

    $state.HealthState = $Health

    $state.LastHealthCheck = Get-Date

    $state.Statistics.HealthChecks++

    return $state.HealthState
}

# ============================================================================
# GET HOST STATISTICS
# ============================================================================

function Get-JDHostStateStatistics
{
    [CmdletBinding()]
    param()

    return (Get-JDHostState).Statistics
}

# ============================================================================
# END OF FILE
# ============================================================================