# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPVehicleIntelligenceDomain.ps1
# Programme : PP-001
# WorkPack  : WP-004
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPVehicleIntelligenceDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$VehicleCondition,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ReliabilityStatus,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$RiskLevel,

        [object]$VehicleReference,

        [object[]]$PartsReferences = @(),

        [object[]]$MaintenanceReferences = @(),

        [hashtable]$IntelligenceMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

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

    [pscustomobject]@{
        PSTypeName = 'JPP.Vehicle.Intelligence.Domain'

        VehicleIdentifier = $VehicleIdentifier

        VehicleReference = $vehicle

        VehicleCondition = $VehicleCondition

        ReliabilityStatus = $ReliabilityStatus

        RiskLevel = $RiskLevel

        PartsReferences = $parts

        MaintenanceReferences = $maintenance

        IntelligenceMetadata = [pscustomobject]$IntelligenceMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPVehicleIntelligenceDomain