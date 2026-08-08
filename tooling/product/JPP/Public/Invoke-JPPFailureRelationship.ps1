# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPFailureRelationship.ps1
# Programme : PP-001
# WorkPack  : WP-005
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPFailureRelationship {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$FailureRelationshipIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$SourceFailureIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$TargetFailureIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Associated',
            'Recurrent',
            'Sequential',
            'Related',
            'Shared Component',
            'Shared Maintenance',
            'Shared Condition',
            'Unknown'
        )]
        [string]$RelationshipType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Detected',
            'Confirmed',
            'Active',
            'Resolved',
            'Unknown'
        )]
        [string]$RelationshipStatus,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Strong',
            'Moderate',
            'Weak',
            'Unknown'
        )]
        [string]$RelationshipStrength,

        [string]$RelationshipSummary,

        [hashtable]$RelationshipMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Failure.Relationship'

        FailureRelationshipIdentifier = $FailureRelationshipIdentifier

        VehicleIdentifier = $VehicleIdentifier

        SourceFailureIdentifier = $SourceFailureIdentifier

        TargetFailureIdentifier = $TargetFailureIdentifier

        RelationshipType = $RelationshipType

        RelationshipStatus = $RelationshipStatus

        RelationshipStrength = $RelationshipStrength

        RelationshipSummary = $RelationshipSummary

        RelationshipMetadata = [pscustomobject]$RelationshipMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPFailureRelationship