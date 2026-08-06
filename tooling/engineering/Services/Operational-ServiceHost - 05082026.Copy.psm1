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
    (Join-Path $PSScriptRoot "Engineering-Common.psm1") `
    -Force

Import-Module `
    (Join-Path $PSScriptRoot "Operational-Registry.psm1") `
    -Force

Import-Module `
    (Join-Path $PSScriptRoot "ManagedService-Engine.psm1") `
    -Force



# ============================================================================
# LOAD PRIVATE MODULES
# ============================================================================
$privateFolder = Join-Path $PSScriptRoot "Private"

if (Test-Path $privateFolder)
{
    #
    # Runtime-State must always load first because Host-State depends on it.
    #
    $orderedPrivateModules = @(
        "Runtime-State.ps1"
    )

    foreach ($module in $orderedPrivateModules)
    {
        $path = Join-Path $privateFolder $module

        if (Test-Path $path)
        {
            Write-Host "[LOAD ] $($module)" -ForegroundColor Cyan

try
{
    . $path
    Write-Host "[OK   ] $($module)" -ForegroundColor Green
}
catch
{
    Write-Host "[FAIL ] $($module)" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    throw
}
        }
    }

    #
    # Load the remaining private modules alphabetically.
    #
    Get-ChildItem `
        -Path $privateFolder `
        -Filter "*.ps1" |
    Where-Object {
        $_.Name -notin $orderedPrivateModules
    } |
    Sort-Object Name |
ForEach-Object {

    Write-Host "[LOAD ] $($_.Name)" -ForegroundColor Cyan

    try
    {
        . $_.FullName

        Write-Host "[ OK  ] $($_.Name)" -ForegroundColor Green
    }
    catch
    {
        Write-Host "[FAIL ] $($_.Name)" -ForegroundColor Red
        Write-Host $_.Exception.ToString() -ForegroundColor Yellow

        throw
    }
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
    # Harvester Runtime
    #

    "Register-JDHarvesterService",
    "Start-JDHarvester",
    "Stop-JDHarvester",
    "Restart-JDHarvester",
    "Pause-JDHarvester",
    "Resume-JDHarvester",
    "Get-JDHarvesterStatus",
    "Get-JDHarvesterHealth",
    "Get-JDHarvesterMetrics",

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
"Invoke-JDOperationalSchedulerCycle",

#
# Runtime State
#

"Get-JDRuntimeState",
"Test-JDRuntimeState",
"Reset-JDRuntimeState",
"Remove-JDRuntimeState"

)

# ============================================================================
# END OF FILE
# ============================================================================

# ============================================================================
# END OF FILE
# ============================================================================