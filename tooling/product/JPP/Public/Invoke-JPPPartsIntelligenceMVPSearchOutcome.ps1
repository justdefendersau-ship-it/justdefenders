# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PP-001 — MVP
#
# WP-015 — Parts Intelligence MVP Search
#
# EU-003 — Parts Intelligence MVP Search Outcome
#
# Production Surface:
# tooling/product/JPP/Public/Invoke-JPPPartsIntelligenceMVPSearchOutcome.ps1
#
# Engineering Contract:
# PP-001 / MVP / WP-015 / EU-003 — Parts Intelligence MVP Search Outcome
#
# Canonical PSTypeName:
# JustDefenders.JPP.PartsIntelligenceMVPSearchOutcome
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPartsIntelligenceMVPSearchOutcome {

    [CmdletBinding()]
    param(
        [Parameter(
            Mandatory = $true,
            Position = 1
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $PartsIntelligenceMVPSearchOutcomeIdentifier,

        [Parameter(
            Mandatory = $false,
            Position = 2
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $PartsIntelligenceMVPSearchOutcomeStatus = "Defined",

        [Parameter(
            Mandatory = $false,
            Position = 3
        )]
        [object]
        $PartsIntelligenceMVPSearchOutcomeReferences = $null,

        [Parameter(
            Mandatory = $false,
            Position = 4
        )]
        [object]
        $PartsIntelligenceMVPSearchOutcomeMetadata = $null
    )

    $GeneratedAt = [DateTime]::UtcNow

    $Representation = [PSCustomObject]@{
        Success = $true

        PartsIntelligenceMVPSearchOutcomeIdentifier =
            $PartsIntelligenceMVPSearchOutcomeIdentifier

        PartsIntelligenceMVPSearchOutcomeStatus =
            $PartsIntelligenceMVPSearchOutcomeStatus

        PartsIntelligenceMVPSearchOutcomeReferences =
            $PartsIntelligenceMVPSearchOutcomeReferences

        PartsIntelligenceMVPSearchOutcomeMetadata =
            $PartsIntelligenceMVPSearchOutcomeMetadata

        GeneratedAt =
            $GeneratedAt
    }

    $Representation.PSTypeNames.Insert(
        0,
        "JustDefenders.JPP.PartsIntelligenceMVPSearchOutcome"
    )

    return $Representation
}

Export-ModuleMember -Function Invoke-JPPPartsIntelligenceMVPSearchOutcome
