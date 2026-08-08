# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPSupplierPricing.ps1
# Programme : PP-001
# WorkPack  : WP-002
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPSupplierPricing {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$SupplierPricingIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$SupplierIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$PartIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$Currency,

        [Parameter(Mandatory)]
        [ValidateRange(0,[double]::MaxValue)]
        [double]$UnitPrice,

        [Parameter(Mandatory)]
        [ValidateSet(
            'In Stock',
            'Limited Stock',
            'Back Order',
            'Pre Order',
            'Out Of Stock',
            'Discontinued',
            'Unknown'
        )]
        [string]$AvailabilityStatus,

        [ValidateRange(0,[int]::MaxValue)]
        [int]$StockQuantity = 0,

        [string]$LeadTime,

        [ValidateRange(0,[double]::MaxValue)]
        [double]$ShippingCost = 0,

        [datetime]$LastUpdated = (Get-Date),

        [hashtable]$PricingMetadata = @{}
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Supplier.Pricing'

        SupplierPricingIdentifier = $SupplierPricingIdentifier

        SupplierIdentifier = $SupplierIdentifier

        PartIdentifier = $PartIdentifier

        Currency = $Currency

        UnitPrice = $UnitPrice

        AvailabilityStatus = $AvailabilityStatus

        StockQuantity = $StockQuantity

        LeadTime = $LeadTime

        ShippingCost = $ShippingCost

        LastUpdated = $LastUpdated

        PricingMetadata = [pscustomobject]$PricingMetadata

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPSupplierPricing