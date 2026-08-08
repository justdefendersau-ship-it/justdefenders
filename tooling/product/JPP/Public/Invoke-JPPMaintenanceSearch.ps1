# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPMaintenanceSearch.ps1
# Programme : PP-001
# WorkPack  : WP-003
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPMaintenanceSearch {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$SearchIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$SearchQuery,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Vehicle',
            'Maintenance Identifier',
            'Service Event',
            'Service Provider',
            'Maintenance Type',
            'Maintenance Category',
            'Keyword'
        )]
        [string]$SearchType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Maintenance',
            'Service Events',
            'Schedules',
            'History',
            'Global'
        )]
        [string]$SearchScope,

        [string]$VehicleIdentifier,

        [object[]]$SearchResultReferences = @(),

        [hashtable]$SearchMetadata = @{},

        [datetime]$ExecutedAt = (Get-Date)
    )

    $references = @(
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
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.ReferenceIdentifier)
            } |
            Sort-Object ReferenceIdentifier -Unique
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Maintenance.Search'

        SearchIdentifier = $SearchIdentifier

        SearchQuery = $SearchQuery

        SearchType = $SearchType

        SearchScope = $SearchScope

        VehicleIdentifier = $VehicleIdentifier

        SearchResultReferences = $references

        ResultCount = $references.Count

        SearchMetadata = [pscustomobject]$SearchMetadata

        ExecutedAt = $ExecutedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPMaintenanceSearch