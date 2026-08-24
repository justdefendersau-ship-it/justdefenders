# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PP-001 — Product Platform
#
# WP-013 — Platform Intelligence
#
# EU-004 — Intelligence Relationship Composition
#
# Production Surface:
# tooling/product/JPP/Public/Invoke-JPPIntelligenceRelationshipComposition.ps1
#
# Engineering Contract:
# PP-001 / WP-013 / EU-004 — Intelligence Relationship Composition
#
# Canonical PSTypeName:
# JustDefenders.JPP.IntelligenceRelationshipComposition
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPIntelligenceRelationshipComposition {

    [CmdletBinding()]
    param(
        [Parameter(
            Mandatory = $true,
            Position = 1
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $IntelligenceRelationshipCompositionIdentifier,

        [Parameter(
            Mandatory = $false,
            Position = 2
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $IntelligenceRelationshipType = "Defined",

        [Parameter(
            Mandatory = $false,
            Position = 3
        )]
        [object]
        $IntelligenceRelationshipReferences = $null,

        [Parameter(
            Mandatory = $false,
            Position = 4
        )]
        [object]
        $IntelligenceRelationshipMetadata = $null
    )

    $GeneratedAt = [DateTime]::UtcNow

    $Representation = [PSCustomObject]@{
        Success = $true

        IntelligenceRelationshipCompositionIdentifier =
            $IntelligenceRelationshipCompositionIdentifier

        IntelligenceRelationshipType =
            $IntelligenceRelationshipType

        IntelligenceRelationshipReferences =
            $IntelligenceRelationshipReferences

        IntelligenceRelationshipMetadata =
            $IntelligenceRelationshipMetadata

        GeneratedAt =
            $GeneratedAt
    }

    $Representation.PSTypeNames.Insert(
        0,
        "JustDefenders.JPP.IntelligenceRelationshipComposition"
    )

    return $Representation
}

Export-ModuleMember -Function Invoke-JPPIntelligenceRelationshipComposition