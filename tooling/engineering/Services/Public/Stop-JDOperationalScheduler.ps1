<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Stop-JDOperationalScheduler.ps1

Timestamp
10 July 2026 17:40

Work Package
WP-S001-04

Component
Operational Scheduler Runtime

Purpose
Public entry point for stopping the Operational Scheduler.

This cmdlet delegates scheduler shutdown to the private scheduler runtime
without affecting the Operational Service Host.

Dependencies
- Host-Scheduler.ps1

Notes
- Public module
- Exported by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

function Stop-JDOperationalScheduler
{
    [CmdletBinding()]
    param()

    $scheduler = Stop-JDHostScheduler

    return [PSCustomObject]@{

        Name =
            $scheduler.Name

        Running =
            $scheduler.Running

        Initialised =
            $scheduler.Initialised

        StoppedAt =
            $scheduler.StoppedAt

        LastHeartbeat =
            $scheduler.LastHeartbeat

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================