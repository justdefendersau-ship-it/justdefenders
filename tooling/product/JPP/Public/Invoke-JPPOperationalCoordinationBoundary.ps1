# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PP-001 — Product Platform
#
# WP-012 — Runtime Operational Coordination
#
# EU-001 — Operational Coordination Boundary
#
# Production Surface:
# tooling/product/JPP/Public/Invoke-JPPOperationalCoordinationBoundary.ps1
#
# Engineering Contract:
# PP-001 / WP-012 / EU-001 — Operational Coordination Boundary
#
# Canonical PSTypeName:
# JustDefenders.JPP.OperationalCoordinationBoundary
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalCoordinationBoundary {

    [CmdletBinding()]
    param(
        [Parameter(
            Mandatory = $true,
            Position = 1
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $OperationalCoordinationBoundaryIdentifier,

        [Parameter(
            Mandatory = $false,
            Position = 2
        )]
        [ValidateNotNullOrEmpty()]
        [string]
        $OperationalCoordinationStatus = "Defined",

        [Parameter(
            Mandatory = $false,
            Position = 3
        )]
        [object]
        $OperationalCoordinationMetadata = $null
    )

    $GeneratedAt = [DateTime]::UtcNow

    $Representation = [PSCustomObject]@{
        Success = $true

        OperationalCoordinationBoundaryIdentifier =
            $OperationalCoordinationBoundaryIdentifier

        OperationalCoordinationStatus =
            $OperationalCoordinationStatus

        OperationalCoordinationMetadata =
            $OperationalCoordinationMetadata

        GeneratedAt =
            $GeneratedAt
    }

    $Representation.PSTypeNames.Insert(
        0,
        "JustDefenders.JPP.OperationalCoordinationBoundary"
    )

    return $Representation
}

Export-ModuleMember -Function Invoke-JPPOperationalCoordinationBoundary