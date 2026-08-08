# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeInitialisation.ps1
# Programme : PP-001
# WorkPack  : WP-009
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeInitialisation {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet('Ready', 'Blocked', 'Unknown')]
        [string]$InitialisationStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$InitialisationSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]$InitialisationMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]$GeneratedAt = (Get-Date)
    )

    return [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Initialisation'

        RuntimeIdentifier = $RuntimeIdentifier

        InitialisationStatus = $InitialisationStatus

        InitialisationSummary = $InitialisationSummary

        InitialisationMetadata = [pscustomobject]$InitialisationMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeInitialisation