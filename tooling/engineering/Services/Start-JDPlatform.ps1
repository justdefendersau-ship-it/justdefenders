<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-003
Component          : Platform Start Command
Timestamp          : 15 July 2026 09:45
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDPlatform.ps1

Purpose:
    Starts the JustDefenders Platform lifecycle.
    PR-003 validates the platform bootstrap and starts the Operational Host.
    Harvester startup is intentionally deferred to PR-004.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Start-JDPlatform {
    [CmdletBinding()]
    param()

    if (-not (Get-Command Initialize-JDPlatform -ErrorAction SilentlyContinue)) {
        throw "Initialize-JDPlatform is unavailable. Ensure Platform-Bootstrap.ps1 has been loaded."
    }

    if (-not (Get-Command Start-JDOperationalHost -ErrorAction SilentlyContinue)) {
        throw "Start-JDOperationalHost is unavailable. Ensure Operational-ServiceHost.psm1 is imported."
    }

    Write-Verbose "Initialising JustDefenders Platform..."

    $bootstrap = Initialize-JDPlatform

    Write-Verbose "Starting Operational Host..."

    $hostResult = Start-JDOperationalHost

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr003'
        Status          = 'OperationalHostStarted'
        StartedAt       = Get-Date
        Bootstrap       = $bootstrap
        OperationalHost = $hostResult
        Harvester       = 'Deferred to PR-004'
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-003
#==============================================================================
