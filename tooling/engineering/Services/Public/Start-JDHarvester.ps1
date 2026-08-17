<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDHarvester.ps1

Timestamp
10 July 2026 20:10

Work Package
WP-S003-01

Component
Public Harvester API

Purpose
Public entry point for starting the JustDefenders Harvester Runtime.

This is the supported public API for starting the Harvester. Consumers must
never invoke the internal Harvester Manager directly.

Dependencies
- Harvester-Manager.ps1
- Harvester-State.ps1

Notes
- Public module
- Exported by Harvester Runtime module
- Owns no runtime state
==============================================================================
#>

Set-StrictMode -Version Latest

function Start-JDHarvester
{
    [CmdletBinding()]
    param()

    # ------------------------------------------------------------------------
    # Initialise Runtime
    # ------------------------------------------------------------------------

    Initialize-JDHarvesterState | Out-Null

    # ------------------------------------------------------------------------
    # Register Authorised MS-006 Sources
    #
    # Registration and configuration execute within the same loaded
    # Harvester-Runtime module instance that owns the source registry.
    # ------------------------------------------------------------------------

    Register-JDHarvesterSources | Out-Null

    Set-JDHarvesterSourceConfiguration | Out-Null

    # ------------------------------------------------------------------------
    # Start Runtime
    # ------------------------------------------------------------------------

    $runtime =
        Start-JDHarvesterRuntime

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

        Timestamp =
            Get-Date
    }
}

# ============================================================================
# END OF FILE
# ============================================================================