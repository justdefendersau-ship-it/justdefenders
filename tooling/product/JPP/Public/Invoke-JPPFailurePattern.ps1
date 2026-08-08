# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPFailurePattern.ps1
# Programme : PP-001
# WorkPack  : WP-005
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPFailurePattern {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$FailurePatternIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$FailureIdentifier,

        [object[]]$FailureEventReferences = @(),

        [Parameter(Mandatory)]
        [ValidateSet(
            'Recurring',
            'Intermittent',
            'Progressive',
            'Clustered',
            'Isolated',
            'Unknown'
        )]
        [string]$PatternType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Detected',
            'Confirmed',
            'Active',
            'Resolved',
            'Recurring',
            'Unknown'
        )]
        [string]$PatternStatus,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Critical',
            'High',
            'Medium',
            'Low',
            'Unknown'
        )]
        [string]$PatternSeverity,

        [string]$PatternSummary,

        [string]$PatternDescription,

        [hashtable]$PatternMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $eventReferences = @(
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

    [pscustomobject]@{
        PSTypeName = 'JPP.Failure.Pattern'

        FailurePatternIdentifier = $FailurePatternIdentifier

        VehicleIdentifier = $VehicleIdentifier

        FailureIdentifier = $FailureIdentifier

        FailureEventReferences = $eventReferences

        EventCount = $eventReferences.Count

        PatternType = $PatternType

        PatternStatus = $PatternStatus

        PatternSeverity = $PatternSeverity

        PatternSummary = $PatternSummary

        PatternDescription = $PatternDescription

        PatternMetadata = [pscustomobject]$PatternMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPFailurePattern