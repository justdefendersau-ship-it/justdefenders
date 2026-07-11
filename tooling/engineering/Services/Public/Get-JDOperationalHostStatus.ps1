<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalHostStatus.ps1

Timestamp
10 July 2026 11:15

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Public entry point for retrieving the current status of the Operational
Service Host. Returns a consolidated view of runtime state, scheduler,
managed services and runtime statistics.

Dependencies
- Host-Lifecycle.ps1
- Host-Health.ps1
- Host-Scheduler.ps1
- Host-ServiceLookup.ps1

Notes
- Public module.
- Exported by Operational-ServiceHost.psm1.
==============================================================================#
#>

Set-StrictMode -Version Latest

function Get-JDOperationalHostStatus
{
    [CmdletBinding()]
    param()

    $hostState = Get-JDHostState

    $hostStatus = Get-JDHostStatus

    $scheduler = Get-JDHostSchedulerStatus

    $statistics = Get-JDHostStatistics

    Update-JDHostManagedServiceCount | Out-Null

    [PSCustomObject]@{

        Name               = $hostStatus.Name

        Version            = $hostStatus.Version

        WorkPackage        = $hostStatus.WorkPackage

        Running            = $hostStatus.Running

        Initialised        = $hostStatus.Initialised

        Health             = $hostStatus.Health

        SchedulerRunning   = $scheduler.Running

        RecoveryEnabled    = $hostState.RecoveryEnabled

        ManagedServices    = $statistics.ManagedServices

        HostStarts         = $statistics.HostStarts

        HostStops          = $statistics.HostStops

        Restarts           = $statistics.Restarts

        HealthChecks       = $statistics.HealthChecks

        RecoveryEvents     = $statistics.RecoveryEvents

        StartedAt          = $hostStatus.StartedAt

        StoppedAt          = $hostStatus.StoppedAt

        LastHeartbeat      = $statistics.LastHeartbeat

        LastHealthCheck    = $statistics.LastHealthCheck

        Timestamp          = Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================