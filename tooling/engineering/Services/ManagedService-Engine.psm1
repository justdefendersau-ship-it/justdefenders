#
# JustDefenders©
# File: tooling\engineering\Services\ManagedService-Engine.psm1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Engine v1.1
#
# Purpose:
#   Integrates bootstrap, discovery, diagnostics, state,
#   registration, lifecycle and health modules.
#

Set-StrictMode -Version Latest

$privatePath = Join-Path $PSScriptRoot 'Private'

$privateModules = @(
    'ManagedService-Bootstrap.ps1',
    'ManagedService-Discovery.ps1',
    'ManagedService-Diagnostics.ps1',
    'ManagedService-State.ps1',
    'ManagedService-Registration.ps1',
    'ManagedService-Lifecycle.ps1',
    'ManagedService-Health.ps1'
)

foreach ($module in $privateModules)
{
    $path = Join-Path $privatePath $module

    if (Test-Path $path)
    {
        . $path
    }
    else
    {
        throw "Managed Service Engine dependency missing: $module"
    }
}

function Initialize-JDManagedServiceEngine
{
    [CmdletBinding()]
    param()

    Initialize-JDManagedServiceEngineBootstrap | Out-Null
    Initialize-JDManagedServiceState | Out-Null

    [pscustomobject]@{
        Engine        = 'Managed Service Engine'
        Version       = '1.1.0'
        InitialisedAt = Get-Date
        RuntimeReady  = $true
    }
}

function Get-JDManagedServiceEngineMetadata
{
    [CmdletBinding()]
    param()

    $states = @(Get-JDManagedServiceStates)

    [pscustomobject]@{
        Name             = 'Managed Service Engine'
        Version          = '1.1.0'
        RuntimeEntries   = $states.Count
        DiscoveryEnabled = $true
        Diagnostics      = $true
    }
}

Export-ModuleMember -Function `
    Initialize-JDManagedServiceEngine,`
    Get-JDManagedServiceEngineMetadata,`
    Register-JDManagedService,`
    Unregister-JDManagedService,`
    Get-JDManagedServiceRegistration,`
    Test-JDManagedServiceRegistration,`
    Invoke-JDManagedServiceStart,`
    Invoke-JDManagedServiceStop,`
    Invoke-JDManagedServiceRestart,`
    Get-JDManagedServiceStatus,`
    Invoke-JDManagedServiceHealth