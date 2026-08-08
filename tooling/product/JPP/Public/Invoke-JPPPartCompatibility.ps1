# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPPartCompatibility.ps1
# Programme : PP-001
# WorkPack  : WP-002
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPPartCompatibility {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$CompatibilityIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$PartIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Direct Fit',
            'OEM Replacement',
            'OEM Equivalent',
            'Aftermarket Replacement',
            'Modified Fit',
            'Custom Fit',
            'Unknown'
        )]
        [string]$CompatibilityType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Confirmed',
            'High',
            'Medium',
            'Low',
            'Unverified'
        )]
        [string]$CompatibilityConfidence,

        [string]$CompatibilityNotes,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$SourceAuthority,

        [hashtable]$CompatibilityMetadata = @{},

        [datetime]$ValidatedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Part.Compatibility'

        CompatibilityIdentifier = $CompatibilityIdentifier

        PartIdentifier = $PartIdentifier

        VehicleIdentifier = $VehicleIdentifier

        CompatibilityType = $CompatibilityType

        CompatibilityConfidence = $CompatibilityConfidence

        CompatibilityNotes = $CompatibilityNotes

        SourceAuthority = $SourceAuthority

        CompatibilityMetadata = [pscustomobject]$CompatibilityMetadata

        ValidatedAt = $ValidatedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPPartCompatibility