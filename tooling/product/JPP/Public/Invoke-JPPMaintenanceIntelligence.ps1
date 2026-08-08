# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPMaintenanceIntelligence.ps1
# Programme : PP-001
# WorkPack  : WP-003
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPMaintenanceIntelligence {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$IntelligenceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$MaintenanceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$ScheduleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$ServiceHistoryIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Maintenance Due',
            'Maintenance Overdue',
            'Upcoming Maintenance',
            'Maintenance History Gap',
            'Service History Available',
            'Service Required',
            'Maintenance Review'
        )]
        [string]$RecommendationType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Confirmed',
            'High',
            'Medium',
            'Low',
            'Unverified'
        )]
        [string]$RecommendationConfidence,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$RecommendationSummary,

        [hashtable]$RecommendationMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Maintenance.Intelligence'

        IntelligenceIdentifier = $IntelligenceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        MaintenanceIdentifier = $MaintenanceIdentifier

        ScheduleIdentifier = $ScheduleIdentifier

        ServiceHistoryIdentifier = $ServiceHistoryIdentifier

        RecommendationType = $RecommendationType

        RecommendationConfidence = $RecommendationConfidence

        RecommendationSummary = $RecommendationSummary

        RecommendationMetadata = [pscustomobject]$RecommendationMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPMaintenanceIntelligence