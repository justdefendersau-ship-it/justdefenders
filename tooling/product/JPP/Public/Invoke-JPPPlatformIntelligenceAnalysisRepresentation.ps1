# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PP-001 — Product Platform
#
# WP-013 — Platform Intelligence
#
# EU-003 — Platform Intelligence Analysis Representation
#
# Production Surface:
# tooling/product/JPP/Public/Invoke-JPPPlatformIntelligenceAnalysisRepresentation.ps1
#
# Engineering Contract:
# PP-001 / WP-013 / EU-003 — Platform Intelligence Analysis Representation
#
# Canonical PSTypeName:
# JustDefenders.JPP.PlatformIntelligenceAnalysisRepresentation
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPlatformIntelligenceAnalysisRepresentation {

    [CmdletBinding()]
    param(
        [Parameter(
            Mandatory = $true,
            Position = 1
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $PlatformIntelligenceAnalysisIdentifier,

        [Parameter(
            Mandatory = $false,
            Position = 2
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $PlatformIntelligenceAnalysisStatus = "Defined",

        [Parameter(
            Mandatory = $false,
            Position = 3
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $PlatformIntelligenceAnalysisConfidence = "Undefined",

        [Parameter(
            Mandatory = $false,
            Position = 4
        )]
        [object]
        $PlatformIntelligenceAnalysisMetadata = $null
    )

    $GeneratedAt = [DateTime]::UtcNow

    $Representation = [PSCustomObject]@{
        Success = $true

        PlatformIntelligenceAnalysisIdentifier =
            $PlatformIntelligenceAnalysisIdentifier

        PlatformIntelligenceAnalysisStatus =
            $PlatformIntelligenceAnalysisStatus

        PlatformIntelligenceAnalysisConfidence =
            $PlatformIntelligenceAnalysisConfidence

        PlatformIntelligenceAnalysisMetadata =
            $PlatformIntelligenceAnalysisMetadata

        GeneratedAt =
            $GeneratedAt
    }

    $Representation.PSTypeNames.Insert(
        0,
        "JustDefenders.JPP.PlatformIntelligenceAnalysisRepresentation"
    )

    return $Representation
}

Export-ModuleMember -Function Invoke-JPPPlatformIntelligenceAnalysisRepresentation