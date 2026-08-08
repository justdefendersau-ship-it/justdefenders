==================================================================================================
JustDefenders Product Platform (JPP)
File : tooling/product/JPP/Public/Invoke-JPPPredictionDomain.ps1
Programme : PP-001
WorkPack : WP-007
Unit : EU-001
Copyright (c) JustDefenders Foundation.
==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPredictionDomain {
[CmdletBinding()]
param(
[Parameter(Mandatory)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$PredictionIdentifier,

    [Parameter(Mandatory)]
    [ValidatePattern('^[A-Z0-9-]+$')]
    [string]$VehicleIdentifier,

    [Parameter(Mandatory)]
    [ValidateSet(
        'Healthy',
        'Stable',
        'Attention Required',
        'At Risk',
        'Critical',
        'Unknown'
    )]
    [string]$PredictionStatus,

    [object]$VehicleIntelligenceReference,

    [object]$FailureIntelligenceReference,

    [object]$ReliabilityIntelligenceReference,

    [hashtable]$PredictionMetadata = @{},

    [datetime]$GeneratedAt = (Get-Date)
)

$vehicleIntelligenceReference = if ($null -eq $VehicleIntelligenceReference) {
    $null
}
elseif ($VehicleIntelligenceReference -is [string]) {
    if ([string]::IsNullOrWhiteSpace($VehicleIntelligenceReference)) {
        $null
    }
    else {
        [pscustomobject]@{
            IntelligenceIdentifier = $VehicleIntelligenceReference
        }
    }
}
else {
    $VehicleIntelligenceReference
}

$failureIntelligenceReference = if ($null -eq $FailureIntelligenceReference) {
    $null
}
elseif ($FailureIntelligenceReference -is [string]) {
    if ([string]::IsNullOrWhiteSpace($FailureIntelligenceReference)) {
        $null
    }
    else {
        [pscustomobject]@{
            IntelligenceIdentifier = $FailureIntelligenceReference
        }
    }
}
else {
    $FailureIntelligenceReference
}

$reliabilityIntelligenceReference = if ($null -eq $ReliabilityIntelligenceReference) {
    $null
}
elseif ($ReliabilityIntelligenceReference -is [string]) {
    if ([string]::IsNullOrWhiteSpace($ReliabilityIntelligenceReference)) {
        $null
    }
    else {
        [pscustomobject]@{
            IntelligenceIdentifier = $ReliabilityIntelligenceReference
        }
    }
}
else {
    $ReliabilityIntelligenceReference
}

[pscustomobject]@{
    PSTypeName = 'JPP.Prediction.Domain'

    PredictionIdentifier = $PredictionIdentifier

    VehicleIdentifier = $VehicleIdentifier

    PredictionStatus = $PredictionStatus

    VehicleIntelligenceReference = $vehicleIntelligenceReference

    FailureIntelligenceReference = $failureIntelligenceReference

    ReliabilityIntelligenceReference = $reliabilityIntelligenceReference

    PredictionMetadata = [pscustomobject]$PredictionMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPPredictionDomain