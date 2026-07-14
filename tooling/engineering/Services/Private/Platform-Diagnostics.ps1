<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-006
Component          : Platform Diagnostics
Timestamp          : 15 July 2026 10:30
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Platform-Diagnostics.ps1

Purpose:
    Provides common diagnostics and structured logging for the
    JustDefenders Platform orchestration layer.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

function Write-JDPlatformLog {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][ValidateSet('Information','Warning','Error','Verbose')]
        [string]$Level,
        [Parameter(Mandatory)][string]$Message
    )

    $entry=[pscustomobject]@{
        Timestamp=Get-Date
        Level=$Level
        Message=$Message
    }

    switch($Level){
        'Information' { Write-Information $Message -InformationAction Continue }
        'Warning' { Write-Warning $Message }
        'Error' { Write-Error $Message }
        'Verbose' { Write-Verbose $Message }
    }

    return $entry
}

function Get-JDPlatformDiagnostics {
    [CmdletBinding()]
    param()

    $status = if (Get-Command Get-JDPlatformStatus -ErrorAction SilentlyContinue) {
        Get-JDPlatformStatus
    } else { $null }

    [pscustomobject]@{
        PlatformVersion='0.1.0-pr006'
        Timestamp=Get-Date
        PowerShellVersion=$PSVersionTable.PSVersion.ToString()
        Status=$status
        LoadedModules=(Get-Module | Select-Object -ExpandProperty Name)
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-006
#==============================================================================
