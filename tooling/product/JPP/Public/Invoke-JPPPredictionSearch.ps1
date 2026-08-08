# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPredictionSearch.ps1
# Programme : PP-001
# WorkPack  : WP-007
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPredictionSearch {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]
$SearchIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]
    $SearchQuery,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Vehicle',
        'Prediction Identifier',
        'Prediction Event',
        'Prediction Model',
        'Prediction Assessment',
        'Prediction Status',
        'Keyword'
    )]
    [string]
    $SearchType,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Predictions',
        'Events',
        'Models',
        'Assessments',
        'Global'
    )]
    [string]
    $SearchScope,

    [Parameter(Mandatory = $false)]
    [string]
    $VehicleIdentifier = $null,

    [Parameter(Mandatory = $false)]
    [object[]]
    $SearchResultReferences = @(),

    [Parameter(Mandatory = $false)]
    [hashtable]
    $SearchMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]
    $ExecutedAt = (Get-Date)
)

$references = @(
    foreach ($reference in $SearchResultReferences) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                ReferenceIdentifier = $reference
            }

            continue
        }

        $identifierProperty = $reference.PSObject.Properties['ReferenceIdentifier']

        if ($null -eq $identifierProperty) {
            continue
        }

        $identifier = $identifierProperty.Value

        if ($null -eq $identifier) {
            continue
        }

        $identifierString = [string]$identifier

        if ([string]::IsNullOrWhiteSpace($identifierString)) {
            continue
        }

        $reference
    }
) |
    Sort-Object -Property ReferenceIdentifier -Unique

[pscustomobject]@{
    PSTypeName = 'JPP.Prediction.Search'

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

Export-ModuleMember -Function Invoke-JPPPredictionSearch