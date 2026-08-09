# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPOperationalReadinessRepresentation.ps1

# Programme : PP-001

# WorkPack  : WP-011

# Unit      : EU-003

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalReadinessRepresentation {

    [CmdletBinding()]

    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $ReadinessIdentifier,

        [Parameter(Mandatory = $true)]
        [object]
        $EnablementReference,

        [Parameter(Mandatory = $true)]
        [object]
        $CapabilityConsumptionReference,

        [Parameter(Mandatory = $true)]
        [ValidateSet('Ready','NotReady','Unknown')]
        [string]
        $ReadinessStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $ReadinessSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $ReadinessMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

return [pscustomobject]@{
    PSTypeName = 'JPP.Runtime.Operational.Readiness'

    ReadinessIdentifier = $ReadinessIdentifier

    EnablementReference = $EnablementReference

    CapabilityConsumptionReference = $CapabilityConsumptionReference

    ReadinessStatus = $ReadinessStatus

    ReadinessSummary = $ReadinessSummary

    ReadinessMetadata = [pscustomobject]$ReadinessMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}
}

Export-ModuleMember -Function Invoke-JPPOperationalReadinessRepresentation