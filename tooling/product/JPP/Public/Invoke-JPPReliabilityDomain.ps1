# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPReliabilityDomain.ps1
# Programme : PP-001
# WorkPack  : WP-006
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPReliabilityDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$ReliabilityIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Excellent',
            'Good',
            'Attention Required',
            'Poor',
            'Critical',
            'Unknown'
        )]
        [string]$ReliabilityStatus,

        [object]$PartsReliabilityReference,

        [object]$MaintenanceReliabilityReference,

        [object]$VehicleReliabilityReference,

        [object]$FailureIntelligenceReference,

        [hashtable]$ReliabilityMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $partsReliabilityReference = if ($null -eq $PartsReliabilityReference) {
        $null
    }
    elseif ($PartsReliabilityReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($PartsReliabilityReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                ReliabilityIdentifier = $PartsReliabilityReference
            }
        }
    }
    else {
        $PartsReliabilityReference
    }

    $maintenanceReliabilityReference = if ($null -eq $MaintenanceReliabilityReference) {
        $null
    }
    elseif ($MaintenanceReliabilityReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($MaintenanceReliabilityReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                ReliabilityIdentifier = $MaintenanceReliabilityReference
            }
        }
    }
    else {
        $MaintenanceReliabilityReference
    }

    $vehicleReliabilityReference = if ($null -eq $VehicleReliabilityReference) {
        $null
    }
    elseif ($VehicleReliabilityReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($VehicleReliabilityReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                VehicleReliabilityIdentifier = $VehicleReliabilityReference
            }
        }
    }
    else {
        $VehicleReliabilityReference
    }

    $failureIntelligenceReference = if ($null -eq $FailureIntelligenceReference) {
        $null
    }
    elseif ($FailureIntelligenceReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($FailureIntelligenceReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                IntelligenceIdentifier = $FailureIntelligenceReference
            }
        }
    }
    else {
        $FailureIntelligenceReference
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Reliability.Domain'

        ReliabilityIdentifier = $ReliabilityIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ReliabilityStatus = $ReliabilityStatus

        PartsReliabilityReference = $partsReliabilityReference

        MaintenanceReliabilityReference = $maintenanceReliabilityReference

        VehicleReliabilityReference = $vehicleReliabilityReference

        FailureIntelligenceReference = $failureIntelligenceReference

        ReliabilityMetadata = [pscustomobject]$ReliabilityMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPReliabilityDomain
