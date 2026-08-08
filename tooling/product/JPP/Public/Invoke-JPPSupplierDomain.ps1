# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPSupplierDomain.ps1
# Programme : PP-001
# WorkPack  : WP-002
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPSupplierDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$SupplierIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$SupplierName,

        [Parameter(Mandatory)]
        [ValidateSet(
            'OEM',
            'Dealer',
            'Independent',
            'Aftermarket',
            'Specialist',
            'Dismantler',
            'Community',
            'Unknown'
        )]
        [string]$SupplierType,

        [string]$Website,

        [string]$Country,

        [string[]]$ServiceRegions = @(),

        [hashtable]$ContactInformation = @{},

        [hashtable]$SupplierMetadata = @{},

        [datetime]$CreatedAt = (Get-Date)
    )

    $regionReferences = @(
        $ServiceRegions |
            Sort-Object -Unique |
            ForEach-Object {
                [pscustomobject]@{
                    RegionIdentifier = $_
                }
            }
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Supplier.Domain'

        SupplierIdentifier = $SupplierIdentifier

        SupplierName = $SupplierName

        SupplierType = $SupplierType

        Website = $Website

        Country = $Country

        ServiceRegions = $regionReferences

        ContactInformation = [pscustomobject]$ContactInformation

        SupplierMetadata = [pscustomobject]$SupplierMetadata

        CreatedAt = $CreatedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPSupplierDomain