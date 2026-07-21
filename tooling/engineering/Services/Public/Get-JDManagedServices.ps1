#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDManagedServices.ps1
# Work Package: PR-005A.2 – Managed Service Discovery
# Timestamp: 19 July 2026, 17:55
# =====================================================

function Get-JDManagedServices
{
    <#
        .SYNOPSIS
        Returns managed services discovered from the Operational Service Host.

        .DESCRIPTION
        Public API wrapper for the Managed Service Engine discovery layer.
        Consumes the authoritative Host Service Registry through the
        private discovery implementation.
    #>

    [CmdletBinding()]
    param(
        [string]$Name,
        [switch]$IncludeDisabled
    )

    if (-not (Get-Command Get-JDManagedServiceDiscovery -ErrorAction SilentlyContinue))
    {
        throw "Managed Service discovery engine is unavailable."
    }

    Get-JDManagedServiceDiscovery `
        -Name $Name `
        -IncludeDisabled:$IncludeDisabled
}
