# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeOperationalVisibility.ps1

# Programme : PP-001

# WorkPack  : WP-009

# Unit      : EU-007

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeOperationalVisibility {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$VisibilityIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Z0-9-]+$')]
    [string]$RuntimeIdentifier,

    [Parameter(Mandatory = $true)]
    [object]$OperationalStatusReference,

    [Parameter(Mandatory = $true)]
    [object]$RuntimeHealthReference,

    [Parameter(Mandatory = $true)]
    [object]$HeartbeatReference,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$VisibilitySummary,

    [Parameter(Mandatory = $false)]
    [hashtable]$VisibilityMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

$operationalStatusReference = $null
if ($null -ne $OperationalStatusReference) {
    if ($OperationalStatusReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($OperationalStatusReference)) {
            $operationalStatusReference = [pscustomobject]@{
                RuntimeIdentifier = $OperationalStatusReference
            }
        }
    }
    elseif ($OperationalStatusReference.PSObject.Properties.Name -contains 'RuntimeIdentifier') {
        $referenceValue = $OperationalStatusReference.RuntimeIdentifier
        if ($null -ne $referenceValue -and -not [string]::IsNullOrWhiteSpace([string]$referenceValue)) {
            $operationalStatusReference = [pscustomobject]@{
                RuntimeIdentifier = $referenceValue
            }
        }
    }
}

$runtimeHealthReference = $null
if ($null -ne $RuntimeHealthReference) {
    if ($RuntimeHealthReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($RuntimeHealthReference)) {
            $runtimeHealthReference = [pscustomobject]@{
                RuntimeIdentifier = $RuntimeHealthReference
            }
        }
    }
    elseif ($RuntimeHealthReference.PSObject.Properties.Name -contains 'RuntimeIdentifier') {
        $referenceValue = $RuntimeHealthReference.RuntimeIdentifier
        if ($null -ne $referenceValue -and -not [string]::IsNullOrWhiteSpace([string]$referenceValue)) {
            $runtimeHealthReference = [pscustomobject]@{
                RuntimeIdentifier = $referenceValue
            }
        }
    }
}

$heartbeatReference = $null
if ($null -ne $HeartbeatReference) {
    if ($HeartbeatReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($HeartbeatReference)) {
            $heartbeatReference = [pscustomobject]@{
                HeartbeatIdentifier = $HeartbeatReference
            }
        }
    }
    elseif ($HeartbeatReference.PSObject.Properties.Name -contains 'HeartbeatIdentifier') {
        $referenceValue = $HeartbeatReference.HeartbeatIdentifier
        if ($null -ne $referenceValue -and -not [string]::IsNullOrWhiteSpace([string]$referenceValue)) {
            $heartbeatReference = [pscustomobject]@{
                HeartbeatIdentifier = $referenceValue
            }
        }
    }
}

[pscustomobject]@{
    PSTypeName = 'JPP.Runtime.Operational.Visibility'

    VisibilityIdentifier = $VisibilityIdentifier

    RuntimeIdentifier = $RuntimeIdentifier

    OperationalStatusReference = $operationalStatusReference

    RuntimeHealthReference = $runtimeHealthReference

    HeartbeatReference = $heartbeatReference

    VisibilitySummary = $VisibilitySummary

    VisibilityMetadata = [pscustomobject]$VisibilityMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPRuntimeOperationalVisibility