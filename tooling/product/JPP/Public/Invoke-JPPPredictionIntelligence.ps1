# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPredictionIntelligence.ps1
# Programme : PP-001
# WorkPack  : WP-007
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPredictionIntelligence {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$IntelligenceIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]$VehicleIdentifier,

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
    [object]$PredictionDashboardReference = $null,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Healthy',
        'Stable',
        'Attention Required',
        'At Risk',
        'Critical',
        'Unknown'
    )]
    [string]$IntelligenceStatus,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$IntelligenceSummary,

    [Parameter(Mandatory = $false)]
    [hashtable]$IntelligenceMetadata = @{},

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
        $property = $PredictionDomainReference.PSObject.Properties['PredictionDomainIdentifier']

        if ($null -ne $property) {
            $identifier = [string]$property.Value

            if (-not [string]::IsNullOrWhiteSpace($identifier)) {
                $predictionDomainReference = $PredictionDomainReference
            }
        }
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
)

$predictionEventReferences = @(
    $predictionEventReferences |
        Sort-Object -Property PredictionEventIdentifier |
        Group-Object -Property PredictionEventIdentifier |
        ForEach-Object {
            $_.Group[0]
        }
)

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
)

$predictionModelReferences = @(
    $predictionModelReferences |
        Sort-Object -Property PredictionModelIdentifier |
        Group-Object -Property PredictionModelIdentifier |
        ForEach-Object {
            $_.Group[0]
        }
)

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
)

$predictionAssessmentReferences = @(
    $predictionAssessmentReferences |
        Sort-Object -Property PredictionAssessmentIdentifier |
        Group-Object -Property PredictionAssessmentIdentifier |
        ForEach-Object {
            $_.Group[0]
        }
)

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
)

$predictionSearchReferences = @(
    $predictionSearchReferences |
        Sort-Object -Property SearchIdentifier |
        Group-Object -Property SearchIdentifier |
        ForEach-Object {
            $_.Group[0]
        }
)

$predictionDashboardReference = $null

if ($null -ne $PredictionDashboardReference) {
    if ($PredictionDashboardReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($PredictionDashboardReference)) {
            $predictionDashboardReference = [pscustomobject]@{
                DashboardIdentifier = $PredictionDashboardReference
            }
        }
    }
    else {
        $property = $PredictionDashboardReference.PSObject.Properties['DashboardIdentifier']

        if ($null -ne $property) {
            $identifier = [string]$property.Value

            if (-not [string]::IsNullOrWhiteSpace($identifier)) {
                $predictionDashboardReference = $PredictionDashboardReference
            }
        }
    }
}

[pscustomobject]@{
    PSTypeName = 'JPP.Prediction.Intelligence'

    IntelligenceIdentifier = $IntelligenceIdentifier

    VehicleIdentifier = $VehicleIdentifier

    PredictionDomainReference = $predictionDomainReference

    PredictionEventReferences = $predictionEventReferences

    PredictionModelReferences = $predictionModelReferences

    PredictionAssessmentReferences = $predictionAssessmentReferences

    PredictionSearchReferences = $predictionSearchReferences

    PredictionDashboardReference = $predictionDashboardReference

    IntelligenceStatus = $IntelligenceStatus

    IntelligenceSummary = $IntelligenceSummary

    IntelligenceMetadata = [pscustomobject]$IntelligenceMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPPredictionIntelligence