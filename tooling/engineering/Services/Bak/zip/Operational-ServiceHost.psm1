<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-ServiceHost.psm1

Timestamp
10 July 2026 12:00

Work Package
WP-S001-03 — Operational Service Host

Component
Operational Service Host

Purpose
Bootstrap module for the Operational Service Host.

Responsibilities

    • Load Engineering Common
    • Load Operational Registry
    • Load all Private modules
    • Load all Public modules
    • Export the complete Host Runtime public API

Notes

    • The Operational Registry is an internal implementation detail.
    • Consumers interact exclusively with the Host Runtime.
    • No runtime initialisation occurs during module import.

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# IMPORT DEPENDENCIES
# ============================================================================

Import-Module `
    (Join-Path $PSScriptRoot "..\Common\Engineering-Common.psm1") `
    -Force

Import-Module `
    (Join-Path $PSScriptRoot "Operational-Registry.psm1") `
    -Force

# ============================================================================
# LOAD PRIVATE MODULES
# ============================================================================

$privateFolder = Join-Path $PSScriptRoot "Private"

if (Test-Path $privateFolder)
{
    Get-ChildItem `
        -Path $privateFolder `
        -Filter "*.ps1" |
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
        -Filter "*.ps1" |
    Sort-Object Name |
    ForEach-Object {

        . $_.FullName

    }
}

# ============================================================================
# EXPORT PUBLIC HOST API
# ============================================================================

Export-ModuleMember -Function @(

    #
    # Host Lifecycle
    #

    "Start-JDOperationalHost",
    "Stop-JDOperationalHost",
    "Get-JDOperationalHostStatus",

    #
    # Service Lifecycle
    #

    "Start-JDOperationalService",
    "Stop-JDOperationalService",
    "Restart-JDOperationalService",
    "Get-JDOperationalServiceHealth",

    #
    # Host Registration API
    #

    "Register-JDOperationalHostService",
    "Get-JDOperationalHostService",
    "Get-JDOperationalHostServices",
    "Unregister-JDOperationalHostService",

    #
    # Scheduler Runtime
    #

    "Start-JDOperationalScheduler",
    "Stop-JDOperationalScheduler",
    "Get-JDOperationalSchedulerStatus",
    "Get-JDOperationalSchedulerMetrics",
    "Invoke-JDOperationalSchedulerCycle"

)

# ============================================================================
# END OF FILE
# ============================================================================

# ============================================================================
# END OF FILE
# ============================================================================