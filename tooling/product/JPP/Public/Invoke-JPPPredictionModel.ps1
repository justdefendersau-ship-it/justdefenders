# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPredictionModel.ps1
# Programme : PP-001
# WorkPack  : WP-007
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPredictionModel {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]
$PredictionModelIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]
    $PredictionIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]
    $VehicleIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]
    $PredictionTarget,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Defined',
        'Active',
        'Inactive',
        'Completed',
        'Reviewed',
        'Retired',
        'Unknown'
    )]
    [string]
    $ModelState,

    [Parameter(Mandatory = $false)]
    [object[]]
    $PredictionOutputReferences = @(),

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Confirmed',
        'High',
        'Medium',
        'Low',
        'Unverified'
    )]
    [string]
    $ModelConfidence,

    [Parameter(Mandatory = $false)]
    [hashtable]
    $ModelMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]
    $GeneratedAt = (Get-Date)
)

$predictionOutputReferences = @(
    foreach ($reference in $PredictionOutputReferences) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                PredictionOutputIdentifier = $reference
            }

            continue
        }

        $identifierProperty = $reference.PSObject.Properties['PredictionOutputIdentifier']

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
    Sort-Object -Property PredictionOutputIdentifier -Unique

[pscustomobject]@{
    PSTypeName = 'JPP.Prediction.Model'

    PredictionModelIdentifier = $PredictionModelIdentifier

    PredictionIdentifier = $PredictionIdentifier

    VehicleIdentifier = $VehicleIdentifier

    PredictionTarget = $PredictionTarget

    ModelState = $ModelState

    PredictionOutputReferences = $predictionOutputReferences

    ModelConfidence = $ModelConfidence

    ModelMetadata = [pscustomobject]$ModelMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPPredictionModel