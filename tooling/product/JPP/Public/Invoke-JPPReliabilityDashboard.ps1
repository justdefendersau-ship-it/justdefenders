@'
# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPReliabilityDashboard.ps1
# Programme : PP-001
# WorkPack  : WP-006
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPReliabilityDashboard {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$DashboardIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [hashtable]$ReliabilitySummary = @{},

        [object]$ReliabilityDomainReference,

        [object[]]$ReliabilityEventReferences = @(),

        [object[]]$ReliabilityTrendReferences = @(),

        [object[]]$ReliabilityAssessmentReferences = @(),

        [object[]]$ReliabilitySearchReferences = @(),

        [string[]]$DashboardActions = @(
            'View Reliability',
            'View Reliability Events',
            'View Reliability Trends',
            'View Reliability Assessments',
            'Search Reliability'
        ),

        [hashtable]$DashboardMetadata = @{},

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

    [pscustomobject]@{
        PSTypeName = 'JPP.Reliability.Dashboard'

        DashboardIdentifier = $DashboardIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ReliabilitySummary = [pscustomobject]$ReliabilitySummary

        ReliabilityDomainReference = $reliabilityDomainReference

        ReliabilityEventReferences = $reliabilityEventReferences

        ReliabilityTrendReferences = $reliabilityTrendReferences

        ReliabilityAssessmentReferences = $reliabilityAssessmentReferences

        ReliabilitySearchReferences = $reliabilitySearchReferences

        DashboardActions = @(
            $DashboardActions |
                Sort-Object -Unique
        )

        DashboardMetadata = [pscustomobject]$DashboardMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPReliabilityDashboard
'@ | Set-Content -LiteralPath 'tooling/product/JPP/Public/Invoke-JPPReliabilityDashboard.ps1' -Encoding UTF8