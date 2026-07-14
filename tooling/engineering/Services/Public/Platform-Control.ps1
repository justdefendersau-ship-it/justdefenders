<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-007
Component          : Platform Public Commands
Timestamp          : 15 July 2026 10:45
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Platform-Control.ps1

Purpose:
    Completes the public platform command surface by implementing the
    Stop-JDPlatform and Restart-JDPlatform commands. These commands
    orchestrate the existing lifecycle helpers and do not own runtime state.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Stop-JDPlatform {
    [CmdletBinding()]
    param()

    if (-not (Get-Command Invoke-JDPlatformShutdown -ErrorAction SilentlyContinue)) {
        throw "Invoke-JDPlatformShutdown is unavailable."
    }

    Write-Verbose "Stopping JustDefenders Platform..."

    Invoke-JDPlatformShutdown
}

function Restart-JDPlatform {
    [CmdletBinding()]
    param()

    if (-not (Get-Command Invoke-JDPlatformShutdown -ErrorAction SilentlyContinue)) {
        throw "Invoke-JDPlatformShutdown is unavailable."
    }

    if (-not (Get-Command Invoke-JDPlatformStartup -ErrorAction SilentlyContinue)) {
        throw "Invoke-JDPlatformStartup is unavailable."
    }

    Write-Verbose "Restarting JustDefenders Platform..."

    $shutdown = Invoke-JDPlatformShutdown
    $startup  = Invoke-JDPlatformStartup

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr007'
        Timestamp       = Get-Date
        Shutdown        = $shutdown
        Startup         = $startup
        Status          = 'Restarted'
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-007
#==============================================================================
