# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeHealthObservation.ps1

# Programme : PP-001

# WorkPack  : WP-009

# Unit      : EU-005

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeHealthObservation {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $ObservationIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet('Observed', 'Unavailable', 'Unknown')]
        [string]
        $ObservationStatus,

        [Parameter(Mandatory = $true)]
        [ValidateSet('Healthy', 'Degraded', 'Unhealthy', 'Unknown')]
        [string]
        $RuntimeHealth,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $ObservationSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $ObservationMetadata = @{},

        [Parameter(Mandatory = $true)]
        [datetime]
        $ObservedAt,

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Health.Observation'

        ObservationIdentifier = $ObservationIdentifier

        RuntimeIdentifier = $RuntimeIdentifier

        ObservationStatus = $ObservationStatus

        RuntimeHealth = $RuntimeHealth

        ObservationSummary = $ObservationSummary

        ObservationMetadata = [pscustomobject]$ObservationMetadata

        ObservedAt = $ObservedAt

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeHealthObservation