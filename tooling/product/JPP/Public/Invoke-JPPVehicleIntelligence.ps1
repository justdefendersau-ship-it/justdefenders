# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPVehicleIntelligence.ps1
# Programme : PP-001
# WorkPack  : WP-004
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPVehicleIntelligence {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$IntelligenceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object]$VehicleIntelligenceDomainReference,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object]$VehicleHealthReference,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object]$VehicleReliabilityReference,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object]$FailureHistoryReference,

        [object[]]$VehicleIntelligenceSearchReferences = @(),

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object]$VehicleIntelligenceDashboardReference,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$IntelligenceSummary,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Healthy',
            'Stable',
            'Attention Required',
            'At Risk',
            'Critical',
            'Unknown'
        )]
        [string]$IntelligenceStatus,

        [hashtable]$IntelligenceMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $searchReferences = @(
        $VehicleIntelligenceSearchReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        SearchIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        SearchIdentifier = $_.SearchIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.SearchIdentifier)
            } |
            Sort-Object SearchIdentifier -Unique
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Vehicle.Intelligence'

        IntelligenceIdentifier = $IntelligenceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        VehicleIntelligenceDomainReference = $VehicleIntelligenceDomainReference

        VehicleHealthReference = $VehicleHealthReference

        VehicleReliabilityReference = $VehicleReliabilityReference

        FailureHistoryReference = $FailureHistoryReference

        VehicleIntelligenceSearchReferences = $searchReferences

        VehicleIntelligenceDashboardReference = $VehicleIntelligenceDashboardReference

        IntelligenceSummary = $IntelligenceSummary

        IntelligenceStatus = $IntelligenceStatus

        IntelligenceMetadata = [pscustomobject]$IntelligenceMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPVehicleIntelligence