# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPDependencyHealth.ps1
# Programme : PP-001
# WorkPack  : WP-008
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPDependencyHealth {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$DependencyIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$DependencyName,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Operational',
        'Degraded',
        'Offline',
        'Unknown'
    )]
    [string]$DependencyStatus,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Healthy',
        'Degraded',
        'Unhealthy',
        'Unknown'
    )]
    [string]$DependencyHealth,

    [Parameter(Mandatory = $false)]
    [hashtable]$DependencyMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

[pscustomobject]@{
    PSTypeName = 'JPP.Dependency.Health'

    DependencyIdentifier = $DependencyIdentifier

    DependencyName = $DependencyName

    DependencyStatus = $DependencyStatus

    DependencyHealth = $DependencyHealth

    DependencyMetadata = [pscustomobject]$DependencyMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPDependencyHealth