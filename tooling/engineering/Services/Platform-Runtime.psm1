<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-001
Component          : Platform Runtime Foundation
Timestamp          : 15 July 2026 09:20
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Platform-Runtime.psm1

Purpose:
    Root orchestration module for the JustDefenders Platform.
    PR-001 establishes the module foundation only. It imports required
    runtime modules, loads private/public scripts and exports the
    platform command surface. No runtime orchestration occurs in PR-001.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:PlatformVersion = '0.1.0-pr001'

# Runtime modules orchestrated by the platform.
$script:PlatformModules = @(
    'Operational-ServiceHost.psm1',
    'Harvester-Runtime.psm1'
)

function Import-JDPlatformRuntimeModules {
    [CmdletBinding()]
    param()

    $servicesRoot = $PSScriptRoot

    foreach ($moduleName in $script:PlatformModules) {
        $modulePath = Join-Path $servicesRoot $moduleName

        if (-not (Test-Path $modulePath)) {
            throw "Required runtime module not found: $modulePath"
        }

        Import-Module $modulePath -Force -ErrorAction Stop
    }
}

function Import-JDPlatformScripts {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Folder
    )

    if (-not (Test-Path $Folder)) {
        return
    }

    Get-ChildItem -Path $Folder -Filter '*.ps1' -File |
        Sort-Object Name |
        ForEach-Object {
            . $_.FullName
        }
}

function Get-JDPlatformMetadata {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Name           = 'JustDefenders Platform'
        Version        = $script:PlatformVersion
        RuntimeModules = $script:PlatformModules
        LoadedAt       = Get-Date
    }
}

# ---------------------------------------------------------------------------
# Bootstrap
# ---------------------------------------------------------------------------

Import-JDPlatformRuntimeModules

Import-JDPlatformScripts -Folder (Join-Path $PSScriptRoot 'Private')
Import-JDPlatformScripts -Folder (Join-Path $PSScriptRoot 'Public')

$publicCommands = @(
    'Start-JDPlatform',
    'Stop-JDPlatform',
    'Restart-JDPlatform',
    'Get-JDPlatformStatus'
)

Export-ModuleMember -Function $publicCommands

#==============================================================================
# END OF WP-PLATFORM-001 PR-001
#==============================================================================
