<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Pause-JDHarvester.ps1

Timestamp
11 July 2026 09:45

Work Package
WP-S003-04

Component
Public Harvester API

Purpose
Public entry point for pausing the JustDefenders Harvester Runtime.

This is the supported public API for pausing the Harvester Runtime.
Consumers must never manipulate runtime state directly.

Dependencies

- Harvester-Manager.ps1
- Harvester-State.ps1

Notes

- Public module
- Exported by Harvester-Runtime.psm1
- Owns no runtime state

==============================================================================
#>

Set-StrictMode -Version Latest

function Pause-JDHarvester
{
    [CmdletBinding()]
    param()

    # ------------------------------------------------------------------------
    # Pause Runtime
    # ------------------------------------------------------------------------

    $runtime =
        Pause-JDHarvesterRuntime

    # ------------------------------------------------------------------------
    # Return Public Status
    # ------------------------------------------------------------------------

    [PSCustomObject]@{

        Name =
            $runtime.Name

        Version =
            $runtime.Version

        Running =
            $runtime.Running

        Paused =
            $runtime.Paused

        Initialised =
            $runtime.Initialised

        Health =
            $runtime.HealthState

        StartedAt =
            $runtime.StartedAt

        CurrentPhase =
            $runtime.CurrentPhase

        PauseSuccessful =
            $runtime.Paused

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================