<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Harvester-Runtime.psm1

Timestamp
10 July 2026 20:30

Work Package
WP-S003-00

Component
Harvester Runtime

Purpose
Bootstrap module for the JustDefenders Harvester Runtime.

Responsibilities

    • Load Engineering Common
    • Load all Private Harvester modules
    • Load all Public Harvester modules
    • Export the complete Harvester public API

Notes

    • Consumers interact exclusively with the Public Harvester API.
    • Internal modules remain private.
    • No runtime initialisation occurs during module import.

==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# IMPORT DEPENDENCIES
# ============================================================================

Import-Module `
    (Join-Path $PSScriptRoot "..\Common\Engineering-Common.psm1") `
    -Force

# ============================================================================
# LOAD PRIVATE MODULES
# ============================================================================

$privateFolder = Join-Path $PSScriptRoot "Private"

if (Test-Path $privateFolder)
{
    Get-ChildItem `
        -Path $privateFolder `
        -Filter "Harvester-*.ps1" |
    Sort-Object Name |
    ForEach-Object {

        . $_.FullName

    }
}

# ============================================================================
# LOAD PUBLIC MODULES
# ============================================================================

$publicFolder = Join-Path $PSScriptRoot "Public"

if (Test-Path $publicFolder)
{
    Get-ChildItem `
        -Path $publicFolder `
        -Filter "*Harvester*.ps1" |
    Sort-Object Name |
    ForEach-Object {

        . $_.FullName

    }
}

# ============================================================================
# EXPORT PUBLIC HARVESTER API
# ============================================================================

Export-ModuleMember -Function @(

    #
# Runtime Lifecycle
#

"Start-JDHarvester",
"Stop-JDHarvester",
"Restart-JDHarvester",
"Pause-JDHarvester",
"Resume-JDHarvester",
"Get-JDHarvesterStatus",
"Get-JDHarvesterHealth",
"Get-JDHarvesterMetrics",
"Register-JDHarvesterService",
"Invoke-JDHarvesterCycle"

)

# ============================================================================
# END OF FILE
# ============================================================================