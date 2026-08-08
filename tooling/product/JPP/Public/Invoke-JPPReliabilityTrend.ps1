# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPReliabilityTrend.ps1
# Programme : PP-001
# WorkPack  : WP-006
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPReliabilityTrend {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$ReliabilityTrendIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$ReliabilityIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Improving',
            'Stable',
            'Declining',
            'Variable',
            'Unknown'
        )]
        [string]$TrendDirection,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Detected',
            'Confirmed',
            'Active',
            'Resolved',
            'Reviewed',
            'Unknown'
        )]
        [string]$TrendStatus,

        [object[]]$ObservationReferences = @(),

        [string]$TrendSummary,

        [hashtable]$TrendMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $observationReferences = @(
        $ObservationReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ReliabilityEventIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ReliabilityEventIdentifier = $_.ReliabilityEventIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.ReliabilityEventIdentifier)
            } |
            Sort-Object ReliabilityEventIdentifier -Unique
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Reliability.Trend'

        ReliabilityTrendIdentifier = $ReliabilityTrendIdentifier

        ReliabilityIdentifier = $ReliabilityIdentifier

        VehicleIdentifier = $VehicleIdentifier

        TrendDirection = $TrendDirection

        TrendStatus = $TrendStatus

        ObservationReferences = $observationReferences

        ObservationCount = $observationReferences.Count

        TrendSummary = $TrendSummary

        TrendMetadata = [pscustomobject]$TrendMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPReliabilityTrend
