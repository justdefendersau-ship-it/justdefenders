# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPFailureDashboard.ps1
# Programme : PP-001
# WorkPack  : WP-005
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPFailureDashboard {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$DashboardIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [hashtable]$FailureSummary = @{},

        [object[]]$FailureDomainReferences = @(),

        [object[]]$FailureEventReferences = @(),

        [object[]]$FailurePatternReferences = @(),

        [object[]]$FailureRelationshipReferences = @(),

        [object[]]$FailureSearchReferences = @(),

        [string[]]$DashboardActions = @(
            'View Failures',
            'View Failure Events',
            'View Failure Patterns',
            'View Failure Relationships',
            'Search Failures'
        ),

        [hashtable]$DashboardMetadata = @{},

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

    [pscustomobject]@{
        PSTypeName = 'JPP.Failure.Dashboard'

        DashboardIdentifier = $DashboardIdentifier

        VehicleIdentifier = $VehicleIdentifier

        FailureSummary = [pscustomobject]$FailureSummary

        FailureDomainReferences = $failureDomainReferences

        FailureEventReferences = $failureEventReferences

        FailurePatternReferences = $failurePatternReferences

        FailureRelationshipReferences = $failureRelationshipReferences

        FailureSearchReferences = $failureSearchReferences

        DashboardActions = @(
            $DashboardActions |
                Sort-Object -Unique
        )

        DashboardMetadata = [pscustomobject]$DashboardMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPFailureDashboard