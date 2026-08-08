# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeIntegrationBoundary.ps1

# Programme : PP-001

# WorkPack  : WP-010

# Unit      : EU-001

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeIntegrationBoundary {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $IntegrationIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [object]
        $CommissionedRuntimeReference,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $IntegrationMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    return [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Integration.Boundary'

        IntegrationIdentifier = $IntegrationIdentifier

        RuntimeIdentifier = $RuntimeIdentifier

        CommissionedRuntimeReference = $CommissionedRuntimeReference

        IntegrationMetadata = [pscustomobject]$IntegrationMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeIntegrationBoundary