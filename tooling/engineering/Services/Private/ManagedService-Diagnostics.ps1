#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService-Diagnostics.ps1
# Work Package: PR-005A.1 – Managed Service Engine Bootstrap
# Timestamp: 19 July 2026, 17:00
# =====================================================

function Get-JDManagedServiceEngineDiagnostics
{
    <#
        .SYNOPSIS
        Returns diagnostic information for the Managed Service Engine.

        .DESCRIPTION
        Provides bootstrap and module diagnostics only.
        Health monitoring and recovery diagnostics are implemented
        in later PR-005A work packages.
    #>

    [CmdletBinding()]
    param()

    $loadedModules = Get-Module | Select-Object Name, Version

    [PSCustomObject]@{
        Name            = 'JustDefenders Managed Service Engine'
        Version         = '1.0.0'
        Build           = 'PR-005A.1'
        Timestamp       = Get-Date
        Status          = if ($script:ManagedServiceEngineContext) { $script:ManagedServiceEngineContext.Status } else { 'NotInitialised' }
        Dependencies    = if ($script:ManagedServiceEngineContext) { $script:ManagedServiceEngineContext.Dependencies } else { @() }
        LoadedModules   = $loadedModules
    }
}

function Test-JDManagedServiceEngine
{
    <#
        .SYNOPSIS
        Performs bootstrap validation.
    #>

    [CmdletBinding()]
    param()

    [PSCustomObject]@{
        BootstrapInitialised = ($null -ne $script:ManagedServiceEngineContext)
        DiagnosticsAvailable = $true
        Result               = if ($null -ne $script:ManagedServiceEngineContext) { 'PASS' } else { 'NOT_INITIALISED' }
        Timestamp            = Get-Date
    }
}
