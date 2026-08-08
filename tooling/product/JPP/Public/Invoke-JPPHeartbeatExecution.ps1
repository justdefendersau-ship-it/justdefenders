# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPHeartbeatExecution.ps1

# Programme : PP-001

# WorkPack  : WP-009

# Unit      : EU-004

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPHeartbeatExecution {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$HeartbeatIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'Executed',
            'Blocked',
            'Failed',
            'Unknown'
        )]
        [string]$ExecutionStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ExecutionSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]$ExecutionMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]$GeneratedAt = (Get-Date)
    )

    return [pscustomobject]@{
        PSTypeName          = 'JPP.Heartbeat.Execution'
        RuntimeIdentifier   = $RuntimeIdentifier
        HeartbeatIdentifier = $HeartbeatIdentifier
        ExecutionStatus     = $ExecutionStatus
        ExecutionSummary    = $ExecutionSummary
        ExecutionMetadata   = [pscustomobject]$ExecutionMetadata
        GeneratedAt         = $GeneratedAt
        Success             = $true
    }
}

Export-ModuleMember -Function Invoke-JPPHeartbeatExecution