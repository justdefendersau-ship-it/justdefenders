# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPartsDomain.ps1
# Programme : PP-001
# WorkPack  : WP-002
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPartsDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$PartIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$JLRPartNumber,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$PartName,

        [string]$Description,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$PartCategory,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$Manufacturer,

        [bool]$OEMIndicator = $true,

        [bool]$AftermarketIndicator = $false,

        [string]$SupersededBy,

        [string[]]$Supersedes = @(),

        [string[]]$CompatibleVehicleReferences = @(),

        [hashtable]$PartMetadata = @{},

        [datetime]$CreatedAt = (Get-Date)
    )

    $compatibleVehicles = @(
        $CompatibleVehicleReferences |
            Sort-Object -Unique |
            ForEach-Object {
                [pscustomobject]@{
                    VehicleIdentifier = $_
                }
            }
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Parts.Domain'

        PartIdentifier = $PartIdentifier

        JLRPartNumber = $JLRPartNumber

        PartName = $PartName

        Description = $Description

        PartCategory = $PartCategory

        Manufacturer = $Manufacturer

        OEMIndicator = $OEMIndicator

        AftermarketIndicator = $AftermarketIndicator

        SupersededBy = $SupersededBy

        Supersedes = @($Supersedes | Sort-Object -Unique)

        CompatibleVehicleReferences = $compatibleVehicles

        PartMetadata = [pscustomobject]$PartMetadata

        CreatedAt = $CreatedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPPartsDomain