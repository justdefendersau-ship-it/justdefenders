@'
# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPReliabilityIntelligence.ps1
# Programme : PP-001
# WorkPack  : WP-006
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPReliabilityIntelligence {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$IntelligenceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [object]$ReliabilityDomainReference,

        [object[]]$ReliabilityEventReferences = @(),

        [object[]]$ReliabilityTrendReferences = @(),

        [object[]]$ReliabilityAssessmentReferences = @(),

        [object[]]$ReliabilitySearchReferences = @(),

        [object]$ReliabilityDashboardReference,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Healthy',
            'Stable',
            'Attention Required',
            'At Risk',
            'Critical',
            'Unknown'
        )]
        [string]$IntelligenceStatus,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$IntelligenceSummary,

        [hashtable]$IntelligenceMetadata = @{},

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

    $reliabilityTrendReferences = @(
        $ReliabilityTrendReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ReliabilityTrendIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ReliabilityTrendIdentifier = $_.ReliabilityTrendIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.ReliabilityTrendIdentifier)
            } |
            Sort-Object ReliabilityTrendIdentifier -Unique
    )

    $reliabilityAssessmentReferences = @(
        $ReliabilityAssessmentReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ReliabilityAssessmentIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ReliabilityAssessmentIdentifier = $_.ReliabilityAssessmentIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.ReliabilityAssessmentIdentifier)
            } |
            Sort-Object ReliabilityAssessmentIdentifier -Unique
    )

    $reliabilitySearchReferences = @(
        $ReliabilitySearchReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        SearchIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        SearchIdentifier = $_.SearchIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.SearchIdentifier)
            } |
            Sort-Object SearchIdentifier -Unique
    )

    $reliabilityDashboardReference = if ($null -eq $ReliabilityDashboardReference) {
        $null
    }
    elseif ($ReliabilityDashboardReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($ReliabilityDashboardReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                DashboardIdentifier = $ReliabilityDashboardReference
            }
        }
    }
    else {
        $ReliabilityDashboardReference
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Reliability.Intelligence'

        IntelligenceIdentifier = $IntelligenceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ReliabilityDomainReference = $reliabilityDomainReference

        ReliabilityEventReferences = $reliabilityEventReferences

        ReliabilityTrendReferences = $reliabilityTrendReferences

        ReliabilityAssessmentReferences = $reliabilityAssessmentReferences

        ReliabilitySearchReferences = $reliabilitySearchReferences

        ReliabilityDashboardReference = $reliabilityDashboardReference

        IntelligenceStatus = $IntelligenceStatus

        IntelligenceSummary = $IntelligenceSummary

        IntelligenceMetadata = [pscustomobject]$IntelligenceMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPReliabilityIntelligence
'@ | Set-Content -LiteralPath 'tooling/product/JPP/Public/Invoke-JPPReliabilityIntelligence.ps1' -Encoding UTF8