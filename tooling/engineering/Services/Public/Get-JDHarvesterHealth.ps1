<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDHarvesterHealth.ps1

Timestamp
11 July 2026 12:30

Work Package
WP-S003-07

Component
Public Harvester API

Purpose
Returns the current health of the JustDefenders Harvester Runtime.

Responsibilities

    • Return the current runtime health.
    • Expose runtime readiness.
    • Perform no runtime modification.

Dependencies

    • Harvester-State.ps1

Notes

    • Public module
    • Exported by Harvester-Runtime.psm1
    • Read-only wrapper

==============================================================================
#>

Set-StrictMode -Version Latest

function Get-JDHarvesterHealth
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    [PSCustomObject]@{

        Name =
            $state.Name

        Version =
            $state.Version

        WorkPackage =
            $state.WorkPackage

        Running =
            $state.Running

        Initialised =
            $state.Initialised

        Health =
            $state.HealthState

        CurrentPhase =
            $state.CurrentPhase

        LastHeartbeat =
            $state.LastHeartbeat

        LastRun =
            $state.LastRun

        LastSuccessfulRun =
            $state.LastSuccessfulRun

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================