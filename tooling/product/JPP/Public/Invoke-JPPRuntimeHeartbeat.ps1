# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeHeartbeat.ps1
# Programme : PP-001
# WorkPack  : WP-008
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeHeartbeat {
[CmdletBinding()]
param (
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$RuntimeIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9-]+$')]
    [string]$HeartbeatIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateSet('Active', 'Stale', 'Unknown')]
    [string]$HeartbeatStatus,

    [Parameter(Mandatory = $true)]
    [datetime]$HeartbeatTimestamp,

    [Parameter(Mandatory = $false)]
    [int64]$HeartbeatSequence = 0,

    [Parameter(Mandatory = $false)]
    [hashtable]$HeartbeatMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

[pscustomobject]@{
    PSTypeName = 'JPP.Runtime.Heartbeat'

    RuntimeIdentifier = $RuntimeIdentifier

    HeartbeatIdentifier = $HeartbeatIdentifier

    HeartbeatStatus = $HeartbeatStatus

    HeartbeatTimestamp = $HeartbeatTimestamp

    HeartbeatSequence = $HeartbeatSequence

    HeartbeatMetadata = [pscustomobject]$HeartbeatMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPRuntimeHeartbeat