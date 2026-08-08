# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeLifecycle.ps1
# Programme : PP-001
# WorkPack  : WP-009
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeLifecycle {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'Uninitialised',
            'Initialised',
            'Starting',
            'Running',
            'Stopping',
            'Stopped',
            'Failed',
            'Unknown'
        )]
        [string]$LifecycleState,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'None',
            'Start',
            'Stop',
            'Restart'
        )]
        [string]$LifecycleAction,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$LifecycleSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]$LifecycleMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]$GeneratedAt = (Get-Date)
    )

    return [pscustomobject]@{
        PSTypeName        = 'JPP.Runtime.Lifecycle'
        RuntimeIdentifier = $RuntimeIdentifier
        LifecycleState    = $LifecycleState
        LifecycleAction   = $LifecycleAction
        LifecycleSummary  = $LifecycleSummary
        LifecycleMetadata = [pscustomobject]$LifecycleMetadata
        GeneratedAt       = $GeneratedAt
        Success           = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeLifecycle