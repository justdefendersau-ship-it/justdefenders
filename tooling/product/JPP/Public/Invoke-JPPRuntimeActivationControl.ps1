# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeActivationControl.ps1

# Programme : PP-001

# WorkPack  : WP-010

# Unit      : EU-002

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeActivationControl {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $ActivationIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'Requested',
            'Activated',
            'Blocked',
            'Unknown'
        )]
        [string]
        $ActivationStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $ActivationSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $ActivationMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    return [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Activation.Control'

        ActivationIdentifier = $ActivationIdentifier

        RuntimeIdentifier = $RuntimeIdentifier

        ActivationStatus = $ActivationStatus

        ActivationSummary = $ActivationSummary

        ActivationMetadata = [pscustomobject]$ActivationMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeActivationControl