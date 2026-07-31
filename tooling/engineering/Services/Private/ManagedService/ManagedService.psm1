<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService\ManagedService.psm1

Timestamp
30 July 2026 15:00

Work Package
WP-PR-011 — Managed Service Framework

Component
Managed Service Bootstrap

Purpose
Bootstrap module for the Managed Service Framework.

Responsibilities

    • Load Managed Service framework components.
    • Load internal framework implementation modules.
    • Load framework feature modules.
    • Export the Managed Service public API.
    • Perform no runtime initialisation during module import.

Notes

    • This module assembles the Managed Service Framework.
    • Runtime state is created only through exported framework APIs.
    • Framework loading is deterministic.
    • Consumers interact with exported functions only.

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# IMPORT DEPENDENCIES
# ============================================================================

$frameworkFolder = Join-Path $PSScriptRoot "Framework"

$frameworkBootstrap = Join-Path `
    $frameworkFolder `
    "ManagedService-Framework.psm1"

if (-not (Test-Path $frameworkBootstrap))
{
    throw "Managed Service Framework bootstrap was not found: $frameworkBootstrap"
}

Import-Module `
    $frameworkBootstrap `
    -Force

# ============================================================================
# FRAMEWORK FOLDERS
# ============================================================================

$moduleFolders = @(
    "Contract",
    "Validation",
    "Runtime",
    "Lifecycle",
    "Events",
    "Diagnostics",
    "Internal"
)

# ============================================================================
# LOAD FRAMEWORK MODULES
# ============================================================================

foreach ($folder in $moduleFolders)
{
    $path = Join-Path $PSScriptRoot $folder

    if (-not (Test-Path $path))
    {
        Write-Host "[SKIP ] $folder" -ForegroundColor DarkYellow
        continue
    }

    Write-Host "[LOAD ] $folder" -ForegroundColor Cyan

    Get-ChildItem `
        -Path $path `
        -Filter "*.ps1" |
    Sort-Object Name |
    ForEach-Object {

        try
        {
            . $_.FullName

            Write-Host `
                ("[OK   ] {0}" -f $_.Name) `
                -ForegroundColor Green
        }
        catch
        {
            Write-Host `
                ("[FAIL ] {0}" -f $_.Name) `
                -ForegroundColor Red

            Write-Host `
                $_.Exception.Message `
                -ForegroundColor Yellow

            throw
        }

    }

    Write-Host "[DONE ] $folder" -ForegroundColor Green
}

# ============================================================================
# FRAMEWORK STATUS
# ============================================================================

Write-Host "" -ForegroundColor DarkGray
Write-Host "Managed Service Framework Loaded" -ForegroundColor Green
Write-Host "" -ForegroundColor DarkGray

# ============================================================================
# EXPORT PUBLIC API
# ============================================================================

Export-ModuleMember -Function @(

    #
    # Framework
    #

    "Get-JDManagedServiceFramework",

    #
    # Contract
    #

    "New-JDManagedServiceContract",
    "Get-JDManagedServiceContract",

    #
    # Validation
    #

    "Test-JDManagedServiceContract",
    #
    # Runtime
    #

    "New-JDManagedServiceRuntime",
    "Get-JDManagedServiceRuntime",
    "Reset-JDManagedServiceRuntime",

    #
    # Registration
    #

    "Register-JDManagedService",
    "Unregister-JDManagedService",
    "Get-JDManagedService",

    #
    # Lifecycle
    #

    "Start-JDManagedService",
    "Stop-JDManagedService",
    "Restart-JDManagedService",

    #
    # State
    #

    "Get-JDManagedServiceState",
    "Set-JDManagedServiceState",

    #
    # Scheduler
    #

    "Invoke-JDManagedServiceScheduler",

    #
    # Diagnostics
    #

    "Get-JDManagedServiceHealth",
    "Get-JDManagedServiceDiagnostics",

    #
    # Events
    #

    "Publish-JDManagedServiceEvent",
    "Register-JDManagedServiceEvent",
    "Unregister-JDManagedServiceEvent"

)

# ============================================================================
# MODULE COMPLETE
# ============================================================================

Write-Host "" -ForegroundColor DarkGray
Write-Host "============================================================" -ForegroundColor DarkGray
Write-Host " Managed Service Framework Bootstrap Initialised" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor DarkGray
Write-Host "" -ForegroundColor DarkGray

# End of File