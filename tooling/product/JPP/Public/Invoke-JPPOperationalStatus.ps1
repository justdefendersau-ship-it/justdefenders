# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPOperationalStatus.ps1
# Programme : PP-001
# WorkPack  : WP-008
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPOperationalStatus {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$OperationalIdentifier,

        [Parameter(Mandatory = $true)]
        [ValidateSet(
            'Operational',
            'Degraded',
            'Offline',
            'Unknown'
        )]
        [string]$OperationalStatus,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$OperationalSummary,

        [Parameter(Mandatory = $false)]
        [object]$RuntimeHealthReference = $null,

        [Parameter(Mandatory = $false)]
        [object]$RuntimeHeartbeatReference = $null,

        [Parameter(Mandatory = $false)]
        [hashtable]$OperationalMetadata = @{},

        [Parameter(Mandatory = $false)]
        [datetime]$GeneratedAt = (Get-Date)
    )

    $runtimeHealthReference = $null

    if ($null -ne $RuntimeHealthReference) {
        if ($RuntimeHealthReference -is [string]) {
            if (-not [string]::IsNullOrWhiteSpace($RuntimeHealthReference)) {
                $runtimeHealthReference = [pscustomobject]@{
                    RuntimeIdentifier = $RuntimeHealthReference
                }
            }
        }
        else {
            $property = $RuntimeHealthReference.PSObject.Properties['RuntimeIdentifier']

            if ($null -ne $property) {
                $identifier = [string]$property.Value

                if (-not [string]::IsNullOrWhiteSpace($identifier)) {
                    $runtimeHealthReference = [pscustomobject]@{
                        RuntimeIdentifier = $identifier
                    }
                }
            }
        }
    }

    $runtimeHeartbeatReference = $null

    if ($null -ne $RuntimeHeartbeatReference) {
        if ($RuntimeHeartbeatReference -is [string]) {
            if (-not [string]::IsNullOrWhiteSpace($RuntimeHeartbeatReference)) {
                $runtimeHeartbeatReference = [pscustomobject]@{
                    HeartbeatIdentifier = $RuntimeHeartbeatReference
                }
            }
        }
        else {
            $property = $RuntimeHeartbeatReference.PSObject.Properties['HeartbeatIdentifier']

            if ($null -ne $property) {
                $identifier = [string]$property.Value

                if (-not [string]::IsNullOrWhiteSpace($identifier)) {
                    $runtimeHeartbeatReference = [pscustomobject]@{
                        HeartbeatIdentifier = $identifier
                    }
                }
            }
        }
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Operational.Status'

        OperationalIdentifier = $OperationalIdentifier

        OperationalStatus = $OperationalStatus

        OperationalSummary = $OperationalSummary

        RuntimeHealthReference = $runtimeHealthReference

        RuntimeHeartbeatReference = $runtimeHeartbeatReference

        OperationalMetadata = [pscustomobject]$OperationalMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPOperationalStatus