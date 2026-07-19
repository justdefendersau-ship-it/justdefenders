#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Initialize-JDManagedServiceEngine.ps1
# Work Package: PR-005A.1 – Managed Service Engine Bootstrap
# Timestamp: 19 July 2026, 17:00
# =====================================================

function Initialize-JDManagedServiceEngine
{
    <#
        .SYNOPSIS
        Initialises the JustDefenders Managed Service Engine.

        .DESCRIPTION
        Executes bootstrap initialisation and returns the engine context.
        This is the public entry point for PR-005A.1.
    #>

    [CmdletBinding()]
    param()

    if (-not (Get-Command Initialize-JDManagedServiceEngineBootstrap -ErrorAction SilentlyContinue))
    {
        throw "Initialize-JDManagedServiceEngineBootstrap is not available."
    }

    $context = Initialize-JDManagedServiceEngineBootstrap

    Write-Verbose "Managed Service Engine initialised."

    return $context
}
