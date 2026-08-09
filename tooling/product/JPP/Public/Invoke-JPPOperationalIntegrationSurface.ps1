# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPOperationalIntegrationSurface.ps1

# Programme : PP-001

# WorkPack  : WP-011

# Unit      : EU-004

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalIntegrationSurface {

    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $IntegrationSurfaceIdentifier,

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
        [ValidateSet('Available','Unavailable','Unknown')]
        [string]
        $IntegrationStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $IntegrationSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $IntegrationMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    return [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Operational.Integration.Surface'

        IntegrationSurfaceIdentifier = $IntegrationSurfaceIdentifier

        EnablementReference = $EnablementReference

        CapabilityConsumptionReference = $CapabilityConsumptionReference

        ReadinessReference = $ReadinessReference

        IntegrationStatus = $IntegrationStatus

        IntegrationSummary = $IntegrationSummary

        IntegrationMetadata = [pscustomobject]$IntegrationMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPOperationalIntegrationSurface