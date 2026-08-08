# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeIntegrationCompletion.ps1
#
# Programme : PP-001
#
# WorkPack  : WP-010
#
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
#
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeIntegrationCompletion {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $CompletionIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [object]
        $IntegrationCompositionReference,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'Completed',
            'Pending',
            'Blocked',
            'Unknown'
        )]
        [string]
        $CompletionStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $CompletionSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $CompletionMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Integration.Completion'

        CompletionIdentifier = $CompletionIdentifier

        RuntimeIdentifier = $RuntimeIdentifier

        IntegrationCompositionReference = $IntegrationCompositionReference

        CompletionStatus = $CompletionStatus

        CompletionSummary = $CompletionSummary

        CompletionMetadata = [pscustomobject]$CompletionMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeIntegrationCompletion