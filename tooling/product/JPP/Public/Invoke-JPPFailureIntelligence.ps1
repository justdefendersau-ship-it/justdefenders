# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPFailureIntelligence.ps1
# Programme : PP-001
# WorkPack  : WP-005
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPFailureIntelligence {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$IntelligenceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [object[]]$FailureDomainReferences = @(),

        [object[]]$FailureEventReferences = @(),

        [object[]]$FailurePatternReferences = @(),

        [object[]]$FailureRelationshipReferences = @(),

        [object[]]$FailureSearchReferences = @(),

        [object]$FailureDashboardReference,

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

    $failureDomainReferences = @(
        $FailureDomainReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        FailureIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        FailureIdentifier = $_.FailureIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.FailureIdentifier)
            } |
            Sort-Object FailureIdentifier -Unique
    )

    $failureEventReferences = @(
        $FailureEventReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        FailureEventIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        FailureEventIdentifier = $_.FailureEventIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.FailureEventIdentifier)
            } |
            Sort-Object FailureEventIdentifier -Unique
    )

    $failurePatternReferences = @(
        $FailurePatternReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        FailurePatternIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        FailurePatternIdentifier = $_.FailurePatternIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.FailurePatternIdentifier)
            } |
            Sort-Object FailurePatternIdentifier -Unique
    )

    $failureRelationshipReferences = @(
        $FailureRelationshipReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        FailureRelationshipIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        FailureRelationshipIdentifier = $_.FailureRelationshipIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.FailureRelationshipIdentifier)
            } |
            Sort-Object FailureRelationshipIdentifier -Unique
    )

    $failureSearchReferences = @(
        $FailureSearchReferences |
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

    $failureDashboardReference = if ($null -eq $FailureDashboardReference) {
        $null
    }
    elseif ($FailureDashboardReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($FailureDashboardReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                DashboardIdentifier = $FailureDashboardReference
            }
        }
    }
    else {
        $FailureDashboardReference
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Failure.Intelligence'

        IntelligenceIdentifier = $IntelligenceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        FailureDomainReferences = $failureDomainReferences

        FailureEventReferences = $failureEventReferences

        FailurePatternReferences = $failurePatternReferences

        FailureRelationshipReferences = $failureRelationshipReferences

        FailureSearchReferences = $failureSearchReferences

        FailureDashboardReference = $failureDashboardReference

        IntelligenceStatus = $IntelligenceStatus

        IntelligenceSummary = $IntelligenceSummary

        IntelligenceMetadata = [pscustomobject]$IntelligenceMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPFailureIntelligence