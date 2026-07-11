<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Invoke-JDOperationalSchedulerCycle.ps1

Timestamp
10 July 2026 18:00

Work Package
WP-S001-04

Component
Operational Scheduler Runtime

Purpose
Public entry point for executing a single Operational Scheduler cycle.

This cmdlet validates the Host Runtime before delegating execution to the
private scheduler runtime. The Scheduler Runtime owns all execution logic.

Dependencies
- Host-Scheduler.ps1
- Host-ServiceValidation.ps1

Notes
- Public module
- Exported by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

function Invoke-JDOperationalSchedulerCycle
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $success = Invoke-JDHostSchedulerCycle

    $metrics = Get-JDHostSchedulerMetrics

    return [PSCustomObject]@{

        Success =
            [bool]$success

        Running =
            $metrics.Running

        QueueDepth =
            $metrics.QueueDepth

        ActiveJobs =
            $metrics.ActiveJobs

        CycleCount =
            $metrics.CycleCount

        SuccessfulCycles =
            $metrics.SuccessfulCycles

        FailedCycles =
            $metrics.FailedCycles

        Executions =
            $metrics.Executions

        LastHeartbeat =
            $metrics.LastHeartbeat

        LastCycleStarted =
            $metrics.LastCycleStarted

        LastCycleCompleted =
            $metrics.LastCycleCompleted

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================