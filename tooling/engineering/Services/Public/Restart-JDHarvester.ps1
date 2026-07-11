<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Restart-JDHarvester.ps1

Timestamp
11 July 2026 09:40

Work Package
WP-S003-03

Component
Public Harvester API

Purpose
Public entry point for restarting the JustDefenders Harvester Runtime.

This is the supported public API for restarting the Harvester Runtime.
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

function Restart-JDHarvester
{
    [CmdletBinding()]
    param()

    # ------------------------------------------------------------------------
    # Restart Runtime
    # ------------------------------------------------------------------------

    $runtime =
        Restart-JDHarvesterRuntime

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

        RestartSuccessful =
            $runtime.Running

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================