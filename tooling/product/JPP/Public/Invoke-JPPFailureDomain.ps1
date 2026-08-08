# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPFailureDomain.ps1
# Programme : PP-001
# WorkPack  : WP-005
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPFailureDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$FailureIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$FailureType,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$FailureCategory,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Detected',
            'Investigating',
            'Confirmed',
            'Resolved',
            'Recurring',
            'Unknown'
        )]
        [string]$FailureStatus,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Critical',
            'High',
            'Medium',
            'Low',
            'Unknown'
        )]
        [string]$FailureSeverity,

        [string]$FailureSummary,

        [string]$FailureDescription,

        [datetime]$FailureDate,

        [datetime]$ResolvedDate,

        [hashtable]$FailureMetadata = @{},

        [datetime]$CreatedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Failure.Domain'

        FailureIdentifier = $FailureIdentifier

        VehicleIdentifier = $VehicleIdentifier

        FailureType = $FailureType

        FailureCategory = $FailureCategory

        FailureStatus = $FailureStatus

        FailureSeverity = $FailureSeverity

        FailureSummary = $FailureSummary

        FailureDescription = $FailureDescription

        FailureDate = $FailureDate

        ResolvedDate = $ResolvedDate

        FailureMetadata = [pscustomobject]$FailureMetadata

        CreatedAt = $CreatedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPFailureDomain