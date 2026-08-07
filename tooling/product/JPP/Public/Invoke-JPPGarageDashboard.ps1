# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPGarageDashboard.ps1
# Programme : PP-001
# WorkPack  : WP-001
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPGarageDashboard {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [psobject]$GarageDomain,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$VehicleRegistration,

        [string]$ActiveVehicleIdentifier
    )

    $vehicles = @($VehicleRegistration)

    $vehicleCards = foreach ($vehicle in ($vehicles | Sort-Object VehicleIdentifier)) {
        [pscustomobject]@{
            VehicleIdentifier  = $vehicle.VehicleIdentifier
            VehicleNickname    = $vehicle.VehicleNickname
            Model              = $vehicle.Model
            ModelYear          = $vehicle.ModelYear
            RegistrationStatus = $vehicle.RegistrationStatus
            Odometer           = $vehicle.Odometer
        }
    }

    if ([string]::IsNullOrWhiteSpace($ActiveVehicleIdentifier)) {
        $ActiveVehicleIdentifier = $GarageDomain.DefaultVehicleIdentifier
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Garage.Dashboard'

        GarageSummary = [pscustomobject]@{
            GarageIdentifier        = $GarageDomain.GarageIdentifier
            GarageName              = $GarageDomain.GarageName
            OwnerUserIdentifier     = $GarageDomain.OwnerUserIdentifier
            TotalRegisteredVehicles = $vehicleCards.Count
            DefaultVehicleIdentifier = $GarageDomain.DefaultVehicleIdentifier
        }

        RegisteredVehicleCards = @($vehicleCards)

        DefaultVehicle = $GarageDomain.DefaultVehicleIdentifier

        ActiveVehicle = $ActiveVehicleIdentifier

        DashboardActions = @(
            'Add Vehicle'
            'View Vehicle'
            'Edit Vehicle'
            'Select Default Vehicle'
            'Remove Vehicle'
        )

        DashboardMetadata = [pscustomobject]@{
            GeneratedAt      = Get-Date
            DashboardVersion = '1.0'
        }

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPGarageDashboard