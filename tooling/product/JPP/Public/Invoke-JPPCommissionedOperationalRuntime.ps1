# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPCommissionedOperationalRuntime.ps1

# Programme : PP-001

# WorkPack  : WP-009

# Unit      : EU-008

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPCommissionedOperationalRuntime {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[object]$CommissioningReference,

    [Parameter(Mandatory = $true)]
    [object]$InitialisationReference,

    [Parameter(Mandatory = $true)]
    [object]$LifecycleReference,

    [Parameter(Mandatory = $true)]
    [object]$HeartbeatReference,

    [Parameter(Mandatory = $true)]
    [object]$HealthObservationReference,

    [Parameter(Mandatory = $true)]
    [object]$OperationalStatusReference,

    [Parameter(Mandatory = $true)]
    [object]$OperationalVisibilityReference,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$RuntimeSummary,

    [Parameter(Mandatory = $false)]
    [hashtable]$RuntimeMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

return [pscustomobject]@{
    PSTypeName = 'JPP.Runtime.Commissioned.Operational'
    CommissioningReference = $CommissioningReference
    InitialisationReference = $InitialisationReference
    LifecycleReference = $LifecycleReference
    HeartbeatReference = $HeartbeatReference
    HealthObservationReference = $HealthObservationReference
    OperationalStatusReference = $OperationalStatusReference
    OperationalVisibilityReference = $OperationalVisibilityReference
    RuntimeSummary = $RuntimeSummary
    RuntimeMetadata = [pscustomobject]$RuntimeMetadata
    GeneratedAt = $GeneratedAt
    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPCommissionedOperationalRuntime