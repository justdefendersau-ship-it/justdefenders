# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPredictionEvent.ps1
# Programme : PP-001
# WorkPack  : WP-007
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPredictionEvent {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]
$PredictionEventIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]
    $PredictionIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9\-]+$')]
    [string]
    $VehicleIdentifier,

    [Parameter(Mandatory = $true)]
    [datetime]
    $EventDate,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Observation',
        'Generation',
        'Confirmation',
        'Review',
        'Activation',
        'Resolution',
        'Unknown'
    )]
    [string]
    $EventType,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Detected',
        'Confirmed',
        'Active',
        'Resolved',
        'Reviewed',
        'Unknown'
    )]
    [string]
    $EventStatus,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Critical',
        'High',
        'Medium',
        'Low',
        'Informational',
        'Unknown'
    )]
    [string]
    $EventSeverity,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]
    $EventSummary,

    [Parameter(Mandatory = $false)]
    [object]
    $PredictionDomainReference,

    [Parameter(Mandatory = $false)]
    [hashtable]
    $EventMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]
    $RecordedAt = (Get-Date)
)

$predictionDomainReference = $null

if ($null -ne $PredictionDomainReference) {
    if ($PredictionDomainReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($PredictionDomainReference)) {
            $predictionDomainReference = [pscustomobject]@{
                PredictionIdentifier = $PredictionDomainReference
            }
        }
    }
    else {
        $predictionDomainReference = $PredictionDomainReference
    }
}

[pscustomobject]@{
    PSTypeName = 'JPP.Prediction.Event'

    PredictionEventIdentifier = $PredictionEventIdentifier

    PredictionIdentifier = $PredictionIdentifier

    VehicleIdentifier = $VehicleIdentifier

    EventDate = $EventDate

    EventType = $EventType

    EventStatus = $EventStatus

    EventSeverity = $EventSeverity

    EventSummary = $EventSummary

    PredictionDomainReference = $predictionDomainReference

    EventMetadata = [pscustomobject]$EventMetadata

    RecordedAt = $RecordedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPPredictionEvent