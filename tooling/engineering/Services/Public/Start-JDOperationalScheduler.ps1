<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDOperationalScheduler.ps1

Timestamp
10 July 2026 17:35

Work Package
WP-S001-04

Component
Operational Scheduler Runtime

Purpose
Public entry point for starting the Operational Scheduler.

This cmdlet validates the Host Runtime before delegating scheduler startup to
the private scheduler runtime.

Dependencies
- Host-Scheduler.ps1
- Host-ServiceValidation.ps1

Notes
- Public module
- Exported by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

function Start-JDOperationalScheduler
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $scheduler = Start-JDHostScheduler

    return [PSCustomObject]@{

        Name =
            $scheduler.Name

        Running =
            $scheduler.Running

        Initialised =
            $scheduler.Initialised

        StartedAt =
            $scheduler.StartedAt

        LastHeartbeat =
            $scheduler.LastHeartbeat

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================