# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeActivationValidation.ps1

# Programme : PP-001

# WorkPack  : WP-010

# Unit      : EU-003

#

# Copyright (c) JustDefenders Foundation.

# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeActivationValidation {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $ValidationIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]
        $RuntimeIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet('Valid', 'Invalid', 'Blocked', 'Unknown')]
        [string]
        $ValidationStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]
        $ValidationSummary,

        [Parameter(Mandatory = $false)]
        [hashtable]
        $ValidationMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]
        $GeneratedAt = (Get-Date)
    )

    return [pscustomobject]@{
        PSTypeName = 'JPP.Runtime.Activation.Validation'

        ValidationIdentifier = $ValidationIdentifier

        RuntimeIdentifier = $RuntimeIdentifier

        ValidationStatus = $ValidationStatus

        ValidationSummary = $ValidationSummary

        ValidationMetadata = [pscustomobject]$ValidationMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPRuntimeActivationValidation