<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-005
Component          : Platform Lifecycle
Timestamp          : 15 July 2026 10:15
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Platform-Lifecycle.ps1

Purpose:
    Coordinates the platform lifecycle without owning runtime state.
    PR-005 introduces lifecycle orchestration helpers and unified
    validation flow.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Test-JDPlatformReadiness {
    [CmdletBinding()]
    param()

    $checks = [ordered]@{
        PlatformInitialised = [bool](Get-Command Initialize-JDPlatform -ErrorAction SilentlyContinue)
        HostAvailable       = [bool](Get-Command Start-JDOperationalHost -ErrorAction SilentlyContinue)
        HarvesterAvailable  = [bool](Get-Command Start-JDHarvester -ErrorAction SilentlyContinue)
    }

    [pscustomobject]@{
        Ready     = ($checks.Values -notcontains $false)
        Timestamp = Get-Date
        Checks    = $checks
    }
}

function Invoke-JDPlatformStartup {
    [CmdletBinding()]
    param()

    $bootstrap = Initialize-JDPlatform

    $host = Start-JDOperationalHost

    $harvester = Start-JDHarvester

    $readiness = Test-JDPlatformReadiness

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr005'
        StartupTime     = Get-Date
        Bootstrap       = $bootstrap
        Host            = $host
        Harvester       = $harvester
        Readiness       = $readiness
    }
}

function Invoke-JDPlatformShutdown {
    [CmdletBinding()]
    param()

    if (Get-Command Stop-JDHarvester -ErrorAction SilentlyContinue) {
        Stop-JDHarvester | Out-Null
    }

    if (Get-Command Stop-JDOperationalHost -ErrorAction SilentlyContinue) {
        Stop-JDOperationalHost | Out-Null
    }

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr005'
        Status          = 'Stopped'
        Timestamp       = Get-Date
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-005
#==============================================================================
