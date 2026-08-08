# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPredictionAssessment.ps1
# Programme : PP-001
# WorkPack  : WP-007
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPredictionAssessment {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]
$PredictionAssessmentIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]
    $PredictionIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]
    $VehicleIdentifier,

    [Parameter(Mandatory = $false)]
    [object]
    $PredictionDomainReference = $null,

    [Parameter(Mandatory = $false)]
    [object[]]
    $PredictionEventReferences = @(),

    [Parameter(Mandatory = $false)]
    [object[]]
    $PredictionModelReferences = @(),

    [Parameter(Mandatory = $false)]
    [object]
    $FailureIntelligenceReference = $null,

    [Parameter(Mandatory = $false)]
    [object]
    $ReliabilityIntelligenceReference = $null,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Healthy',
        'Stable',
        'Attention Required',
        'At Risk',
        'Critical',
        'Unknown'
    )]
    [string]
    $AssessmentStatus,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Confirmed',
        'High',
        'Medium',
        'Low',
        'Unverified'
    )]
    [string]
    $AssessmentConfidence,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]
    $AssessmentSummary,

    [Parameter(Mandatory = $false)]
    [hashtable]
    $AssessmentMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]
    $GeneratedAt = (Get-Date)
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
    foreach ($reference in $PredictionEventReferences) {
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

        $identifierProperty = $reference.PSObject.Properties['PredictionEventIdentifier']

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
    Sort-Object -Property PredictionEventIdentifier -Unique

$predictionModelReferences = @(
    foreach ($reference in $PredictionModelReferences) {
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

        $identifierProperty = $reference.PSObject.Properties['PredictionModelIdentifier']

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
    Sort-Object -Property PredictionModelIdentifier -Unique

$failureIntelligenceReference = $null

if ($null -ne $FailureIntelligenceReference) {
    if ($FailureIntelligenceReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($FailureIntelligenceReference)) {
            $failureIntelligenceReference = [pscustomobject]@{
                IntelligenceIdentifier = $FailureIntelligenceReference
            }
        }
    }
    else {
        $failureIntelligenceReference = $FailureIntelligenceReference
    }
}

$reliabilityIntelligenceReference = $null

if ($null -ne $ReliabilityIntelligenceReference) {
    if ($ReliabilityIntelligenceReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($ReliabilityIntelligenceReference)) {
            $reliabilityIntelligenceReference = [pscustomobject]@{
                IntelligenceIdentifier = $ReliabilityIntelligenceReference
            }
        }
    }
    else {
        $reliabilityIntelligenceReference = $ReliabilityIntelligenceReference
    }
}

[pscustomobject]@{
    PSTypeName = 'JPP.Prediction.Assessment'

    PredictionAssessmentIdentifier = $PredictionAssessmentIdentifier

    PredictionIdentifier = $PredictionIdentifier

    VehicleIdentifier = $VehicleIdentifier

    PredictionDomainReference = $predictionDomainReference

    PredictionEventReferences = $predictionEventReferences

    PredictionModelReferences = $predictionModelReferences

    FailureIntelligenceReference = $failureIntelligenceReference

    ReliabilityIntelligenceReference = $reliabilityIntelligenceReference

    AssessmentStatus = $AssessmentStatus

    AssessmentConfidence = $AssessmentConfidence

    AssessmentSummary = $AssessmentSummary

    AssessmentMetadata = [pscustomobject]$AssessmentMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPPredictionAssessment