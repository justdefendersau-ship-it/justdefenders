# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPOperationalStatusPublication.ps1

# Programme : PP-001

# WorkPack  : WP-009

# Unit      : EU-006

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalStatusPublication {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $PublicationIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet('Operational', 'Degraded', 'Offline', 'Unknown')]
        [string]
        $OperationalStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $PublicationSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $PublicationMetadata = @{},

        [Parameter(Mandatory = $true)]
        [datetime]
        $PublishedAt,

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Operational.Status.Publication'

        PublicationIdentifier = $PublicationIdentifier

        RuntimeIdentifier = $RuntimeIdentifier

        OperationalStatus = $OperationalStatus

        PublicationSummary = $PublicationSummary

        PublicationMetadata = [pscustomobject]$PublicationMetadata

        PublishedAt = $PublishedAt

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPOperationalStatusPublication