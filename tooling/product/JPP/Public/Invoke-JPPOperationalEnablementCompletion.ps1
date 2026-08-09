# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPOperationalEnablementCompletion.ps1

# Programme : PP-001

# WorkPack  : WP-011

# Unit      : EU-005

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalEnablementCompletion {

    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [object]
        $EnablementReference,

        [Parameter(Mandatory = $true)]
        [object]
        $CapabilityConsumptionReference,

        [Parameter(Mandatory = $true)]
        [object]
        $ReadinessReference,

        [Parameter(Mandatory = $true)]
        [object]
        $IntegrationSurfaceReference,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $CompletionIdentifier,

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

    return [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Operational.Enablement.Completion'

        EnablementReference = $EnablementReference

        CapabilityConsumptionReference = $CapabilityConsumptionReference

        ReadinessReference = $ReadinessReference

        IntegrationSurfaceReference = $IntegrationSurfaceReference

        CompletionIdentifier = $CompletionIdentifier

        CompletionSummary = $CompletionSummary

        CompletionMetadata = [pscustomobject]$CompletionMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPOperationalEnablementCompletion