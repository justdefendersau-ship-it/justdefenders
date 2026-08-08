# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeMetadata.ps1
# Programme : PP-001
# WorkPack  : WP-008
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeMetadata {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$RuntimeIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$RuntimeName,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$RuntimeVersion,

    [Parameter(Mandatory = $false)]
    [string]$RuntimeEnvironment,

    [Parameter(Mandatory = $false)]
    [string]$RuntimePlatform,

    [Parameter(Mandatory = $false)]
    [hashtable]$RuntimeMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

[pscustomobject]@{
    PSTypeName = 'JPP.Runtime.Metadata'

    RuntimeIdentifier = $RuntimeIdentifier

    RuntimeName = $RuntimeName

    RuntimeVersion = $RuntimeVersion

    RuntimeEnvironment = $RuntimeEnvironment

    RuntimePlatform = $RuntimePlatform

    RuntimeMetadata = [pscustomobject]$RuntimeMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPRuntimeMetadata