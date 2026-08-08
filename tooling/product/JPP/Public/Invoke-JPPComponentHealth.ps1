# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPComponentHealth.ps1
# Programme : PP-001
# WorkPack  : WP-008
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPComponentHealth {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$ComponentIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$ComponentName,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Operational',
        'Degraded',
        'Offline',
        'Unknown'
    )]
    [string]$ComponentStatus,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Healthy',
        'Degraded',
        'Unhealthy',
        'Unknown'
    )]
    [string]$ComponentHealth,

    [Parameter(Mandatory = $false)]
    [hashtable]$ComponentMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

[pscustomobject]@{
    PSTypeName = 'JPP.Component.Health'

    ComponentIdentifier = $ComponentIdentifier

    ComponentName = $ComponentName

    ComponentStatus = $ComponentStatus

    ComponentHealth = $ComponentHealth

    ComponentMetadata = [pscustomobject]$ComponentMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPComponentHealth