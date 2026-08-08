# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPartsDashboard.ps1
# Programme : PP-001
# WorkPack  : WP-002
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPartsDashboard {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$DashboardIdentifier,

        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$SearchIdentifier,

        [hashtable]$SearchSummary = @{},

        [string]$SelectedPartIdentifier,

        [object[]]$SearchResultReferences = @(),

        [object[]]$SupplierOfferReferences = @(),

        [hashtable]$PricingSummary = @{},

        [string[]]$DashboardActions = @(
            'Search Parts',
            'View Part',
            'Compare Suppliers',
            'View Compatibility',
            'Refresh Pricing'
        ),

        [hashtable]$DashboardMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $searchReferences = @(
        $SearchResultReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ReferenceIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ReferenceIdentifier = $_.ReferenceIdentifier
                    }
                }
            } |
            Sort-Object ReferenceIdentifier -Unique
    )

    $supplierReferences = @(
        $SupplierOfferReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ReferenceIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ReferenceIdentifier = $_.ReferenceIdentifier
                    }
                }
            } |
            Sort-Object ReferenceIdentifier -Unique
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Parts.Dashboard'

        DashboardIdentifier = $DashboardIdentifier

        VehicleIdentifier = $VehicleIdentifier

        SearchIdentifier = $SearchIdentifier

        SearchSummary = [pscustomobject]$SearchSummary

        SelectedPartIdentifier = $SelectedPartIdentifier

        SearchResultReferences = $searchReferences

        SupplierOfferReferences = $supplierReferences

        PricingSummary = [pscustomobject]$PricingSummary

        DashboardActions = @($DashboardActions)

        DashboardMetadata = [pscustomobject]$DashboardMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPPartsDashboard