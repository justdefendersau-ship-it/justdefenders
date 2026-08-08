# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPOperationalDomain.ps1
# Programme : PP-001
# WorkPack  : WP-008
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest
function Invoke-JPPOperationalDomain {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$OperationalIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrWhiteSpace()]
    [string]$OperationalName,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Operational',
        'Degraded',
        'Offline',
        'Unknown'
    )]
    [string]$OperationalStatus,

    [Parameter(Mandatory = $false)]
    [string]$OperationalEnvironment,

    [Parameter(Mandatory = $false)]
    [hashtable]$OperationalMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

[pscustomobject]@{
    PSTypeName = 'JPP.Operational.Domain'

    OperationalIdentifier = $OperationalIdentifier

    OperationalName = $OperationalName

    OperationalStatus = $OperationalStatus

    OperationalEnvironment = $OperationalEnvironment

    OperationalMetadata = [pscustomobject]$OperationalMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPOperationalDomain