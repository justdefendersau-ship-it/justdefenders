# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPOperationalCapabilityConsumption.ps1
#
# Programme : PP-001
#
# WorkPack  : WP-011
#
# Unit      : EU-002
#
# Timestamp : 9 August 2026, 10:03 (AEST)
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalCapabilityConsumption {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $ConsumptionIdentifier,

        [Parameter(Mandatory = $true)]
        [object]
        $EnablementReference,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $CapabilityIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'Consumed',
            'Pending',
            'Blocked',
            'Unknown'
        )]
        [string]
        $ConsumptionStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $ConsumptionSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $ConsumptionMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Operational.Capability.Consumption'

        ConsumptionIdentifier = $ConsumptionIdentifier

        EnablementReference = $EnablementReference

        CapabilityIdentifier = $CapabilityIdentifier

        ConsumptionStatus = $ConsumptionStatus

        ConsumptionSummary = $ConsumptionSummary

        ConsumptionMetadata = [pscustomobject]$ConsumptionMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPOperationalCapabilityConsumption