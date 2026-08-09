# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PP-001 — Product Platform
#
# WP-014 — Platform Intelligence Operationalisation
#
# EU-002 — Intelligence Operational Evidence Representation
#
# Production Surface:
# tooling/product/JPP/Public/Invoke-JPPIntelligenceOperationalEvidenceRepresentation.ps1
#
# Engineering Contract:
# PP-001 / WP-014 / EU-002 — Intelligence Operational Evidence Representation
#
# Canonical PSTypeName:
# JustDefenders.JPP.IntelligenceOperationalEvidenceRepresentation
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPIntelligenceOperationalEvidenceRepresentation {

    [CmdletBinding()]
    param(
        [Parameter(
            Mandatory = $true,
            Position = 1
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $IntelligenceOperationalEvidenceIdentifier,

        [Parameter(
            Mandatory = $false,
            Position = 2
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $IntelligenceOperationalEvidenceType = "Defined",

        [Parameter(
            Mandatory = $false,
            Position = 3
        )]
        [object]
        $IntelligenceOperationalEvidenceReferences = $null,

        [Parameter(
            Mandatory = $false,
            Position = 4
        )]
        [object]
        $IntelligenceOperationalEvidenceMetadata = $null
    )

    $GeneratedAt = [DateTime]::UtcNow

    $Representation = [PSCustomObject]@{
        Success = $true

        IntelligenceOperationalEvidenceIdentifier =
            $IntelligenceOperationalEvidenceIdentifier

        IntelligenceOperationalEvidenceType =
            $IntelligenceOperationalEvidenceType

        IntelligenceOperationalEvidenceReferences =
            $IntelligenceOperationalEvidenceReferences

        IntelligenceOperationalEvidenceMetadata =
            $IntelligenceOperationalEvidenceMetadata

        GeneratedAt =
            $GeneratedAt
    }

    $Representation.PSTypeNames.Insert(
        0,
        "JustDefenders.JPP.IntelligenceOperationalEvidenceRepresentation"
    )

    return $Representation
}

Export-ModuleMember -Function Invoke-JPPIntelligenceOperationalEvidenceRepresentation