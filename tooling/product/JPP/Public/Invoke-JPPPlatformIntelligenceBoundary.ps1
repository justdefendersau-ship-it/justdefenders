# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PP-001 — Product Platform
#
# WP-013 — Platform Intelligence
#
# EU-001 — Platform Intelligence Boundary
#
# Production Surface:
# tooling/product/JPP/Public/Invoke-JPPPlatformIntelligenceBoundary.ps1
#
# Engineering Contract:
# PP-001 / WP-013 / EU-001 — Platform Intelligence Boundary
#
# Canonical PSTypeName:
# JustDefenders.JPP.PlatformIntelligenceBoundary
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPlatformIntelligenceBoundary {

    [CmdletBinding()]
    param(
        [Parameter(
            Mandatory = $true,
            Position = 1
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $PlatformIntelligenceBoundaryIdentifier,

        [Parameter(
            Mandatory = $false,
            Position = 2
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $PlatformIntelligenceBoundaryScope = "Defined",

        [Parameter(
            Mandatory = $false,
            Position = 3
        )]
        [object]
        $PlatformIntelligenceBoundaryMetadata = $null
    )

    $GeneratedAt = [DateTime]::UtcNow

    $Representation = [PSCustomObject]@{
        Success = $true

        PlatformIntelligenceBoundaryIdentifier =
            $PlatformIntelligenceBoundaryIdentifier

        PlatformIntelligenceBoundaryScope =
            $PlatformIntelligenceBoundaryScope

        PlatformIntelligenceBoundaryMetadata =
            $PlatformIntelligenceBoundaryMetadata

        GeneratedAt =
            $GeneratedAt
    }

    $Representation.PSTypeNames.Insert(
        0,
        "JustDefenders.JPP.PlatformIntelligenceBoundary"
    )

    return $Representation
}

Export-ModuleMember -Function Invoke-JPPPlatformIntelligenceBoundary