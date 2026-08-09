# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPOperationalEnablementBoundary.ps1
#
# Programme : PP-001
#
# WorkPack  : WP-011
#
# Unit      : EU-001
#
# Timestamp : 9 August 2026, 10:01 (AEST)
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalEnablementBoundary {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $EnablementIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'Enabled',
            'Disabled',
            'Unknown'
        )]
        [string]
        $EnablementStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $EnablementSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $EnablementMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Operational.Enablement'

        EnablementIdentifier = $EnablementIdentifier

        EnablementStatus = $EnablementStatus

        EnablementSummary = $EnablementSummary

        EnablementMetadata = [pscustomobject]$EnablementMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPOperationalEnablementBoundary