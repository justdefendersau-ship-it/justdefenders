# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPVehicleRegistration.ps1
# Programme : PP-001
# WorkPack  : WP-001
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPVehicleRegistration {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-HJ-NPR-Z0-9]{17}$')]
        [string]$VIN,

        [string]$RegistrationNumber,

        [string]$VehicleNickname,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$Model,

        [Parameter(Mandatory)]
        [ValidateRange(1948,9999)]
        [int]$ModelYear,

        [string]$BodyStyle,

        [string]$Engine,

        [string]$Transmission,

        [string]$Drivetrain,

        [string]$ExteriorColour,

        [ValidateRange(0,[long]::MaxValue)]
        [long]$Odometer = 0,

        [ValidateSet(
            'Pending',
            'Registered',
            'Suspended',
            'Archived'
        )]
        [string]$RegistrationStatus = 'Registered',

        [datetime]$RegistrationDate = (Get-Date),

        [hashtable]$VehicleMetadata = @{}
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Vehicle.Registration'

        VehicleIdentifier   = $VehicleIdentifier

        VIN                 = $VIN

        RegistrationNumber  = $RegistrationNumber

        VehicleNickname     = $VehicleNickname

        Model               = $Model

        ModelYear           = $ModelYear

        BodyStyle           = $BodyStyle

        Engine              = $Engine

        Transmission        = $Transmission

        Drivetrain          = $Drivetrain

        ExteriorColour      = $ExteriorColour

        Odometer            = $Odometer

        RegistrationStatus  = $RegistrationStatus

        RegistrationDate    = $RegistrationDate

        VehicleMetadata     = [pscustomobject]$VehicleMetadata

        Success             = $true
    }
}

Export-ModuleMember -Function Invoke-JPPVehicleRegistration