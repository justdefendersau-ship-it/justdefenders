<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Stop-JDHarvester.ps1

Timestamp
11 July 2026 09:30

Work Package
WP-S003-02

Component
Public Harvester API

Purpose
Public entry point for stopping the JustDefenders Harvester Runtime.

This is the supported public API for stopping the Harvester Runtime.
Consumers must never invoke the internal Harvester Manager directly.

Dependencies

- Harvester-Manager.ps1
- Harvester-State.ps1

Notes

- Public module
- Exported by Harvester-Runtime.psm1
- Owns no runtime state
==============================================================================#
#>

Set-StrictMode -Version Latest

function Stop-JDHarvester
{
    [CmdletBinding()]
    param()

    # ------------------------------------------------------------------------
    # Stop Runtime
    # ------------------------------------------------------------------------

    $runtime =
        Stop-JDHarvesterRuntime

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

        StoppedAt =
            $runtime.StoppedAt

        CurrentPhase =
            $runtime.CurrentPhase

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================