# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPredictionDashboard.ps1
# Programme : PP-001
# WorkPack  : WP-007
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPredictionDashboard {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$DashboardIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]$VehicleIdentifier,

    [Parameter(Mandatory = $false)]
    [hashtable]$PredictionSummary = @{},

    [Parameter(Mandatory = $false)]
    [object]$PredictionDomainReference = $null,

    [Parameter(Mandatory = $false)]
    [object[]]$PredictionEventReferences = @(),

    [Parameter(Mandatory = $false)]
    [object[]]$PredictionModelReferences = @(),

    [Parameter(Mandatory = $false)]
    [object[]]$PredictionAssessmentReferences = @(),

    [Parameter(Mandatory = $false)]
    [object[]]$PredictionSearchReferences = @(),

    [Parameter(Mandatory = $false)]
    [string[]]$DashboardActions = @(
        'View Predictions',
        'View Prediction Events',
        'View Prediction Models',
        'View Prediction Assessments',
        'Search Predictions'
    ),

    [Parameter(Mandatory = $false)]
    [hashtable]$DashboardMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

$predictionDomainReference = $null

if ($null -ne $PredictionDomainReference) {
    if ($PredictionDomainReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($PredictionDomainReference)) {
            $predictionDomainReference = [pscustomobject]@{
                PredictionDomainIdentifier = $PredictionDomainReference
            }
        }
    }
    else {
        $predictionDomainReference = $PredictionDomainReference
    }
}

$predictionEventReferences = @(
    foreach ($reference in @($PredictionEventReferences)) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                PredictionEventIdentifier = $reference
            }

            continue
        }

        $property = $reference.PSObject.Properties['PredictionEventIdentifier']

        if ($null -eq $property) {
            continue
        }

        $identifier = [string]$property.Value

        if ([string]::IsNullOrWhiteSpace($identifier)) {
            continue
        }

        $reference
    }
) |
    Sort-Object -Property PredictionEventIdentifier -Unique

$predictionModelReferences = @(
    foreach ($reference in @($PredictionModelReferences)) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                PredictionModelIdentifier = $reference
            }

            continue
        }

        $property = $reference.PSObject.Properties['PredictionModelIdentifier']

        if ($null -eq $property) {
            continue
        }

        $identifier = [string]$property.Value

        if ([string]::IsNullOrWhiteSpace($identifier)) {
            continue
        }

        $reference
    }
) |
    Sort-Object -Property PredictionModelIdentifier -Unique

$predictionAssessmentReferences = @(
    foreach ($reference in @($PredictionAssessmentReferences)) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                PredictionAssessmentIdentifier = $reference
            }

            continue
        }

        $property = $reference.PSObject.Properties['PredictionAssessmentIdentifier']

        if ($null -eq $property) {
            continue
        }

        $identifier = [string]$property.Value

        if ([string]::IsNullOrWhiteSpace($identifier)) {
            continue
        }

        $reference
    }
) |
    Sort-Object -Property PredictionAssessmentIdentifier -Unique

$predictionSearchReferences = @(
    foreach ($reference in @($PredictionSearchReferences)) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                SearchIdentifier = $reference
            }

            continue
        }

        $property = $reference.PSObject.Properties['SearchIdentifier']

        if ($null -eq $property) {
            continue
        }

        $identifier = [string]$property.Value

        if ([string]::IsNullOrWhiteSpace($identifier)) {
            continue
        }

        $reference
    }
) |
    Sort-Object -Property SearchIdentifier -Unique

$canonicalDashboardActions = @(
    $DashboardActions |
        Sort-Object -Unique
)

[pscustomobject]@{
    PSTypeName = 'JPP.Prediction.Dashboard'

    DashboardIdentifier = $DashboardIdentifier

    VehicleIdentifier = $VehicleIdentifier

    PredictionSummary = [pscustomobject]$PredictionSummary

    PredictionDomainReference = $predictionDomainReference

    PredictionEventReferences = $predictionEventReferences

    PredictionModelReferences = $predictionModelReferences

    PredictionAssessmentReferences = $predictionAssessmentReferences

    PredictionSearchReferences = $predictionSearchReferences

    DashboardActions = $canonicalDashboardActions

    DashboardMetadata = [pscustomobject]$DashboardMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPPredictionDashboard