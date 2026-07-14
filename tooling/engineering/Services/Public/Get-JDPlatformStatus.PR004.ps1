<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-004
Component          : Platform Harvester Integration
Timestamp          : 15 July 2026 10:00
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDPlatformStatus.ps1

Purpose:
    PR-004 extends platform startup by validating the Operational Host and
    starting the Harvester runtime. It returns a unified platform status
    object assembled from existing runtime components. No duplicate runtime
    state is created.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-JDPlatformStatus {
    [CmdletBinding()]
    param()

    $hostStatus = $null
    $harvesterStatus = $null

    if (Get-Command Get-JDOperationalHostStatus -ErrorAction SilentlyContinue) {
        $hostStatus = Get-JDOperationalHostStatus
    }

    if (Get-Command Get-JDHarvesterStatus -ErrorAction SilentlyContinue) {
        $harvesterStatus = Get-JDHarvesterStatus
    }

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr004'
        Timestamp       = Get-Date
        OperationalHost = $hostStatus
        Harvester       = $harvesterStatus
        OverallStatus   = if ($hostStatus) { 'PlatformReady' } else { 'Initialising' }
    }
}

function Start-JDPlatformHarvester {
    [CmdletBinding()]
    param()

    if (-not (Get-Command Start-JDHarvester -ErrorAction SilentlyContinue)) {
        throw "Start-JDHarvester is unavailable. Ensure Harvester-Runtime.psm1 is imported."
    }

    Write-Verbose "Starting Harvester Runtime..."
    Start-JDHarvester
}

# END OF WP-PLATFORM-001 PR-004
