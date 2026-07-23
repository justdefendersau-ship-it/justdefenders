<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-002
Component          : Platform Bootstrap
Timestamp          : 15 July 2026 09:30
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Platform-Bootstrap.ps1

Purpose:
    Initialises and validates the JustDefenders Platform environment.
    PR-002 performs bootstrap validation only. It does NOT start the
    Operational Host, Scheduler or Harvester.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Test-JDPlatformDependency {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$ModuleName
    )

    $module = Get-Module -Name $ModuleName -ErrorAction SilentlyContinue
    if (-not $module) {
        throw "Required module '$ModuleName' has not been imported."
    }

    return $true
}

function Initialize-JDPlatform {
    [CmdletBinding()]
    param()

    $requiredModules = @(
        'Operational-ServiceHost',
        'Harvester-Runtime'
    )

    foreach ($module in $requiredModules) {
        Test-JDPlatformDependency -ModuleName $module | Out-Null
    }

    $privateFolder = Join-Path $PSScriptRoot ''
    $publicFolder  = Join-Path (Split-Path $PSScriptRoot -Parent) 'Public'

    if (-not (Test-Path $privateFolder)) {
        throw "Private folder not found: $privateFolder"
    }

    if (-not (Test-Path $publicFolder)) {
        throw "Public folder not found: $publicFolder"
    }

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr002'
        Status          = 'Ready'
        InitialisedAt   = Get-Date
        Modules         = $requiredModules
        PrivateFolder   = $privateFolder
        PublicFolder    = $publicFolder
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-002
#==============================================================================
