<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalSchedulerStatus.ps1

Timestamp
10 July 2026 17:45

Work Package
WP-S001-04

Component
Operational Scheduler Runtime

Purpose
Public entry point for retrieving the current status of the Operational
Scheduler.

This cmdlet exposes scheduler runtime information through the Host public API.

Dependencies
- Host-Scheduler.ps1
- Host-ServiceValidation.ps1

Notes
- Public module
- Exported by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

function Get-JDOperationalSchedulerStatus
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $scheduler = Get-JDHostSchedulerStatus

    [PSCustomObject]@{

        Name =
            $scheduler.Name

        Version =
            $scheduler.Version

        Running =
            $scheduler.Running

        Initialised =
            $scheduler.Initialised

        QueueDepth =
            $scheduler.QueueDepth

        ActiveJobs =
            $scheduler.ActiveJobs

        CycleCount =
            $scheduler.CycleCount

        SuccessfulCycles =
            $scheduler.SuccessfulCycles

        FailedCycles =
            $scheduler.FailedCycles

        LastHeartbeat =
            $scheduler.LastHeartbeat

        StartedAt =
            $scheduler.StartedAt

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================