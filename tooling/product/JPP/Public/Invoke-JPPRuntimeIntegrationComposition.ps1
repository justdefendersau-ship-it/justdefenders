# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeIntegrationComposition.ps1

# Programme : PP-001

# WorkPack  : WP-010

# Unit      : EU-004

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeIntegrationComposition {
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9-]+$')]
    [string]$CompositionIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9-]+$')]
    [string]$RuntimeIdentifier,

    [Parameter(Mandatory = $true)]
    [object]$IntegrationBoundaryReference,

    [Parameter(Mandatory = $true)]
    [object]$ActivationControlReference,

    [Parameter(Mandatory = $true)]
    [object]$ActivationValidationReference,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$CompositionSummary,

    [Parameter(Mandatory = $false)]
    [hashtable]$CompositionMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

    return [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Integration.Composition'

        CompositionIdentifier = $CompositionIdentifier

        RuntimeIdentifier = $RuntimeIdentifier

        IntegrationBoundaryReference = $IntegrationBoundaryReference

        ActivationControlReference = $ActivationControlReference

        ActivationValidationReference = $ActivationValidationReference

        CompositionSummary = $CompositionSummary

        CompositionMetadata = [pscustomobject]$CompositionMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeIntegrationComposition