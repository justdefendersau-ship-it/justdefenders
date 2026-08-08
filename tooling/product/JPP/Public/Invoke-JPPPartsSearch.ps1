# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPartsSearch.ps1
# Programme : PP-001
# WorkPack  : WP-002
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPartsSearch {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$SearchIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$SearchQuery,

        [Parameter(Mandatory)]
        [ValidateSet(
            'VIN',
            'JLR Part Number',
            'Part Identifier',
            'Part Name',
            'Keyword',
            'Vehicle',
            'Category'
        )]
        [string]$SearchType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Parts',
            'Compatibility',
            'Suppliers',
            'Pricing',
            'Global'
        )]
        [string]$SearchScope,

        [string]$VehicleIdentifier,

        [object[]]$SearchResultReferences = @(),

        [hashtable]$SearchMetadata = @{},

        [datetime]$ExecutedAt = (Get-Date)
    )

    $resultReferences = @(
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

    [pscustomobject]@{
        PSTypeName = 'JPP.Parts.Search'

        SearchIdentifier = $SearchIdentifier

        SearchQuery = $SearchQuery

        SearchType = $SearchType

        SearchScope = $SearchScope

        VehicleIdentifier = $VehicleIdentifier

        SearchResultReferences = $resultReferences

        ResultCount = $resultReferences.Count

        SearchMetadata = [pscustomobject]$SearchMetadata

        ExecutedAt = $ExecutedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPPartsSearch