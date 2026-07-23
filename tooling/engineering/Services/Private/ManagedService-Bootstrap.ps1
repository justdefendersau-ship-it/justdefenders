#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService-Bootstrap.ps1
# Work Package: PR-006F – Host State Singleton Integration
# Timestamp: 22 July 2026, 08:45
# =====================================================

function Initialize-JDManagedServiceEngineBootstrap
{
    <#
        .SYNOPSIS
        Initialises the Managed Service Engine bootstrap context.

        .DESCRIPTION
        Performs bootstrap validation and verifies the
        Operational Service Host singleton runtime state.

        Service discovery, lifecycle orchestration, health monitoring,
        and recovery remain delegated to their respective components.
    #>

    [CmdletBinding()]
    param()

    $requiredModules = @(
        'Engineering-Common',
        'Operational-ServiceHost'
    )

    $loaded = foreach ($module in $requiredModules)
    {
        $present = Get-Module -Name $module -ErrorAction SilentlyContinue

        [PSCustomObject]@{
            Name   = $module
            Loaded = ($null -ne $present)
        }
    }

    #
    # Ensure the runtime singleton exists.
    #
    if (-not (Get-Command Get-JDRuntimeState -ErrorAction SilentlyContinue))
    {
        throw "Runtime-State.ps1 has not been loaded."
    }

    $hostState = Get-JDRuntimeState

    $context = [PSCustomObject]@{

        Name              = 'JustDefenders Managed Service Engine'
        Version           = '1.0.0'
        Build             = 'PR-006F'
        Status            = 'Ready'
        InitialisedAt     = Get-Date

        Dependencies      = $loaded

        RuntimeState      = $hostState

        RuntimeObjectHash = [System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode($hostState)

        PrivateFolder     = Join-Path $PSScriptRoot ''

        PublicFolder      = Join-Path (Split-Path $PSScriptRoot -Parent) 'Public'
    }

    $script:ManagedServiceEngineContext = $context

    return $context
}