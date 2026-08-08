# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPRuntimeHealth.ps1
# Programme : PP-001
# WorkPack  : WP-008
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPRuntimeHealth {
[CmdletBinding()]
param(
[Parameter(Mandatory = $true)]
[ValidatePattern('^[A-Z0-9-]+$')]
[string]$RuntimeIdentifier,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Operational',
        'Degraded',
        'Offline',
        'Unknown'
    )]
    [string]$RuntimeStatus,

    [Parameter(Mandatory = $true)]
    [ValidateSet(
        'Healthy',
        'Degraded',
        'Unhealthy',
        'Unknown'
    )]
    [string]$RuntimeHealth,

    [Parameter(Mandatory = $false)]
    [object[]]$ComponentHealthReferences = @(),

    [Parameter(Mandatory = $false)]
    [object[]]$DependencyHealthReferences = @(),

    [Parameter(Mandatory = $false)]
    [object]$RuntimeMetadataReference = $null,

    [Parameter(Mandatory = $false)]
    [hashtable]$RuntimeHealthMetadata = @{},

    [Parameter(Mandatory = $false)]
    [datetime]$GeneratedAt = (Get-Date)
)

$componentHealthReferences = @(
    foreach ($reference in $ComponentHealthReferences) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                ComponentIdentifier = $reference
            }

            continue
        }

        $property = $reference.PSObject.Properties['ComponentIdentifier']

        if ($null -eq $property) {
            continue
        }

        $identifier = [string]$property.Value

        if ([string]::IsNullOrWhiteSpace($identifier)) {
            continue
        }

        [pscustomobject]@{
            ComponentIdentifier = $identifier
        }
    }
) |
    Sort-Object ComponentIdentifier -Unique

$dependencyHealthReferences = @(
    foreach ($reference in $DependencyHealthReferences) {
        if ($null -eq $reference) {
            continue
        }

        if ($reference -is [string]) {
            if ([string]::IsNullOrWhiteSpace($reference)) {
                continue
            }

            [pscustomobject]@{
                DependencyIdentifier = $reference
            }

            continue
        }

        $property = $reference.PSObject.Properties['DependencyIdentifier']

        if ($null -eq $property) {
            continue
        }

        $identifier = [string]$property.Value

        if ([string]::IsNullOrWhiteSpace($identifier)) {
            continue
        }

        [pscustomobject]@{
            DependencyIdentifier = $identifier
        }
    }
) |
    Sort-Object DependencyIdentifier -Unique

$runtimeMetadataReference = $null

if ($null -ne $RuntimeMetadataReference) {
    if ($RuntimeMetadataReference -is [string]) {
        if (-not [string]::IsNullOrWhiteSpace($RuntimeMetadataReference)) {
            $runtimeMetadataReference = [pscustomobject]@{
                RuntimeIdentifier = $RuntimeMetadataReference
            }
        }
    }
    else {
        $property = $RuntimeMetadataReference.PSObject.Properties['RuntimeIdentifier']

        if ($null -ne $property) {
            $identifier = [string]$property.Value

            if (-not [string]::IsNullOrWhiteSpace($identifier)) {
                $runtimeMetadataReference = [pscustomobject]@{
                    RuntimeIdentifier = $identifier
                }
            }
        }
    }
}

[pscustomobject]@{
    PSTypeName = 'JPP.Runtime.Health'

    RuntimeIdentifier = $RuntimeIdentifier

    RuntimeStatus = $RuntimeStatus

    RuntimeHealth = $RuntimeHealth

    ComponentHealthReferences = $componentHealthReferences

    DependencyHealthReferences = $dependencyHealthReferences

    RuntimeMetadataReference = $runtimeMetadataReference

    RuntimeHealthMetadata = [pscustomobject]$RuntimeHealthMetadata

    GeneratedAt = $GeneratedAt

    Success = $true
}

}

Export-ModuleMember -Function Invoke-JPPRuntimeHealth