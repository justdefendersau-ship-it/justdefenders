# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPVehicleReliability.ps1
# Programme : PP-001
# WorkPack  : WP-004
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPVehicleReliability {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$VehicleReliabilityIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Excellent',
            'Good',
            'Attention Required',
            'Poor',
            'Critical',
            'Unknown'
        )]
        [string]$ReliabilityStatus,

        [Parameter(Mandatory)]
        [ValidateRange(0, 100)]
        [int]$ReliabilityScore,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ReliabilitySummary,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$MaintenanceReliabilityIndicator,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$PartsReliabilityIndicator,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$FailureHistoryIndicator,

        [hashtable]$ReliabilityMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Vehicle.Reliability'

        VehicleReliabilityIdentifier = $VehicleReliabilityIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ReliabilityStatus = $ReliabilityStatus

        ReliabilityScore = $ReliabilityScore

        ReliabilitySummary = $ReliabilitySummary

        MaintenanceReliabilityIndicator = $MaintenanceReliabilityIndicator

        PartsReliabilityIndicator = $PartsReliabilityIndicator

        FailureHistoryIndicator = $FailureHistoryIndicator

        ReliabilityMetadata = [pscustomobject]$ReliabilityMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPVehicleReliability