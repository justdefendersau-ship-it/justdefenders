@'
# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPReliabilitySearch.ps1
# Programme : PP-001
# WorkPack  : WP-006
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPReliabilitySearch {
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
            'Reliability Identifier',
            'Reliability Event',
            'Reliability Trend',
            'Reliability Assessment',
            'Reliability Status',
            'Keyword'
        )]
        [string]$SearchType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Reliability',
            'Events',
            'Trends',
            'Assessments',
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
        PSTypeName = 'JPP.Reliability.Search'

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

Export-ModuleMember -Function Invoke-JPPReliabilitySearch
'@ | Set-Content -LiteralPath 'tooling/product/JPP/Public/Invoke-JPPReliabilitySearch.ps1' -Encoding UTF8