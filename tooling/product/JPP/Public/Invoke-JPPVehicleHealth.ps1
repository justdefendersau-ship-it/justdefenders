# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPVehicleHealth.ps1
# Programme : PP-001
# WorkPack  : WP-004
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPVehicleHealth {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$VehicleHealthIdentifier,

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
        [string]$OverallHealthStatus,

        [Parameter(Mandatory)]
        [ValidateRange(0, 100)]
        [int]$HealthScore,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Current',
            'Due',
            'Overdue',
            'Unknown'
        )]
        [string]$MaintenanceStatus,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Healthy',
            'Attention Required',
            'Critical',
            'Unknown'
        )]
        [string]$PartsStatus,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ReliabilityStatus,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$RiskLevel,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$HealthSummary,

        [hashtable]$HealthMetadata = @{},

        [object]$VehicleReference,

        [object[]]$PartsReferences = @(),

        [object[]]$MaintenanceReferences = @(),

        [datetime]$GeneratedAt = (Get-Date)
    )

    $vehicle = if ($null -eq $VehicleReference) {
        [pscustomobject]@{
            VehicleIdentifier = $VehicleIdentifier
        }
    }
    elseif ($VehicleReference -is [string]) {
        [pscustomobject]@{
            VehicleIdentifier = $VehicleReference
        }
    }
    else {
        $VehicleReference
    }

    $parts = @(
        $PartsReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        PartIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        PartIdentifier = $_.PartIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.PartIdentifier)
            } |
            Sort-Object PartIdentifier -Unique
    )

    $maintenance = @(
        $MaintenanceReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        MaintenanceIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        MaintenanceIdentifier = $_.MaintenanceIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.MaintenanceIdentifier)
            } |
            Sort-Object MaintenanceIdentifier -Unique
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Vehicle.Health'

        VehicleHealthIdentifier = $VehicleHealthIdentifier

        VehicleIdentifier = $VehicleIdentifier

        VehicleReference = $vehicle

        OverallHealthStatus = $OverallHealthStatus

        HealthScore = $HealthScore

        MaintenanceStatus = $MaintenanceStatus

        PartsStatus = $PartsStatus

        ReliabilityStatus = $ReliabilityStatus

        RiskLevel = $RiskLevel

        HealthSummary = $HealthSummary

        HealthMetadata = [pscustomobject]$HealthMetadata

        PartsReferences = $parts

        MaintenanceReferences = $maintenance

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPVehicleHealth