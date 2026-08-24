# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PP-001 — Product Platform
#
# WP-013 — Platform Intelligence
#
# EU-002 — Intelligence Evidence Representation
#
# Production Surface:
# tooling/product/JPP/Public/Invoke-JPPIntelligenceEvidenceRepresentation.ps1
#
# Engineering Contract:
# PP-001 / WP-013 / EU-002 — Intelligence Evidence Representation
#
# Canonical PSTypeName:
# JustDefenders.JPP.IntelligenceEvidenceRepresentation
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPIntelligenceEvidenceRepresentation {

    [CmdletBinding()]
    param(
        [Parameter(
            Mandatory = $true,
            Position = 1
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $IntelligenceEvidenceIdentifier,

        [Parameter(
            Mandatory = $false,
            Position = 2
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $IntelligenceEvidenceType = "Defined",

        [Parameter(
            Mandatory = $false,
            Position = 3
        )]
        [object]
        $IntelligenceEvidenceMetadata = $null,

        [Parameter(
            Mandatory = $false,
            Position = 4
        )]
        [object]
        $IntelligenceEvidenceReferences = $null
    )

    $GeneratedAt = [DateTime]::UtcNow

    $Representation = [PSCustomObject]@{
        Success = $true

        IntelligenceEvidenceIdentifier =
            $IntelligenceEvidenceIdentifier

        IntelligenceEvidenceType =
            $IntelligenceEvidenceType

        IntelligenceEvidenceMetadata =
            $IntelligenceEvidenceMetadata

        IntelligenceEvidenceReferences =
            $IntelligenceEvidenceReferences

        GeneratedAt =
            $GeneratedAt
    }

    $Representation.PSTypeNames.Insert(
        0,
        "JustDefenders.JPP.IntelligenceEvidenceRepresentation"
    )

    return $Representation
}

Export-ModuleMember -Function Invoke-JPPIntelligenceEvidenceRepresentation