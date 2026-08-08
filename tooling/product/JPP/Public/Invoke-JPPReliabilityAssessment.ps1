# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPReliabilityAssessment.ps1
# Programme : PP-001
# WorkPack  : WP-006
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPReliabilityAssessment {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$ReliabilityAssessmentIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$ReliabilityIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [object]$ReliabilityDomainReference,

        [object[]]$ReliabilityEventReferences = @(),

        [object]$ReliabilityTrendReference,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Excellent',
            'Good',
            'Attention Required',
            'Poor',
            'Critical',
            'Unknown'
        )]
        [string]$AssessmentStatus,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Confirmed',
            'High',
            'Medium',
            'Low',
            'Unverified'
        )]
        [string]$AssessmentConfidence,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$AssessmentSummary,

        [hashtable]$AssessmentMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $reliabilityDomainReference = if ($null -eq $ReliabilityDomainReference) {
        $null
    }
    elseif ($ReliabilityDomainReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($ReliabilityDomainReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                ReliabilityIdentifier = $ReliabilityDomainReference
            }
        }
    }
    else {
        $ReliabilityDomainReference
    }

    $reliabilityEventReferences = @(
        $ReliabilityEventReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ReliabilityEventIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ReliabilityEventIdentifier = $_.ReliabilityEventIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.ReliabilityEventIdentifier)
            } |
            Sort-Object ReliabilityEventIdentifier -Unique
    )

    $reliabilityTrendReference = if ($null -eq $ReliabilityTrendReference) {
        $null
    }
    elseif ($ReliabilityTrendReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($ReliabilityTrendReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                ReliabilityTrendIdentifier = $ReliabilityTrendReference
            }
        }
    }
    else {
        $ReliabilityTrendReference
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Reliability.Assessment'

        ReliabilityAssessmentIdentifier = $ReliabilityAssessmentIdentifier

        ReliabilityIdentifier = $ReliabilityIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ReliabilityDomainReference = $reliabilityDomainReference

        ReliabilityEventReferences = $reliabilityEventReferences

        ReliabilityTrendReference = $reliabilityTrendReference

        AssessmentStatus = $AssessmentStatus

        AssessmentConfidence = $AssessmentConfidence

        AssessmentSummary = $AssessmentSummary

        AssessmentMetadata = [pscustomobject]$AssessmentMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPReliabilityAssessment
