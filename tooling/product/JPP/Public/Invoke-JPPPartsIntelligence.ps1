# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPartsIntelligence.ps1
# Programme : PP-001
# WorkPack  : WP-002
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPartsIntelligence {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$IntelligenceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$PartIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$CompatibilityIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$RecommendedSupplierIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$RecommendedSupplierPricingIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Best Price',
            'Best Availability',
            'OEM Recommended',
            'Aftermarket Alternative',
            'Closest Supplier',
            'Preferred Supplier',
            'Superseded Part',
            'Compatible Alternative'
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
        PSTypeName = 'JPP.Parts.Intelligence'

        IntelligenceIdentifier = $IntelligenceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        PartIdentifier = $PartIdentifier

        CompatibilityIdentifier = $CompatibilityIdentifier

        RecommendedSupplierIdentifier = $RecommendedSupplierIdentifier

        RecommendedSupplierPricingIdentifier = $RecommendedSupplierPricingIdentifier

        RecommendationType = $RecommendationType

        RecommendationConfidence = $RecommendationConfidence

        RecommendationSummary = $RecommendationSummary

        RecommendationMetadata = [pscustomobject]$RecommendationMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPPartsIntelligence